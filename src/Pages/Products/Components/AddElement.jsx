import React from 'react'
import {observer} from 'mobx-react'
import {action, makeAutoObservable} from 'mobx'
import BrandsStore from '../../../Stores/BrandsStore'
import ProductsService from '../Stores/ProductsService'
import MultioptionEditButton from '../../../Components/MultioptionEditButton'
import './styles/addElement.css'

class Helper{
  newElement

  constructor(){
    this.newElement = {
      brand:1,
      type:'',
      colour:'',
      cost:''
    }
    makeAutoObservable(this)
  }
  addNewElementToList(setAlert){
    const result = ProductsService.addNewElement(this.newElement)
    result[0]?
    setAlert(result[1], 'var(--main-color)'):
    setAlert(result[1], 'red')
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
              return null
            case 'brand':
              const brands = BrandsStore.list
              return [<p>brand:</p>, <MultioptionEditButton 
                props={brands} 
                getValue={(e)=>{this.helper.newElement['brand']=e}}/>]
            default:
              return [<p>{e}:</p>, <input onChange={ 
                action((i)=>{
                  this.helper.newElement[e]=i.target.value
                })
              } placeholder={e} value={this.helper.newElement[e]} type="text">
              </input>]
            }
          })
        }
      <button onClick={()=>{
        this.helper.addNewElementToList(this.props.setAlert)
        const lastSelected = this.helper.newElement.brand
        action(()=>{this.helper.newElement = {
          brand:lastSelected,
          type:'',
          colour:'',
          cost:''
        }})
      }}>Add New</button>
    </div>
    )
  }
}

export default observer(AddElement)