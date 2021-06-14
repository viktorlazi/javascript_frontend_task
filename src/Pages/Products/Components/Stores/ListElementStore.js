import {makeAutoObservable} from 'mobx';
import BrandsService from '../../../../Services/BrandsService';

class ListElementStore{
  isInEditMode = false;
  element = {};
  invalidInputs = [];
  brands = [];
  brandsService = new BrandsService();
  constructor(element){
    makeAutoObservable(this);
    this.setEqualToProps(element);
    this.getAvailableBrandsAsync();
  }
  getAvailableBrandsAsync = async () =>{
    this.brands = await this.brandsService.get();
  }
  edit(setAlert, element, editElement){
    this.invalidInputs = [];
    if(this.didChange(element)){
      const result = editElement(this.element, element.id);
      setAlert(result);
      if(!result[0]){
        if(result[1].includes(400)){
          this.invalidInputs.push('cost');
          this.invalidInputs.push('type');
          this.invalidInputs.push('colour');
        }else{
          if(result[1].includes(401)){
            this.invalidInputs.push('cost');
          }
          if(result[1].includes(402)){
            this.invalidInputs.push('type');
          }
          if(result[1].includes(403)){
            this.invalidInputs.push('colour');
          }
        }
      }
      this.setEqualToProps(element);
    }
    this.toggleEditMode();
  }
  toggleEditMode(){
    this.isInEditMode = !this.isInEditMode;
  }
  setElementField(value, field){
    this.element[field] = value;
  }
  setEqualToProps(x){
    this.element = {};
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
}
export default ListElementStore;