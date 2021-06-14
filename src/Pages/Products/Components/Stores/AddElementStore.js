import {makeAutoObservable} from 'mobx';
import BrandsService from '../../../../Services/BrandsService';

class AddElementStore{
  newElement;
  brands = [];
  brandsService = new BrandsService();
  constructor(){
    this.getAvailableBrandsAsync();
    this.newElement = {
      brand:1,
      type:'',
      colour:'',
      cost:''
    };
    makeAutoObservable(this);
  }
  getAvailableBrandsAsync = async () =>{
    this.brands = await this.brandsService.get();
  }
  addNewElement(addNewElement, addListElementStore, setAlert){
    const result = addNewElement(this.newElement);
    setAlert(result);
    if(result[0]){
      addListElementStore(result[2]);
    }
    const lastSelected = this.newElement.brand;
    this.newElement = {
      brand:lastSelected,
      type:'',
      colour:'',
      cost:''
    };
  }
}
export default AddElementStore;
