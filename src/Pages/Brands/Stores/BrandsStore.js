import { makeAutoObservable } from 'mobx';
import BrandsService from '../../../Services/BrandsService';
import ProductsService from '../../../Services/ProductsService';

class BrandsStore{
  list = [];
  sortingTypes = ['name', 'nr. of products'];
  availableIDs = [];
  service = BrandsService;

  constructor(){
    makeAutoObservable(this);
    this.list = this.service.fetchList()
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
    this.availableIDs.push(id);
    this.service.removeListItem(id);
    return [true, [202]];
  }
  setNumberOfProducts(){
    const products = ProductsService.fetchList();
    this.list.forEach((e)=>{
      this.list.find((i)=>{return e===i}).numberOfProducts = products.filter(i=>e.id===i.brand).length;
    });
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
    if(!this.isNewElementValid(edited)){
      errorCodes.push(400);
    }
    if(isNaN(edited.cost)){
      errorCodes.push(401);
    }
    if(!isNaN(edited.type)){
      errorCodes.push(402);
    }
    if(!isNaN(edited.colour)){
      errorCodes.push(403);
    }
    if(errorCodes.length > 0){
      return [false, errorCodes]
    }
    const index = this.list.findIndex(obj => obj.id === id);
    this.listElementEqualTo(edited, index);
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
    let filtered = [...list.filter((e)=>{
      return e.name.includes(searchField);
    })];
    return filtered;
  }
  addNewElement(newElement){
    let errorCodes = [];
    if(!this.isNewElementValid(newElement)){
      errorCodes.push(400);
    }
    if(isNaN(newElement.cost)){
      errorCodes.push(401);
    }
    if(!isNaN(newElement.type)){
      errorCodes.push(402);
    }
    if(!isNaN(newElement.colour)){
      errorCodes.push(403);
    }
    if(errorCodes.length > 0){
      return [false, errorCodes, -1];
    }
    let id;
    if(this.availableIDs.length){
      id = this.availableIDs[0];
      this.availableIDs.shift();
    }else{
      id = this.list.length;
    }
    this.list.push({});
    this.list[this.list.length-1]['id'] = id;
    Object.keys(newElement).map((e)=>{
      this.list[this.list.length-1][e] = newElement[e];
      return null;
    })
    this.service.appendList([this.list[this.list.length-1]]);
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