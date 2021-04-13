import React from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'
import { makeAutoObservable, toJS} from 'mobx'
import DisplayElement from './DisplayElement'
import EditElement from './EditElement'


class Helper{
  isInEditMode = false
  element = {}
  
  toggleEditMode(){
    this.isInEditMode = !this.isInEditMode
    console.log(toJS(this.element))
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
    this.helper.element = this.props.props
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
          <EditElement props={this.props.props} setElement={(value, field)=>{this.helper.setElement(value, field)}} />
          <span onClick={()=>{this.helper.toggleEditMode()}} className="change__span">confirm</span>
          <span onClick={action(()=>{this.helper.toggleEditMode()})} className="cancel__span">cancel</span>
        </li>
      )
    }
  }
}
export default observer(ListElement)