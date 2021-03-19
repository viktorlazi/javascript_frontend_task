import { makeAutoObservable } from 'mobx'
import {brands, types, colours} from '../Constants/Enum'

class ListStore{
  list = []
  constructor(){
    this.list.push({
      brand:brands.fender,
      type:types.stratocaster,
      colour:colours.blue,
      cost:4200      
    },
    {
      brand:brands.fender,
      type:types.telecaster,
      colour:colours.black,
      cost:4300      
    },
    {
      brand:brands.cort,
      type:types.singlecut,
      colour:colours.sunburn,
      cost:3301 
    },
    {
      brand:brands.epiphone,
      type:types.singlecut,
      colour:colours.yellow,
      cost:3300     
    }
    
    )
    
    makeAutoObservable(this)
  }
}

const listStore = new ListStore()
export default listStore