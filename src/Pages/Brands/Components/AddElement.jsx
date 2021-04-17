import React from 'react'
import {observer} from 'mobx-react'
import {makeAutoObservable} from 'mobx'
import BrandsService from '../Stores/BrandsService'
import './styles/addElement.css'

class Helper{
  newElement
  lastSelected = 0

  constructor(){
    this.newElement = {
      name:'',
      numberOfProducts:0
    }
    makeAutoObservable(this)
  }
  getNewElementValue(key){
    return this.newElement[key] === undefined ? '':this.newElement[key] 
  }
  setElementField(value, field){
    this.newElement[field] = value
  }
  addNewElementToList(){
    if(BrandsService.addNewElement(this.newElement)){
      this.newElement = {
        name:'',
        numberOfProducts:0
      }
    }
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
      {
        this.props.ListStore.getSortingTypes().map((e)=>{
          switch(e){
            case 'id':
            case 'numberOfProducts':
              return null
            default:
              return <input onChange={ 
                (i)=>{
                  this.helper.setElementField(i.target.value, e)
                }
              } placeholder={e} value={this.helper.newElement[e]} type="text">
              </input>
            }
        })
      }
      <button onClick={()=>{
        this.helper.addNewElementToList()
      }}>Add New</button>
    </div>
    )
  }
}

export default observer(AddElement)
