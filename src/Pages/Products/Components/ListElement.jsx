import React from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'
import { makeAutoObservable, toJS } from 'mobx'
import DisplayElement from './DisplayElement'
import EditElement from './EditElement'


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
  render(){
    if(!this.helper.isInEditMode){
      return (
        <li>
          <DisplayElement props={this.props.props} />
          <span onClick={()=>{this.helper.toggleEditMode()}} className="edit__span">edit</span>
          <span onClick={action(()=>{this.props.removeElement(this.props.props.id)})} className="remove__span">remove</span>
        </li>
    )
    }else{
      return (
        <li>
          <EditElement props={this.props.props} setElementField={(value, field)=>{this.helper.setElementField(value, field)}} />
          <span onClick={action(()=>{this.edit()})} className="change__span">confirm</span>
          <span onClick={()=>{this.helper.toggleEditMode()}} className="cancel__span">cancel</span>
        </li>
      )
    }
  }
}
export default observer(ListElement)