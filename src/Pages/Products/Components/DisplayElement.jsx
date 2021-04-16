import React from 'react'
import BrandsStore from '../../../Stores/BrandsStore'
import {observer} from 'mobx-react'

function DisplayElement({props}) {
  return Object.keys(props).map((e)=>{
    switch(e){
      case 'id':
        return null
      case 'brand':
        const brands = BrandsStore.list
        return <p>{(brands.find((e)=>{return e.id===props['brand']})||{}).name || 'unbranded'}</p>
      default:
        return <p>{props[e]}</p>
    }
  })
}

export default observer(DisplayElement)