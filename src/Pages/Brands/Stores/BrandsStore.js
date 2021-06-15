import { makeAutoObservable, toJS, runInAction } from 'mobx';
import BrandsService from '../../../Services/BrandsService';
import ProductsService from '../../../Services/ProductsService';
import UserInputStore from '../../../Stores/UserInputStore';
import ListElementStore from '../Components/Stores/ListElementStore';
import AddElementStore from '../Components/Stores/AddElementStore';
import AlertStore from './AlertStore';

class BrandsStore{
  list = [];
  sortingTypes = ['name', 'number'];
  brandsService = new BrandsService();
  productsService = new ProductsService();
  alert = new AlertStore();
  input = new UserInputStore();
  addElement = new AddElementStore();
  listElement = [];

  constructor(){
    makeAutoObservable(this);
    this.getBrandsAsync();
    this.updateProductsNumberContinuously();
    this.input.setSort('number');
  }
  updateProductsNumberContinuously = () =>{
    return setInterval(()=>{
      this.setNumberOfProductsAsync();
    }, 2000)
  }
  getRandomID = () =>{
    return Math.round(Math.random()*10000000);
  }
  getBrandsAsync = async () =>{
    try{
      const data = await this.brandsService.get();
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
  createBrandAsync = async (brand) =>{
    try{
      const response = await this.brandsService.post(brand);
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
  updateBrandAsync = async (brand) =>{
    try{
      const response = await this.brandsService.put(brand)
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
  deleteBrandAsync = async (id) =>{
    try{
      const response = await this.brandsService.delete(id);
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
    this.deleteBrandAsync(id);
    return [true, [202]];
  }
  setNumberOfProductsAsync = async () =>{
    if(!this.list){
      return null;
    }
    const products = await this.productsService.get();
    this.list.forEach((e)=>{
      runInAction(()=>{
        this.list.find((i)=>{return e===i}).number = products.filter(i=>e.id===i.brand).length;
      });
    });
  }
  getProcessedList(searchField, sortBy){
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
      errorCodes.push(401);
    }else if(!isNaN(edited.name)){
      errorCodes.push(402);
    }
    console.log(errorCodes)
    if(errorCodes.length > 0){
      return [false, errorCodes]
    }
    const index = this.list.findIndex(obj => obj.id === id);
    edited['id'] = id;
    this.listElementEqualTo(edited, index);
    this.updateBrandAsync(edited);
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
      return (e.name + e.number).includes(searchField);
    })];
    return filtered;
  }
  addNewElement(newElement){
    let errorCodes = [];
    if(!this.isNewElementValid(newElement)){
      errorCodes.push(401);
    }else if(!isNaN(newElement.name)){
      errorCodes.push(402);
    }
    if(errorCodes.length > 0){
      return [false, errorCodes, -1];
    }
    const id = this.getRandomID();
    this.list.push({});
    this.list[this.list.length-1]['id'] = id;
    Object.keys(newElement).map((e)=>{
      this.list[this.list.length-1][e] = newElement[e];
      return null;
    })
    this.createBrandAsync(this.list[this.list.length-1]);
    return [true, [201], id];
  }    

  isNewElementValid(newElement){
    if(!newElement){
      return false;
    }
    if(!newElement.name){
      return false;
    }
    return true;
  }
}
const brandsStore = new BrandsStore(); 
export default brandsStore;