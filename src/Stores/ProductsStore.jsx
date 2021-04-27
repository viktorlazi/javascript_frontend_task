import { makeAutoObservable } from 'mobx'

class ProductsStore{
  list = []
  sortingTypes = []
  availableIDs = []
  
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
    if(!this.isNewElementValid(edited)){
      return [false, 'Invalid input - empty fields']
    }
    if(isNaN(edited.cost)){
      return [false, 'Invalid input - cost must be a number']
    }
    if(!isNaN(edited.type)){
      return [false, 'Invalid input - type must be a string']
    }
    if(!isNaN(edited.colour)){
      return [false, 'Invalid input - colour must be a string']
    }
    const index = this.list.findIndex(obj => obj.id === id);
    this.listElementEqualTo(edited, index);
    return [true, 'Element edited']
  }
  

  addNewElement(newElement){
    if(this.isNewElementValid(newElement)){
      if(!isNaN(newElement.cost) && isNaN(newElement.type) && isNaN(newElement.colour)){
        let id
        if(this.availableIDs.length){
          id = this.availableIDs[0]
          this.availableIDs.shift()
        }else{
          id = this.list.length
        }
        this.list.push({})
        this.list[this.list.length-1]['id'] = id
        Object.keys(newElement).map((e)=>{
          this.list[this.list.length-1][e] = newElement[e]
          return true
        })
        return true
      }
      alert('-type and colour cant be numbers\n-cost can only be a number')
      return false
    }
    alert('invalid inputs')
    return false
  }
  isNewElementValid(newElement){
    const keys = Object.keys(newElement)
    if(keys.length>0){
      return keys.every((e)=>{
        return newElement[e]
      })
    }
    return false
  }
  getListProperties(key){
    return this.list.map(e=>e[key])
  }
  unbrandIfBrandNotExistent(validBrands){
    this.list.forEach(e => {
      if(!validBrands.includes(e.brand)){
        e.brand=1
      }
    })
  }
}

const productsStore = new ProductsStore()

/**
 * preset products
 */
 
productsStore.list.push({
  id:0,
  brand:4,
  type:'stratocaster',
  colour:'blue',
  cost:4200      
},
{
  id:1,
  brand:4,
  type:'telecaster',
  colour:'black',
  cost:4300      
},
{
  id:2,
  brand:3,
  type:'singlecut',
  colour:'sunburn',
  cost:3301 
},
{ 
  id:3,
  brand:2,
  type:'singlecut',
  colour:'yellow',
  cost:3300     
}    
)    
productsStore.sortingTypes = ['brand', 'type', 'colour', 'cost']
 
export default productsStore