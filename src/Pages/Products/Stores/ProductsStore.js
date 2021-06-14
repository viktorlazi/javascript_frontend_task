import {makeAutoObservable, runInAction} from 'mobx';
import BrandsService from '../../../Services/BrandsService';
import ProductsService from '../../../Services/ProductsService';
import AlertStore from './AlertStore';
import UserInputStore from '../../../Stores/UserInputStore';
import AddElementStore from '../Components/Stores/AddElementStore';
import ListElementStore from '../Components/Stores/ListElementStore';

class ProductsStore{
  list = [];
  sortingTypes = ['brand', 'type', 'colour', 'cost'];
  availableIDs = [];
  status = 'initial';

  service = new ProductsService();
  alert = new AlertStore();
  input = new UserInputStore();
  addElement = new AddElementStore();
  listElement = [];

  constructor(){
    makeAutoObservable(this);
    this.getProductsAsync();
    this.input.setSort('cost');
  }
  getProductsAsync = async () =>{
    try{
      const data = await this.service.get();
      runInAction(() =>{
        this.list = data;
        data.forEach(e =>{
          this.listElement.push({id:e.id, store: new ListElementStore(e), key:e.id})
        });
      });
    }catch(error){
      runInAction(() =>{
        this.status = "error";
      });    
    }
  }
  createProductAsync = async (product) =>{
    try{
      const response = await this.service.post(product);
      if(response.status === 201){
        runInAction(() =>{
          this.status = "success";
        })
      } 
    }catch(error){
      runInAction(() =>{
        this.status = "error";
      });
    }
  };
  updateProductAsync = async (product) =>{
    try{
      const response = await this.service.put(product)
      if(response.status === 200){
        runInAction(() =>{
          this.status = "success";
        })
      } 
    }catch(error){
      runInAction(() =>{
        this.status = "error";
      });
    }
  };
  deleteProductAsync = async (id) =>{
    try{
      const response = await this.service.delete(id);
      if(response.status === 204){
        runInAction(() =>{
          this.status = "success";
        })
      } 
    }catch(error){
      runInAction(() =>{
        this.status = "error";
      });
    }
  }
 
  /*
  fetchList(){
    this.service.fetchList
    .then(result=>{
      this.listElement = [];
      result.forEach(e =>{
        this.listElement.push({id:e.id, store: new ListElementStore(e), key:e.id})
      });
      this.list = result;    
    });
  }*/
  getElementById(id){
    return this.list.find(e=>e.id===id);
  }
  getSortingTypes(){
    return this.sortingTypes;
  }
  getListProperties(key){
    return this.list.map(e=>e[key]);
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
    this.deleteProductAsync(id);
    return [true, [202]];
  }
  getProcessedList(){
    this.unbrandIfBrandNotExistent();
    let list = this.filter(this.list, this.input.searchField);
    list = this.sort(list, this.input.sortBy);
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
    edited['id'] = id;
    this.listElementEqualTo(edited, index);
    this.updateProductAsync(edited);
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
      const brand = BrandsService.fetchListItems(e.brand)[0];
      return (brand?brand['name']:null + e.type + e.colour + e.cost).includes(searchField);
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
    this.createProductAsync(this.list[this.list.length-1]);
    return [true, [201], id];
  }    
  isNewElementValid(newElement){
    const keys = Object.keys(newElement);
    if(keys.length>0){
      return keys.every((e)=>{
        return newElement[e] || newElement[e] === 0;
      });
    }
    return false;
  }
  unbrandIfBrandNotExistent(){
    let validBrands = [];
    BrandsService.fetchList.then(result=>{
      validBrands = result.map(e=>{return e['id']});
      this.list.forEach(e =>{
        if(!validBrands.includes(e.brand)){
          const element = e;
          element.brand = 1;
          this.editListElement(e.id, element);
          this.updateProductAsync(element);
        }
      });
    });
  }
  editListElement(id, element){
    const index = this.list.findIndex(obj => obj.id === id);
    this.list[index] = element;
  }
}

const productsStore = new ProductsStore();
export default productsStore;