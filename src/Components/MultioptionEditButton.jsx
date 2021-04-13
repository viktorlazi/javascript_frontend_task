import React from 'react'
import {observer} from 'mobx-react'

function MultioptionEditButton({props}) {
  return (
    <select type="text">
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
