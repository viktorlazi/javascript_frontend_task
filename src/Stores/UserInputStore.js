import { makeAutoObservable } from 'mobx'

class UserInputStore{
  searchField = '';
  sort = 'cost';
  constructor(){
    makeAutoObservable(this)
  }
  setSearchField(x){
    this.searchField=x
  }
  setSort(x){
    this.sort = x
  }
}

const userInputStore = new UserInputStore()
export default userInputStore