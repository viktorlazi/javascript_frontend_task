import { makeAutoObservable , toJS } from 'mobx'
import ProductsStore from './ProductsStore'

class BrandsStore{
  list = []
  sortingTypes = []
  availableIDs=[]
  
  constructor(){
    makeAutoObservable(this)
  }
  getElementById(id){
    const index = this.list.findIndex(obj => obj.id === id)
    return this.list[index]
  }
  removeElement(id){
    this.list=this.list.filter(e=>{
      return e.id !== id
    })
    this.availableIDs.push(id)
  }
  listElementEqualTo(obj, index){
    Object.keys(this.list[index]).map((e)=>{
      if(e!=='id'){
        this.list[index][e] = obj[e]
      }
      return true
    })
  }
  editElement(edited, id){
    if(this.isNewElementValid(edited)){
      if(isNaN(edited.name)){
        const index = this.list.findIndex(obj => obj.id === id)
        this.listElementEqualTo(edited, index)
        return true
      }
      alert('-brand name cant be a number')
      return false
    }
    alert('invalid inputs')
    return false
  }
  addNewElement(newElement){
    if(this.isNewElementValid(newElement)){
      let id
      if(this.availableIDs.length){
        id = this.availableIDs[0]
        this.availableIDs.shift()
      }else{
        id = this.list.length
      }
      this.list.push({})
      this.list[this.list.length-1]['id'] = id+1
      Object.keys(newElement).map((e)=>{
        this.list[this.list.length-1][e] = newElement[e]
        return true
      })
      console.log(toJS(this.list[this.list.length-1]))
      return true
    }else{
      alert('invalid inputs')
    }
  }
  getNewElementValue(key){
    return this.newElement[key] === undefined ? '':this.newElement[key] 
  }
  isNewElementValid(newElement){
    const keys = Object.keys(newElement)
    if(keys.length>0){
      return keys.every((e)=>{
        return newElement[e] !== ''
      })
    }
    return false
  }
  getListProperties(key){
    return this.list.map(e=>e[key])
  }
  setNumberOfProducts(){
    const products = ProductsStore.list
    this.list.forEach((e)=>{
      e.numberOfProducts=products.filter((i)=>{return i.brand===e.id}).length
    })
    
  }
}

const brandsStore = new BrandsStore()
brandsStore.list.push({
  id:1,
  name:'unbranded',
  numberOfProducts: 0
},
{
  id:2,
  name:'epiphone',
  numberOfProducts: 0
},
{
  id:3,
  name:'cort',
  numberOfProducts: 0
},
{
  id:4,
  name:'fender',
  numberOfProducts: 0
},
{
  id:5,
  name:'yamaha',
  numberOfProducts: 0
}
)
brandsStore.sortingTypes = ['name', 'numberOfProducts']
 
export default brandsStore