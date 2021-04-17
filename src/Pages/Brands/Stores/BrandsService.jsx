import { makeAutoObservable } from 'mobx'
import BrandsStore from '../../../Stores/BrandsStore'
import {BrandsInputStore} from '../../../Stores/UserInputStore'

class BrandsService{
  idList = []

  constructor(){
    makeAutoObservable(this)
  }
  getSortingTypes(){
    return BrandsStore.sortingTypes
  }
  addNewElement(newElement){
    return BrandsStore.addNewElement(newElement)
  }
  removeElement(id){
    this.idList.splice(this.idList.indexOf(id))
    return BrandsStore.removeElement(id)
  }
  editElement(edited, id){
    return BrandsStore.editElement(edited, id)
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
      return e.name.includes(searchField)
    })]
    return filtered
  }
  processList(){
    let list = this.filter(BrandsStore.list, BrandsInputStore.searchField)
    //list = this.sort(list, BrandsInputStore.sortBy)
    const idList = list.map(e=>{return e.id})
    this.idList=idList        
  }
}

const brandsService = new BrandsService()
export default brandsService