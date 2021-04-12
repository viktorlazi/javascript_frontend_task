import { makeAutoObservable } from 'mobx'

class ProductsStore{
  list = []
  sortingTypes = []
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
  editElementField(id, field, value){
    const index = this.list.findIndex(obj => obj.id === id)
    this.list[index][field] = value
  }
  addNewElement(newElement){
    if(this.isNewElementValid(newElement)){
      if(this.availableIDs.length){
        newElement['id'] = this.availableIDs[0]
        this.availableIDs.shift()
      }else{
        newElement['id'] = this.list.length
      }
      this.list.push(newElement)
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

const productsStore = new ProductsStore()

/**
 * preset products and brands
 */
 
productsStore.list.push({
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
productsStore.sortingTypes = ['brand', 'type', 'colour', 'cost']
 
export default productsStore