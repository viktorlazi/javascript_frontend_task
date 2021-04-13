import { makeAutoObservable } from 'mobx'
import {BrandsInputStore} from '../../../Stores/UserInputStore'
import BrandsStore from '../../../Stores/BrandsStore'

class BrandsService{
  processedList = []
  newElement = {}

  constructor(){
    makeAutoObservable(this)
  }

  sort(list, sortBy){
    list.sort(
      (a,b)=>{
        const nameA = a[sortBy]
        const nameB = b[sortBy]
        if (nameA < nameB) {
          return -1;
        }else if (nameA > nameB) {
          return 1;
        }
        return 0;
      }
      )
      return list
    }
  filter(list, searchField){
    let filtered = [...list.filter((e)=>{
      return (e.brand + e.type + e.colour + e.cost).includes(searchField)
    })]
    return filtered
  }
  processList(){
    let list = this.filter(BrandsStore.list, BrandsInputStore.searchField)
    list = this.sort(list, BrandsInputStore.sortBy)    
    this.processedList=[...list]
  }
}

const brandsService = new BrandsService()
export default brandsService