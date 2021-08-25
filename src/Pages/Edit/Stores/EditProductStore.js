import { makeAutoObservable, toJS } from "mobx";

export default class EditProductStore{
  element;
  brands;
  editElementStore;
  editElement;
  setAlert;
  constructor(){
    makeAutoObservable(this);
  }
  setValues(element, brands, editElementStore, editElement, setAlert){
    this.element = element;
    console.log(toJS(element))
    this.brands = brands;
    this.editElementStore = editElementStore;
    this.editElement = editElement;
    this.setAlert = setAlert;
  }
}

/*
editElement={(edited, id)=>ProductsStore.editElement(edited, id)} 
setAlert={(msg, colour)=>ProductsStore.alert.setAlert(msg, colour)}
element={ProductsStore.getElementById(parseInt(routerStore.location.query.id))} 
brands={ProductsStore.brands} 
store={ProductsStore.getListElementStore(parseInt(routerStore.location.query.id))}


*/