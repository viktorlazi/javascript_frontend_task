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
}
export default AddElementStore;
