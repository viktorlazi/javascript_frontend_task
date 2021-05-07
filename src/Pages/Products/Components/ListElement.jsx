import React from 'react';
import {observer} from 'mobx-react';
import { makeAutoObservable, action, toJS } from 'mobx';
import BrandsStore from '../../../Stores/BrandsStore';

import MultioptionEditButton from '../../../Components/MultioptionEditButton';
import EditButtons from './EditButtons';
import NoEditButtons from './NoEditButtons';


class Helper{
  isInEditMode = false;
  element = {};
  
  toggleEditMode(){
    this.isInEditMode = !this.isInEditMode;
  }
  setElementField(value, field){
    this.element[field] = value;
  }
  equalToProps(x){
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
    this.helper.equalToProps(this.props.props);
  }
  edit(){
    this.props.setAlert('', 'black')
    if(this.helper.didChange(this.props.props)){
      const result = this.props.editElement(this.helper.element, this.props.props.id)
      if(result[0]){
        this.helper.toggleEditMode();
        this.props.setAlert(result[1], 'green');
        return;
      }
      this.props.setAlert(result[1], 'red');
      this.helper.equalToProps(this.props.props);
    }else{
      this.helper.toggleEditMode();
    }
  }
  
  render(){
    if(!this.helper.isInEditMode){
      return (
        <div className="row">
          {
            Object.keys(this.props.props).map((e)=>{
              switch(e){
                case 'id':
                  return null
                case 'brand':
                  const brands = BrandsStore.list
                  return <div>{(brands.find((e)=>{return e.id===this.props.props['brand']})||{}).name || 'unbranded'}</div>
                default:
                  return <div>{this.props.props[e]}</div>
                }
              }
            )
          }
          <NoEditButtons 
            removeElement={action(()=>{this.props.removeElement(this.props.props.id)})} 
            toggleEditMode={()=>{this.helper.toggleEditMode()}} 
            setAlert={()=>{this.props.setAlert()}} />
        </div>
    )
    }else{
      return (
        <div className="row">
          {
            Object.keys(this.props.props).map((e)=>{
              switch(e){
                case 'brand':
                return <div><MultioptionEditButton selected={this.props.props.brand} props={BrandsStore.list} getValue={(e)=>{this.helper.setElementField(e, 'brand')}} /></div>
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