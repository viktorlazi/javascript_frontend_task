import { makeAutoObservable} from 'mobx'
import ProductsStore from '../../../Stores/ProductsStore'
import BrandsStore from '../../../Stores/BrandsStore'

class ProductsService{
  idList = []

  constructor(){
    makeAutoObservable(this)
  }
  getElementById(id){
    return ProductsStore.getElementById(id)
  }
  getSortingTypes(){
    return ProductsStore.sortingTypes
  }
  addNewElement(newElement){
    return ProductsStore.addNewElement(newElement)
  }
  removeElement(id){
    this.idList.splice(this.idList.indexOf(id))
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
    let filtered = [...list.filter((e)=>{
      return (BrandsStore.getElementById(e.brand).name + e.type + e.colour + e.cost).includes(searchField)
    })]
    return filtered
  }
  processList(searchField, sortBy){
    ProductsStore.unbrandIfBrandNotExistent(BrandsStore.getListProperties('id'))
    let list = this.filter(ProductsStore.list, searchField)
    list = this.sort(list, sortBy)
    const idList = list.map(e=>{return e.id})
    this.idList=idList    
  }
}

const productsService = new ProductsService()
export default productsService