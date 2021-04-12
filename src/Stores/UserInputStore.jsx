import { makeAutoObservable } from 'mobx'

class UserInputStore{
  searchField = '';
  sortBy = 'brand';
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

const BrandsInputStore = new UserInputStore()
export  {BrandsInputStore}

const ProductsInputStore = new UserInputStore()
export  {ProductsInputStore}
