import { makeAutoObservable } from 'mobx';

export default class UserInputStore{
  searchField = '';
  sortBy = '';
  constructor(){
    makeAutoObservable(this);
  }
  setSearchField(x){
    this.searchField = x;
  }
  setSort(x){
    this.sortBy = x;
  }
};