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
        <th onClick={()=>{this.helper.toggleEditMode()}} className="tools"><EditIcon style={{color:'var(--main-color)'}}/></th>,
        <th onClick={action(()=>{this.props.removeElement(this.props.props.id)})} className="tools"><DeleteIcon style={{color:'var(--color-1)'}}/></th>
      ]
  }
  editButtons(){
    return [
        <th onClick={action(()=>{this.edit()})} className="tools"><CheckIcon/></th>,
        <th onClick={()=>{this.helper.toggleEditMode()}} className="tools"><CancelIcon/></th>
    ];
  }
  
  render(){
    if(!this.helper.isInEditMode){
      return (
        <tr>
          {
            Object.keys(this.props.props).map((e)=>{
              switch(e){
                case 'id':
                  return null
                case 'brand':
                  const brands = BrandsStore.list
                  return <th>{(brands.find((e)=>{return e.id===this.props.props['brand']})||{}).name || 'unbranded'}</th>
                default:
                  return <th>{this.props.props[e]}</th>
                }
              }
            )
          }
          {this.noEditButtons()}
        </tr>
    )
    }else{
      return (
        <tr>
          {
            Object.keys(this.props.props).map((e)=>{
              switch(e){
                case 'brand':
                return <th><MultioptionEditButton selected={this.props.props.brand} props={BrandsStore.list} getValue={(e)=>{this.props.setElementField(e, 'brand')}} /></th>
                case 'id':
                return null
                default:
                  return <th><input 
                  onChange={action((i)=>{this.props.setElementField(i.target.value, e)})}
                  defaultValue={this.props.props[e]} 
                  type="text"/></th>
                }
              })
            }
            {
              this.editButtons()
            }
        </tr>
      )
    }
  }
}
export default observer(ListElement)