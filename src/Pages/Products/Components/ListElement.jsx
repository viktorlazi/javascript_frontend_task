import React from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'
import { makeAutoObservable } from 'mobx'
import DisplayElement from './DisplayElement'
import EditElement from './EditElement'
import TableRow from '../../../Components/TableRow'
import BrandsStore from '../../../Stores/BrandsStore'

import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';

import MultioptionEditButton from '../../../Components/MultioptionEditButton'
import { Divider } from '@material-ui/core'


class Helper{
  isInEditMode = false
  element = {}
  
  toggleEditMode(){
    this.isInEditMode = !this.isInEditMode
  }
  setElementField(value, field){
    this.element[field] = value
  }
  equalToProps(x){
    this.element={}
    Object.keys(x).map((e)=>{
      if(e!=='id'){
        this.element[e]=x[e]
      }
      return true
    })
  }
  constructor(){
    makeAutoObservable(this)
  }  
}

class ListElement extends React.Component{
  helper
  constructor(props){
    super(props)
    this.helper=new Helper()
    this.helper.equalToProps(this.props.props)
  }
  edit(){
    if(this.props.editElement(this.helper.element, this.props.props.id)){
      this.helper.toggleEditMode()
      return
    }
    this.helper.equalToProps(this.props.props)
  }
  noEditButtons(){
    return [
        <div onClick={()=>{this.helper.toggleEditMode()}} className="tools"><EditIcon style={{color:'var(--main-color)'}}/></div>,
        <div onClick={action(()=>{this.props.removeElement(this.props.props.id)})} className="tools"><DeleteIcon style={{color:'var(--color-1)'}}/></div>
      ]
  }
  editButtons(){
    return [
        <div onClick={action(()=>{this.edit()})} className="tools"><CheckIcon style={{color:'var(--main-color)'}} /></div>,
        <div onClick={()=>{this.helper.toggleEditMode()}} className="tools"><CancelIcon style={{color:'var(--color-1)'}}/></div>
    ];
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
                  return <div className="cell">{(brands.find((e)=>{return e.id===this.props.props['brand']})||{}).name || 'unbranded'}</div>
                default:
                  return <div className="cell">{this.props.props[e]}</div>
                }
              }
            )
          }
          {this.noEditButtons()}
        </div>
    )
    }else{
      return (
        <div className="row">
          {
            Object.keys(this.props.props).map((e)=>{
              switch(e){
                case 'brand':
                return <div className="cell"><MultioptionEditButton selected={this.props.props.brand} props={BrandsStore.list} getValue={(e)=>{this.helper.setElementField(e, 'brand')}} /></div>
                case 'id':
                return null
                default:
                  return <div className="cell"><input 
                  onChange={action((i)=>{this.helper.setElementField(i.target.value, e)})}
                  defaultValue={this.props.props[e]} 
                  type="text"/></div>
                }
              })
            }
            {
              this.editButtons()
            }
        </div>
      )
    }
  }
}
export default observer(ListElement)