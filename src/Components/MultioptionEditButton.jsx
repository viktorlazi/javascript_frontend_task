import React from 'react'
import {observer} from 'mobx-react'

function MultioptionEditButton({props, getValue}) {
  return (
    <select type="text" onChange={(e)=>{getValue(e.target.value)}}>
      {
        <option>-</option>
      }
      {
        props.map((e)=>{
          return <option value={e.id}>{e.name}</option>
        })
      }
    </select>
  )
}

export default observer(MultioptionEditButton)
