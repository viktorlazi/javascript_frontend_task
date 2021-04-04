import { makeAutoObservable } from 'mobx'

class ListStore{
  list = []
  filteredAndSortedList = []
  sortingTypesList = []
  newElement = {}
  availableIDs=[]
  
  constructor(){
    makeAutoObservable(this)
  }

  removeElement(id){
    if(this.list=this.list.filter(e=>{
        return e.id !== id
      }
    )){
      this.availableIDs.push(id)
    }
  }
  editElement(id, field, value){
    const index = this.list.findIndex(obj => obj.id === id)
    this.list[index][field] = value
  }
  addNewElement(){
    if(this.isNewElementValid(this.newElement)){
      let newElement = this.newElement
      if(this.availableIDs.length){
        newElement['id'] = this.availableIDs[0]
        this.availableIDs.shift()
      }else{
        newElement['id'] = this.list.length
      }
      this.list.push(newElement)
      this.newElement = {}
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
}

/**
 * preset products and brands
 */

const BrandsListStore = new ListStore()
BrandsListStore.list.push({
  id:0,
  name:'unbranded',
  numberOfProducts: 0
},
{
  id:1,
  name:'epiphone',
  numberOfProducts: 0
},
{
  id:2,
  name:'cort',
  numberOfProducts: 0
},
{
  id:3,
  name:'fender',
  numberOfProducts: 0
}
)
BrandsListStore.sortingTypesList = ['name', 'number of products']
export {BrandsListStore}

const ProductsListStore = new ListStore()
ProductsListStore.list.push({
  id:0,
  brand:3,
  type:'stratocaster',
  colour:'blue',
  cost:4200      
},
{
  id:1,
  brand:3,
  type:'telecaster',
  colour:'black',
  cost:4300      
},
{
  id:2,
  brand:2,
  type:'singlecut',
  colour:'sunburn',
  cost:3301 
},
{ 
  id:3,
  brand:1,
  type:'singlecut',
  colour:'yellow',
  cost:3300     
}    
)    
ProductsListStore.sortingTypesList = ['brand', 'type', 'colour', 'cost']
ProductsListStore.newElement = {brand:'', type:'', colour:'', cost:''}
export {ProductsListStore}
