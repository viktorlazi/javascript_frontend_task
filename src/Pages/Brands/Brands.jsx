import React, {useEffect} from 'react'
import {observer} from 'mobx-react'

import UserInput from '../../Components/UserInput'
import DisplayList from '../../Components/DisplayList'
import ListElement from './Components/ListElement'

import {BrandsInputStore} from '../../Stores/UserInputStore'
import BrandsService from './Stores/BrandsService'
import BrandsStore from '../../Stores/BrandsStore'

import './styles/brands.css'
import AddElement from './Components/AddElement'

function Products() {
  useEffect(() => { 
    BrandsService.processList()
    BrandsService.setNumberOfProducts()
  }, [
    BrandsInputStore.searchField, 
    BrandsInputStore.sortBy, 
    BrandsStore.list.length])
  
  return (
    <div id="products">
      <UserInput UserInputStore={BrandsInputStore} ListStore={BrandsService} />
      <DisplayList> 
        {
          BrandsService.idList.map((e)=>{
            return <ListElement 
              props={BrandsStore.getElementById(e)} 
              editElement={(edited, id)=>{return BrandsService.editElement(edited, id)}} 
              removeElement={(x)=>BrandsService.removeElement(x)}
              />
          })
        }        
      </DisplayList>
      <AddElement getSortingTypes={()=>{return BrandsService.getSortingTypes()}} />
    </div>
  )
}

export default observer(Products)