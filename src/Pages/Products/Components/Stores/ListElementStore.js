import {makeAutoObservable} from 'mobx';

class ListElementStore{
  isInEditMode = false;
  element = {};
  
  edit(setAlert, element, editElement){
    setAlert('', 'black')
    if(this.didChange(element)){
      const result = editElement(this.element, element.id);
      if(result[0]){
        this.toggleEditMode();
        setAlert(result[1], 'green');
        return;
      }
      setAlert(result[1], 'red');
      this.setEqualToProps(element);
    }else{
      this.toggleEditMode();
    }
  }
  toggleEditMode(){
    this.isInEditMode = !this.isInEditMode;
  }
  setElementField(value, field){
    this.element[field] = value;
  }
  setEqualToProps(x){
    this.element={};
    Object.keys(x).map((e)=>{
      if(e!=='id'){
        this.element[e]=x[e];
      }
      return true;
    })
  }
  didChange(props){
    let didChange = false;
    Object.keys(this.element).map((e)=>{
      return this.element[e]!==props[e];
    }).forEach((e)=>{
      if(e===true){
        didChange = true;
        return true;
      }
    })
    return didChange;
  }
  constructor(element){
    makeAutoObservable(this);
    this.setEqualToProps(element);
  }  
}
export default ListElementStore;