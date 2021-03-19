import { makeAutoObservable } from 'mobx'

class HelperStore{
  filteredAndSortedList = []
  sortingTypesList = []
  
  constructor(){
    makeAutoObservable(this)
  }
}

const helperStore = new HelperStore()
export default helperStore