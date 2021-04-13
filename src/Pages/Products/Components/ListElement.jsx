import React from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'
import { makeAutoObservable } from 'mobx'
import DisplayElement from './DisplayElement'
import EditElement from './EditElement'


class Helper{
  isInEditMode = false
  element = {}
  
  toggleEditMode(){
    this.isInEditMode = !this.isInEditMode
  }
  resetChanges(){
    this.element = {}
  }
  setElement(value, field){
    this.element[field] = value
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
  }
  render(){
    if(!this.helper.isInEditMode){
      return (
        <li>
          <DisplayElement props={this.props.props} />
          <span onClick={action(()=>{this.helper.toggleEditMode()})} className="edit__span">edit</span>
          <span onClick={action(()=>{this.props.removeElement(this.props.props.id)})} className="remove__span">remove</span>
        </li>
    )
    }else{
      return (
        <li>
          <p>{this.helper.element['type']}</p>
          <EditElement props={this.props.props} setElement={(value, field)=>{this.helper.setElement(value, field)}} />
          <span onClick={()=>{this.helper.toggleEditMode()}} className="change__span">confirm</span>
          <span onClick={action(()=>{this.helper.toggleEditMode()})} className="cancel__span">cancel</span>
        </li>
      )
    }
  }
}
export default observer(ListElement)