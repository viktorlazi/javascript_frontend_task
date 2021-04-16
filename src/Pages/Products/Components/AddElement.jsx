import React from 'react'
import {observer} from 'mobx-react'
import {makeAutoObservable} from 'mobx'
import BrandsStore from '../../../Stores/BrandsStore'
import ProductsService from '../Stores/ProductsService'
import MultioptionEditButton from '../../../Components/MultioptionEditButton'
import './styles/addElement.css'

class Helper{
  newElement
  lastSelected = 0

  constructor(){
    this.newElement = {
      brand:1,
      type:'',
      colour:'',
      cost:''
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
    if(ProductsService.addNewElement(this.newElement)){
      this.newElement = {
        brand:1,
        type:'',
        colour:'',
        cost:''
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
            case 'brand':
              const brands = BrandsStore.list
              return <MultioptionEditButton props={brands} getValue={(e)=>{this.helper.setElementField(e, 'brand'); this.helper.lastSelected=e}} selected={this.helper.lastSelected} />
            case 'id':
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
