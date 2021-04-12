import { makeAutoObservable } from 'mobx'
import ProductsStore from '../../../Stores/ProductsStore'
import {ProductsInputStore} from '../../../Stores/UserInputStore'
import BrandsStore from '../../../Stores/BrandsStore'

class ProductsService{
  filteredAndSorted = []
  newElement = {}
  sortingTypes = []

  constructor(){
    makeAutoObservable(this)
  }

  filterAndSort(){
    let filtered = [...ProductsStore.list.filter((e)=>{
      return (e.brand + e.type + e.colour + e.cost).includes(ProductsInputStore.searchField)
    })]
    filtered.sort(
      (a,b)=>{
        const nameA = a[ProductsInputStore.sortBy]
        const nameB = b[ProductsInputStore.sortBy]
        if (nameA < nameB) {
          return -1;
        }else if (nameA > nameB) {
          return 1;
        }
        return 0;
      }
    )
    const branded = BrandsStore.getListProperties('id')
    filtered.forEach(e => {
      if(!branded.includes(e.brand)){
        e.brand=0
      }
    })

    this.filteredAndSorted=[...filtered]
  }
}

const productsService = new ProductsService()
export default productsService