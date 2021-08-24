import { makeAutoObservable } from "mobx";

export default class EditProductStore{
  element;
  brands;
  store;
  editElement;
  setAlert;
  constructor(){
    
  }
  setValues = (element, brands, editElementStore, editElement, setAlert) =>{
    this.element = element;
    this.brands = brands;
    this.store = editElementStore;
    this.editElement = editElement;
    this.setAlert = setAlert;
  }

}
