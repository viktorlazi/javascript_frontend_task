import {makeAutoObservable, runInAction} from 'mobx';
import BrandsService from '../../../../Services/BrandsService';

class AddElementStore{
  newElement;
  constructor(){
    this.newElement = {
      brand:1,
      type:'',
      colour:'',
      cost:''
    };
    makeAutoObservable(this);
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
