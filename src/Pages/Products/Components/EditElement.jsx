import React from 'react'
import MultioptionEditButton from '../../../Components/MultioptionEditButton'
import BrandsStore from '../../../Stores/BrandsStore'

function EditElement({props, editElement}) {
  return Object.keys(props).map((e)=>{
    switch(e){
      case 'brand':
        return <MultioptionEditButton props={BrandsStore.list} />
      case 'id':
        return null
      default:
        return <input 
          onChange={()=>{}} 
          value={props[e]} 
          placeholder={e} 
          type="text"/>
    }
  })
}

export default EditElement
