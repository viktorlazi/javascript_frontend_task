import React from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'
import { makeAutoObservable } from 'mobx'
import DisplayElement from './DisplayElement'
import EditElement from './EditElement'
import TableRow from '../../../Components/TableRow'
import BrandsStore from '../../../Stores/BrandsStore'


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
        <th onClick={()=>{this.helper.toggleEditMode()}} className="edit__span">edit</th>,
        <th onClick={action(()=>{this.props.removeElement(this.props.props.id)})} className="remove__span">remove</th>
      ]
  }
  editButtons(){
    return [
        <th onClick={action(()=>{this.edit()})} className="change__span">confirm</th>,
        <th onClick={()=>{this.helper.toggleEditMode()}} className="cancel__span">cancel</th>
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
        <li>
          <EditElement props={this.props.props} setElementField={(value, field)=>{this.helper.setElementField(value, field)}} />
          {this.editButtons()}
        </li>
      )
    }
  }
}
export default observer(ListElement)