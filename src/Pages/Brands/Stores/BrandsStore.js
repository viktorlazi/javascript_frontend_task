import { makeAutoObservable, toJS } from 'mobx';
import BrandsService from '../../../Services/BrandsService';
import ProductsService from '../../../Services/ProductsService';
import UserInputStore from '../../../Stores/UserInputStore';
import ListElementStore from '../Components/Stores/ListElementStore';
import AddElementStore from '../Components/Stores/AddElementStore';
import AlertStore from './AlertStore';

class BrandsStore{
  list = [];
  sortingTypes = ['name', 'number'];
  availableID = 10;
  service = BrandsService;
  alert = new AlertStore();
  input = new UserInputStore();
  addElement = new AddElementStore();
  listElement = [];

  constructor(){
    makeAutoObservable(this);
    this.list = this.fetchList();
    this.input.setSort('number');
  }
  fetchList(){
    this.service.fetchList
    .then(result=>{
      this.listElement = [];
      result.forEach(e => {
        this.listElement.push({id:e.id, store: new ListElementStore(e), key:e.id})
      });
      this.list = result;    
    });
  }
  getElementById(id){
    return this.list.find(e=>e.id===id);
  }
  getListProperties(key){
    return this.list.map(e=>e[key]);
  }
  getSortingTypes(){
    return this.sortingTypes;
  }
  removeElement(id){
    let newList=this.list.filter(e=>{
      return e.id !== id;
    })
    if(newList === this.list){
      return [false, [500]];
    }
    this.list = newList;
    this.service.removeListItem(id);
    return [true, [202]];
  }
  setNumberOfProducts(){
    if(!this.list){
      return null;
    }
    let products;
    ProductsService.fetchList
    .then(result=>{
      products = result;
      this.list.forEach((e)=>{
        this.list.find((i)=>{return e===i}).number = products.filter(i=>e.id===i.brand).length;
      });
    })
  }
  getProcessedList(searchField, sortBy){
    this.setNumberOfProducts();
    let list = this.filter(this.list, searchField);
    list = this.sort(list, sortBy);
    const idList = list.map(e=>{return e.id});
    return idList;
  }
  listElementEqualTo(obj, index){
    Object.keys(this.list[index]).map((e)=>{
      if(e!=='id'){
        this.list[index][e] = obj[e];
      }
      return true;
    })
  }
  editElement(edited, id){
    let errorCodes = [];
    /*
    if(!this.isNewElementValid(edited)){
      errorCodes.push(400);
    }*/
    console.log(errorCodes)
    if(errorCodes.length > 0){
      return [false, errorCodes]
    }
    const index = this.list.findIndex(obj => obj.id === id);
    edited['id'] = id;
    this.listElementEqualTo(edited, index);
    this.service.editListElement(id, edited);
    return [true, [200]];
  }
  sort(list, sortBy){
    list.sort(
      (a,b)=>{
        const nameA = a[sortBy]
        const nameB = b[sortBy]
        if (nameA < nameB) {
          return -1;
        }else if (nameA > nameB) {
          return 1;
        }
        return 0;
      }
    );
    return list;
  }
  filter(list, searchField){
    if(!list){
      return [];
    }
    let filtered = [...list.filter((e)=>{
      return e.name.includes(searchField);
    })];
    return filtered;
  }
  addNewElement(newElement){
    console.log(toJS(this.list))
    let errorCodes = [];
    if(!this.isNewElementValid(newElement)){
      //errorCodes.push(400);
    }
    if(errorCodes.length > 0){
      return [false, errorCodes, -1];
    }
    const id = this.availableID;
    this.list.push({});
    this.list[this.list.length-1]['id'] = id;
    Object.keys(newElement).map((e)=>{
      this.list[this.list.length-1][e] = newElement[e];
      return null;
    })
    this.service.appendList([this.list[this.list.length-1]]);
    this.availableID++;
    return [true, [201], id];
  }    
  isNewElementValid(newElement){
    const keys = Object.keys(newElement)
    if(keys.length>0){
      return keys.every((e)=>{
        return newElement[e];
      });
    }
    return false;
  }
}
const brandsStore = new BrandsStore(); 
export default brandsStore;