import {makeAutoObservable} from 'mobx';

class AlertStore{
  msg;
  colour;
  msgCodes = [
    [200, 'edited'],
    [201, 'added'],
    [400, 'empty fields'],
    [401, 'invalid cost'],
    [402, 'invalid type'],
    [403, 'invalid colour'],
  ];
  
  constructor(){
    this.colour = 'black';
    this.msg = '';
    makeAutoObservable(this);
  }
  setAlert(status){
    console.log(status)
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