import React from 'react'
import './styles/listElement.css'

function ListElement({props}) {
  return (
    <li>
      {
        Object.keys(props).map((e)=>{
          return <p>{props[e]}</p>
        })
      }
    </li>
  )
}

export default ListElement