import React, {useEffect} from 'react'
import {observer} from 'mobx-react'

import UserInput from '../../Components/UserInput'
import AddElement from './Components/AddElement'
import DisplayList from '../../Components/DisplayList'

import {ProductsInputStore} from '../../Stores/UserInputStore'
import ProductsService from './Stores/ProductsService'
import ProductsStore from '../../Stores/ProductsStore'

import './styles/products.css'
import ListElement from '../../Components/ListElement'

function Products() {
  useEffect(() => { 
    ProductsService.processList()
  }, [
    ProductsInputStore.searchField, 
    ProductsInputStore.sortBy, 
    ProductsStore.list.length])
  return (
    <div id="products">
      <UserInput UserInputStore={ProductsInputStore} ListStore={ProductsService} />
      <DisplayList> 
        {
          ProductsService.processedList.map((e)=>{
            return <ListElement props={e} ListStore={ProductsService.processedList}/>
          })
        }        
      </DisplayList>
      <AddElement ListStore={ProductsService} />
    </div>
  )
}

export default observer(Products)
