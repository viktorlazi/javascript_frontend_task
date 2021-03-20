import { makeAutoObservable } from 'mobx'
import {brands, types, colours} from '../Constants/Enum'

class ListStore{
  list = []
  constructor(){
    this.list.push({
      id:0,
      brand:brands.fender,
      type:types.stratocaster,
      colour:colours.blue,
      cost:4200      
    },
    {
      id:1,
      brand:brands.fender,
      type:types.telecaster,
      colour:colours.black,
      cost:4300      
    },
    {
      id:2,
      brand:brands.cort,
      type:types.singlecut,
      colour:colours.sunburn,
      cost:3301 
    },
    { id:3,
      brand:brands.epiphone,
      type:types.singlecut,
      colour:colours.yellow,
      cost:3300     
    }    
    )    
    makeAutoObservable(this)
  }

  removeElement(id){
    //for some reason list.splice() not working
    this.list=this.list.filter(e=>{
        return e.id != id
      }
    )
  }
}

const listStore = new ListStore()
export default listStore