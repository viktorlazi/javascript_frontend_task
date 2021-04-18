import React from 'react'
import {observer} from 'mobx-react'
import {makeAutoObservable, action} from 'mobx'
import BrandsService from '../Stores/BrandsService'
import './styles/addElement.css'

class Helper{
  newElement

  constructor(){
    this.newElement = {
      name:'',
      numberOfProducts:0
    }
    makeAutoObservable(this)
  }
  addNewElementToList(){
    return BrandsService.addNewElement(this.newElement)
  }
}

class AddElement extends React.Component {
  helper
  constructor(props){
    super(props)
    this.helper=new Helper()
  }
  render(){
    return(
    <div className="add__new">
      <input onChange={ 
        action((i)=>{
          this.helper.newElement['name']=i.target.value
        })
      } placeholder={'name'} value={this.helper.newElement['name']} type="text">
      </input>
      <button onClick={()=>{
        this.helper.addNewElementToList()
        action(()=>{this.helper.newElement = {
          name:'',
          numberOfProducts:0
        }})
      }}>Add New</button>
    </div>
    )
  }
}

export default observer(AddElement)
