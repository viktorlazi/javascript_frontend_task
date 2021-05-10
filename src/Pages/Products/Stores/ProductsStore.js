import { makeAutoObservable } from 'mobx';
import BrandsStore from '../../../Stores/BrandsStore'
import ProductsService from './ProductsService'

class ProductsStore{
  list = [];
  sortingTypes = ['brand', 'type', 'colour', 'cost'];
  availableIDs = [];
  service = new ProductsService();

  constructor(){
    makeAutoObservable(this);
    this.list = this.service.fetchList()
  }
  getElementById(id){
    const index = this.list.findIndex(obj => obj.id === id);
    return this.list[index];
  }
  getSortingTypes(){
    return this.sortingTypes
  }
  getListProperties(key){
    return this.list.map(e=>e[key]);
  }
  removeElement(id){
    this.list=this.list.filter(e=>{
      return e.id !== id;
    })
    this.availableIDs.push(id);
    this.service.removeListItem(id);
  }
  getProcessedList(searchField, sortBy){
    console.log(this.service.list)
    this.unbrandIfBrandNotExistent(BrandsStore.getListProperties('id'))
    let list = this.filter(this.list, searchField)
    list = this.sort(list, sortBy)
    const idList = list.map(e=>{return e.id})
    return idList
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
    if(!this.isNewElementValid(edited)){
      return [false, 'Invalid input - empty fields'];
    }
    if(isNaN(edited.cost)){
      return [false, 'Invalid input - cost must be a number'];
    }
    if(!isNaN(edited.type)){
      return [false, 'Invalid input - type must be a string'];
    }
    if(!isNaN(edited.colour)){
      return [false, 'Invalid input - colour must be a string'];
    }
    const index = this.list.findIndex(obj => obj.id === id);
    this.listElementEqualTo(edited, index);
    return [true, 'Element edited'];
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
    )
    return list
  }
  filter(list, searchField){
    let filtered = [...list.filter((e)=>{
      return (BrandsStore.getElementById(e.brand).name + e.type + e.colour + e.cost).includes(searchField)
    })]
    return filtered
  }
  addNewElement(newElement){
    if(!this.isNewElementValid(newElement)){
      return [false, 'Invalid input - empty fields'];
    }
    if(isNaN(newElement.cost)){
      return [false, 'Invalid input - cost must be a number'];
    }
    if(!isNaN(newElement.type)){
      return [false, 'Invalid input - type must be a string'];
    }
    if(!isNaN(newElement.colour)){
      return [false, 'Invalid input - colour must be a string'];
    }
    let id
    if(this.availableIDs.length){
      id = this.availableIDs[0];
      this.availableIDs.shift();
    }else{
      id = this.list.length
    }
    this.list.push({});
    this.list[this.list.length-1]['id'] = id;
    Object.keys(newElement).map((e)=>{
      this.list[this.list.length-1][e] = newElement[e];
      return null
    })
    this.service.appendList([this.list[this.list.length-1]])
    return [true, 'Element added'];
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
  unbrandIfBrandNotExistent(validBrands){
    this.list.forEach(e => {
      if(!validBrands.includes(e.brand)){
        e.brand=1;
      }
      this.service.editListElement(e.id, e)
    });
  }
}

const productsStore = new ProductsStore();
 
export default productsStore;