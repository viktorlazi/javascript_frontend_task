import { makeAutoObservable } from 'mobx'

class UserInputStore{
  searchField = '';
  filter = null;
  constructor(){
    makeAutoObservable(this)
  }
  setSearchField(x){
    this.searchField=x
  }
  setFiler(x){
    this.filter = x
  }
}

const userInputStore = new UserInputStore()
export default userInputStore