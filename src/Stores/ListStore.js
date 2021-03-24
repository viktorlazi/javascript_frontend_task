import { makeAutoObservable } from 'mobx'

class ListStore{
  list = []
  filteredAndSortedList = []
  sortingTypesList = ['brand', 'type', 'colour', 'cost']
  newElement = {}
  brands = ['fender', 'cort', 'epiphone']
  
  constructor(){
    this.list.push({
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
    makeAutoObservable(this)
  }

  removeElement(id){
    //for some reason list.splice() not working
    this.list=this.list.filter(e=>{
        return e.id !== id
      }
    )
  }
  editElement(id, field, value){
    const index = this.list.findIndex(obj => obj.id === id)
    this.list[index][field] = value
  }
  addNewElement(){
    if(this.isNewElementValid(this.newElement)){
      let newElement = this.newElement
      newElement['id'] = this.list.length - 1
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
    if(Object.keys(newElement).length < this.sortingTypesList.length){
      return false
    }
    return true
  }
}

const listStore = new ListStore()
export default listStore