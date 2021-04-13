import { makeAutoObservable } from 'mobx'

class BrandsStore{
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

const brandsStore = new BrandsStore()
brandsStore.list.push({
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
brandsStore.sortingTypesList = ['name', 'number of products']
 
export default brandsStore