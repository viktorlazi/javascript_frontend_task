import { makeAutoObservable } from 'mobx'
import ProductsStore from '../../../Stores/ProductsStore'
import BrandsStore from '../../../Stores/BrandsStore'
import {ProductsInputStore} from '../../../Stores/UserInputStore'

class ProductsService{
  processedList = []

  constructor(){
    makeAutoObservable(this)
  }

  getSortingTypes(){
    return ProductsStore.sortingTypes
  }
  addNewElement(newElement){
    ProductsStore.addNewElement(newElement)
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
  unbrandIfBrandNotExistent(list, validBrands){
    list.forEach(e => {
      if(!validBrands.includes(e.brand)){
        e.brand=0
      }
    })
    return list
  }
  processList(){
    let list = this.filter(ProductsStore.list, ProductsInputStore.searchField)
    list = this.sort(list, ProductsInputStore.sortBy)    
    list = this.unbrandIfBrandNotExistent(list, BrandsStore.getListProperties('id'))
    this.processedList=[...list]
  }
}

const productsService = new ProductsService()
export default productsService