import { makeAutoObservable } from 'mobx'

class ListStore{
  list = []
  constructor(){
    this.list.push({
      brand:'fender',
      type:'stratocaster',
      colour:'blue',
      cost:4200      
    },
    {
      brand:'fender',
      type:'telecaster',
      colour:'black',
      cost:4300      
    },
    {
      brand:'fender',
      type:'jazzmaster',
      colour:'sunburn',
      cost:5500    
    },
    {
      brand:'epiphone',
      type:'singlecut',
      colour:'yellow',
      cost:3300     
    }
    
    )
    
    makeAutoObservable(this)
  }
}

const listStore = new ListStore()
export default listStore