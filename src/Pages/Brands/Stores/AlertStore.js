import {makeAutoObservable} from 'mobx';

class AlertStore{
  msg;
  colour;
  msgCodes = [
    [200, 'edited'],
    [201, 'added'],
    [202, 'removed'],
    [400, 'empty fields'],
    [401, 'invalid input'],
    [402, 'name cannot be a number'],
    [500, 'internal error, missing id']
  ];
  
  constructor(){
    this.colour = 'black';
    this.msg = '';
    makeAutoObservable(this);
  }
  setAlert(status){
    let msg;
    let colour;
    if(status[0]){
      msg = 'Success: ';
      colour = 'green';
    }else{
      msg = 'Failure: ';
      colour = 'red';
    }
    status[1].forEach(e => {
      this.msgCodes.forEach(f=>{
        if(e === f[0]){
          msg+=' - '+f[1];
        }
      })
    });
    this.msg = msg;
    this.colour = colour;
  }
}
export default AlertStore;