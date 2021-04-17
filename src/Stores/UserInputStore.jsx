import { makeAutoObservable } from 'mobx'

class UserInputStore{
  searchField = ''
  sortBy
  constructor(){
    makeAutoObservable(this)
  }
  setSearchField(x){
    this.searchField = x
  }
  setSort(x){
    this.sort = x
  }
}

const BrandsInputStore = new UserInputStore()
BrandsInputStore.sortBy='name'
export  {BrandsInputStore}

const ProductsInputStore = new UserInputStore()
ProductsInputStore.sortBy='brands'
export  {ProductsInputStore}
