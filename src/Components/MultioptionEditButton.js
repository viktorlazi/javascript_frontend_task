import React from 'react'

function MultioptionEditButton({props, ListStore, name}) {
  return (
    <select type="text" onChange={(e)=>{
      ListStore.editElement(props.id, name, e.target.value)
    }}>
      {
        <option>-</option>
      }
      {
        ListStore.brands.map((e)=>{
          return <option value={e}>{e}</option>
        })
      }
    </select>
  )
}

export default MultioptionEditButton
