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
    result[0]?
    setAlert(result[1], 'var(--main-color)'):
    setAlert(result[1], 'red');
  }
}
export default AddElementStore;
