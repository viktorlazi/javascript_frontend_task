import React from 'react'
import {observer} from 'mobx-react'
import {makeAutoObservable, action} from 'mobx'
import BrandsStore from '../../../Stores/BrandsStore'
import ProductsService from '../Stores/ProductsService'
import MultioptionEditButton from '../../../Components/MultioptionEditButton'

class Helper{
  newElement = {}

  constructor(){
    this.newElement = {
      brand:'',
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
    this.element[field] = value
  }
}

class AddElement extends React.Component {
  helper
  constructor(props){
    super(props)
    this.helper=new Helper()
  }
  addNewElementToList(){
    ProductsService.addNewElement(this.helper.newElement)
  }
  render(){
    return(
    <div className="add__new">
      {
        this.props.ListStore.getSortingTypes().map((e)=>{
          switch(e){
            case 'brand':
              const brands = BrandsStore.list
              return <MultioptionEditButton props={brands} getValue={(e)=>{this.helper.setElementField(e, 'brand')}} selected={0} />
            case 'id':
              return null
            default:
              return <input onChange={ 
                action((i)=>{
                  this.helper.setElementField(i.target.value, e)
                })
              } placeholder={e} value={this.helper.getNewElementValue(e)} type="text">
              </input>
            }
        })
      }
      <button onClick={()=>{
        this.addNewElementToList(this.helper.newElement)
      }}>Add New</button>
    </div>
    )
  }
}

export default observer(AddElement)
