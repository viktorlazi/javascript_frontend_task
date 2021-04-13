import React from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'
import { makeAutoObservable } from 'mobx'
import BrandsStore from '../../../Stores/BrandsStore'
import ProductsService from '../Stores/ProductsService'

class Helper{
  newElement = {}
  
  constructor(){
    makeAutoObservable(this)
  }
  getNewElementValue(key){
    return this.newElement[key] === undefined ? '':this.newElement[key] 
  }
  areInputsFilled(){
    const keys = Object.keys(this.newElement)
    if(keys.length>0){
      return keys.every((e)=>{
        return this.newElement[e] !== ''
      })
    }
    return false
  }
  addNewElementToList(){
    if(this.areInputsFilled()){
      if(!isNaN(this.newElement.cost)){
        ProductsService.addNewElement(this.newElement)
        return
      }
      alert('invalid product cost')
      return
    }
    alert('invalid inputs')
    return
  }
}
const helper = new Helper()

function AddElement({ListStore}) {
  return (
    <div className="add__new">
      {
        ListStore.getSortingTypes().map((e)=>{
          switch(e){
            case 'brand':
              const brands = BrandsStore.list
              return <select type="text" value={helper.getNewElementValue(e)} onChange={action((i)=>{
                  helper.newElement['brand'] = i.target.value
                })
              }>
              {
                <option value="undefined">-</option>
              }
              {
                brands.map((e)=>{
                  return <option value={e.id}>{e.name}</option>
                })
              }
              </select>
            case 'id':
              return null
            default:
              return <input onChange={ 
                action((i)=>{
                  helper.newElement[e] = i.target.value
                })
              } placeholder={e} value={helper.getNewElementValue(e)} type="text">
              </input>
            }
        })
      }
      <button onClick={()=>{
        helper.addNewElementToList()
      }}>Add New</button>
    </div>
  )
}

export default observer(AddElement)
