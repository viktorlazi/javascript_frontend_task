import {makeAutoObservable} from 'mobx';

class AddElementStore{
  newElement;
  constructor(){
    this.newElement = {
      name:'',
      numberOfProducts:''
    };
    makeAutoObservable(this);
  }
  addNewElement(addNewElement, addListElementStore, setAlert){
    const result = addNewElement(this.newElement);
    setAlert(result);
    if(result[0]){
      addListElementStore(result[2]);
    }
    this.newElement = {
      name:'',
      numberOfProducts:''
    };
  }
}
export default AddElementStore;