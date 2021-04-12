import React, {useEffect} from 'react'
import {observer} from 'mobx-react'
import './styles/brands.css'
import UserInput from '../../Components/UserInput'
import {BrandsListStore, ProductsListStore} from '../../Stores/ListStore'
import UserInputStore from '../../Stores/UserInputStore'
import DisplayList from '../../Components/DisplayList'
import AddElement from '../../Components/AddElement'

function Brands() {
  useEffect(() => {
    let products = ProductsListStore.getListProperties('brand')
    console.log(products)
    BrandsListStore.list.forEach((e)=>{
      e.numberOfProducts = products.filter((i)=>{return parseInt(i)===e.id}).length
    })

    let filtered = [...BrandsListStore.list.filter((e)=>{
      return e.name.includes(UserInputStore.searchField)
    })]
    filtered.sort(
      (a,b)=>{
        const nameA = a[UserInputStore.sort]
        const nameB = b[UserInputStore.sort]
        if (nameA < nameB) {
          return -1;
        }else if (nameA > nameB) {
          return 1;
        }
        return 0;
      }
    )
    BrandsListStore.filteredAndSortedList=[...filtered]
  }, [UserInputStore.searchField, UserInputStore.sort, BrandsListStore.list.length, ProductsListStore.list])
  
  return (
    <div id="brands">
      <UserInput UserInputStore={UserInputStore} ListStore={BrandsListStore} />
      <DisplayList ListStore={BrandsListStore} />
      <AddElement ListStore={BrandsListStore} />      
    </div>
  )
}

export default observer(Brands)