import {makeAutoObservable} from 'mobx';

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
  addNewElementToList(setAlert, addNewElement){
    const result = addNewElement(this.newElement);
    setAlert(result);
  }
}
export default AddElementStore;
