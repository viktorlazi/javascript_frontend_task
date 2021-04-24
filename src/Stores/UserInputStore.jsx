import { makeAutoObservable } from 'mobx'

class UserInputStore{
  searchField = '';
  sortBy = '';
  constructor(){
    makeAutoObservable(this);
  }
  setSearchField(x){
    this.searchField = x;
  }
  setSort(x){
    this.sort = x;
  }
}
export default UserInputStore;