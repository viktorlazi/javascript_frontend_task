import {makeAutoObservable} from 'mobx';

class AlertStore{
  msg;
  colour;
  
  constructor(){
    this.colour = 'black';
    this.msg = '';
    makeAutoObservable(this);
  }
  setAlert(msg, colour){
    this.msg = msg;
    this.colour = colour;
  }
}
export default AlertStore;