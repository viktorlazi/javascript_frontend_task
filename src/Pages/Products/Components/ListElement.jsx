import React from 'react';
import {observer} from 'mobx-react';
import { makeAutoObservable, action } from 'mobx';
import BrandsStore from '../../../Stores/BrandsStore';

import MultioptionEditButton from '../../../Components/MultioptionEditButton';
import EditButtons from '../../../Components/EditButtons';
import NoEditButtons from '../../../Components/NoEditButtons';

class Helper{
  isInEditMode = false;
  element = {};
  
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
  constructor(){
    makeAutoObservable(this);
  }  
}

class ListElement extends React.Component{
  helper
  constructor(props){
    super(props);
    this.helper = new Helper();
    this.helper.setEqualToProps(this.props.element);
  }
  edit(){
    this.props.setAlert('', 'black')
    if(this.helper.didChange(this.props.element)){
      const result = this.props.editElement(this.helper.element, this.props.element.id)
      if(result[0]){
        this.helper.toggleEditMode();
        this.props.setAlert(result[1], 'green');
        return;
      }
      this.props.setAlert(result[1], 'red');
      this.helper.setEqualToProps(this.props.element);
    }else{
      this.helper.toggleEditMode();
    }
  }
  
  render(){
    if(!this.helper.isInEditMode){
      return (
        <div className="row">
          {
            Object.keys(this.props.element).map((e)=>{
              switch(e){
                case 'id':
                  return null
                case 'brand':
                  const brands = BrandsStore.list
                  return <div>{(brands.find((e)=>{return e.id===this.props.element['brand']})||{}).name || 'unbranded'}</div>
                default:
                  return <div>{this.props.element[e]}</div>
                }
              }
            )
          }
          <NoEditButtons 
            removeElement={action(()=>{this.props.removeElement(this.props.element.id)})} 
            toggleEditMode={()=>{this.helper.toggleEditMode()}} 
            setAlert={()=>{this.props.setAlert()}} />
        </div>
    )
    }else{
      return (
        <div className="row">
          {
            Object.keys(this.props.element).map((e)=>{
              switch(e){
                case 'brand':
                return <div><MultioptionEditButton selected={this.props.element.brand} options={BrandsStore.list} getValue={(e)=>{this.helper.setElementField(e, 'brand')}} /></div>
                case 'id':
                return null
                default:
                  return <div><input 
                  onChange={action((i)=>{this.helper.setElementField(i.target.value, e)})}
                  value={this.helper.element[e]} 
                  type="text"/></div>
                }
              })
            }
            <EditButtons 
              edit={action(()=>{this.edit()})} 
              toggleEditMode={()=>{this.helper.toggleEditMode()}} 
              setAlert={()=>{this.props.setAlert()}} />
        </div>
      )
    }
  }
}
export default observer(ListElement);