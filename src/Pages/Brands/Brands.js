import React from 'react'
import {observer} from 'mobx-react'
import './styles/brands.css'
import UserInput from '../../Components/UserInput'
import {BrandsListStore} from '../../Stores/ListStore'
import UserInputStore from '../../Stores/UserInputStore'
import DisplayList from '../../Components/DisplayList'

function Brands() {
  return (
    <div id="brands">
      <UserInput UserInputStore={UserInputStore} ListStore={BrandsListStore} />
      <DisplayList ListStore={BrandsListStore} />
    </div>
  )
}

export default observer(Brands)
