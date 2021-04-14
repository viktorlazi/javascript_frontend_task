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
    return ProductsStore.addNewElement(newElement)
  }
  removeElement(id){
    return ProductsStore.removeElement(id)
  }
  editElement(edited, id){
    return ProductsStore.editElement(edited, id)
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
    const validBrands = BrandsStore.getListProperties('name')
    let filtered = [...list.filter((e)=>{
      return (validBrands[e.brand] + e.type + e.colour + e.cost).includes(searchField)
    })]
    return filtered
  }
  processList(){
    ProductsStore.unbrandIfBrandNotExistent(BrandsStore.getListProperties('id'))
    this.processedList=[]
    let list = this.filter(ProductsStore.list, ProductsInputStore.searchField)
    list = this.sort(list, ProductsInputStore.sortBy)
    list.forEach(e => {
      this.processedList.push(e.id)
    })
  }
}

const productsService = new ProductsService()
export default productsService