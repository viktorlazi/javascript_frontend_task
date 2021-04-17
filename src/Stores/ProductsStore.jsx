import { makeAutoObservable, toJS } from 'mobx'

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
    if(this.list.splice(this.list.indexOf(e=>e.id===id)+1, 1)){
      return this.availableIDs.push(id)
    }
    alert('invalid id')
  }
  listElementEqualTo(obj, index){
    Object.keys(this.list[index]).map((e)=>{
      if(e!=='id'){
        this.list[index][e] = obj[e]
      }
    })
  }
  editElement(edited, id){
    if(this.isNewElementValid(edited)){
      if(!isNaN(edited.cost) && isNaN(edited.type) && isNaN(edited.colour)){
        const index = this.list.findIndex(obj => obj.id === id)
        this.listElementEqualTo(edited, index)
        return true
      }
      alert('-type and colour cant be numbers\n-cost can only be a number')
      return false
    }
    alert('invalid inputs')
    return false
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
        })
        return true
      }
      alert('-type and colour cant be numbers\n-cost can only be a number')
      return false
    }
    alert('invalid inputs')
    return false
  }
  getNewElementValue(key){
    return this.newElement[key] === undefined ? '':this.newElement[key] 
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