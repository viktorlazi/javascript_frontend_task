import React from 'react'
import './styles/listElement.css'

function ListElement({props}) {
  return (
    <li>
      <p>{props.brand}</p>
      <p>{props.type}</p>
      <p>{props.colour}</p>
      <p>{props.cost}</p>
    </li>
  )
}

export default ListElement