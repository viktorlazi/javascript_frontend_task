import React from 'react'
import BrandsStore from '../../../Stores/BrandsStore'
import {observer} from 'mobx-react'

function DisplayElement({props}) {
  return Object.keys(props).map((e)=>{
    switch(e){
      case 'id':
        return null
      case 'brand':
        const brands = BrandsStore.getListProperties('name')
        return <p>{brands[props[e]]}</p>
      default:
        return <p>{props[e]}</p>
    }
  })
}
 

export default observer(DisplayElement)
