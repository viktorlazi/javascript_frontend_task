import React, {useEffect} from 'react'
import {observer} from 'mobx-react'

import SearchField from '../../Components/SearchField'
import AddElement from './Components/AddElement'
import DisplayList from '../../Components/DisplayList'
import ListElement from './Components/ListElement'

import UserInputStore from '../../Stores/UserInputStore'
import ProductsService from './Stores/ProductsService'
import ProductsStore from '../../Stores/ProductsStore'

import './styles/products.css'

const ProductsInputStore = new UserInputStore()
ProductsInputStore.sortBy='brands'

const columnNames =(keys)=>{
  return (
    keys.map((e)=>{
      return <th>{e}</th>
    })
  )
}

function Products() {
  useEffect(() => { 
    ProductsService.processList(ProductsInputStore.searchField, ProductsInputStore.sortBy)
    //eslint-disable-next-line
  }, [ProductsInputStore.searchField, ProductsInputStore.sortBy, ProductsStore.list.length])
  return (
    <div id="products">
      <SearchField UserInputStore={ProductsInputStore}/>
      <DisplayList> 
        {
          columnNames(ProductsService.getSortingTypes())
        }
        {
          ProductsService.idList.map((e)=>{
            return <ListElement 
              props={ProductsService.getElementById(e)} 
              editElement={(edited, id)=>{return ProductsService.editElement(edited, id)}} 
              removeElement={(x)=>ProductsService.removeElement(x)} />
          })
        }        
      </DisplayList>
      <AddElement ListStore={ProductsService} />
    </div>
  )
}

export default observer(Products)