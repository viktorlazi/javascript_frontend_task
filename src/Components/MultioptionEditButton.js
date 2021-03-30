import React from 'react'
import {observer} from 'mobx-react'
import {BrandsListStore} from '../Stores/ListStore'


function MultioptionEditButton({props, ListStore, name}) {
  const brands = BrandsListStore.list
  return (
    <select type="text" onChange={(e)=>{
      ListStore.editElement(props.id, name, e.target.value)
    }}>
      {
        <option>-</option>
      }
      {
        brands.map((e)=>{
          return <option value={e.id}>{e.name}</option>
        })
      }
    </select>
  )
}

export default observer(MultioptionEditButton)
