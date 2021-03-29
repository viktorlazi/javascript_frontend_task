import { makeAutoObservable } from 'mobx'

class ListStore{
  list = []
  filteredAndSortedList = []
  sortingTypesList = ['brand', 'type', 'colour', 'cost']
  newElement = {brand:'', type:'', colour:'', cost:''}
  brands = ['fender', 'cort', 'epiphone']
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
      
      this.newElement = 
        {brand:newElement.brand, type:'', colour:'', cost:''}
    }else{
      alert('invalid inputs')
    }
  }
  getNewElementValue(key){
    return this.newElement[key] === undefined ? '':this.newElement[key] 
  }
  isNewElementValid(newElement){
    const keys = Object.keys(newElement)
    return keys.every((e)=>{
      return newElement[e] !== ''
    })
  }
}


const BrandsListStore = new ListStore()
export {BrandsListStore}

const ProductsListStore = new ListStore()
ProductsListStore.list.push({
  id:0,
  brand:'fender',
  type:'stratocaster',
  colour:'blue',
  cost:4200      
},
{
  id:1,
  brand:'fender',
  type:'telecaster',
  colour:'black',
  cost:4300      
},
{
  id:2,
  brand:'cort',
  type:'singlecut',
  colour:'sunburn',
  cost:3301 
},
{ 
  id:3,
  brand:'epiphone',
  type:'singlecut',
  colour:'yellow',
  cost:3300     
}    
)    
export {ProductsListStore}
