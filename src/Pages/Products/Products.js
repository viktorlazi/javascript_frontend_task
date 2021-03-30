import React, {useEffect} from 'react'
import {observer} from 'mobx-react'

import UserInput from '../../Components/UserInput'
import AddElement from '../../Components/AddElement'
import DisplayList from '../../Components/DisplayList'

import UserInputStore from '../../Stores/UserInputStore'
import {ProductsListStore, BrandsListStore} from '../../Stores/ListStore'

import './styles/products.css'

function List() {
  useEffect(() => {
    let filtered = [...ProductsListStore.list.filter((e)=>{
      return (e.brand + e.type + e.colour + e.cost).includes(UserInputStore.searchField)
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
    ProductsListStore.filteredAndSortedList=[...filtered]
  }, [UserInputStore.searchField, UserInputStore.sort, ProductsListStore.list.length])
  return (
    <div id="products">
      <UserInput UserInputStore={UserInputStore} ListStore={ProductsListStore} />
      <DisplayList ListStore={ProductsListStore} />
      <AddElement ListStore={ProductsListStore} />
    </div>
  )
}

export default observer(List)
