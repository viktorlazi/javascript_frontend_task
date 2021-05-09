import { makeAutoObservable } from 'mobx';

export default class UserInputStore{
  searchField = '';
  sortBy = 'cost';
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