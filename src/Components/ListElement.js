import React from 'react'
import './styles/listElement.css'
import ListStore from '../Stores/ListStore'

function ListElement({props}) {
  return (
    <li>
      {
        Object.keys(props).map((e)=>{
          if(e!=='id'){
            return <p>{props[e]}</p>
          }
        })
      }
      <span className="edit__span">edit</span>
      <span onClick={()=>{ListStore.removeElement(props.id)}} className="remove__span">remove</span>
    </li>
  )
}

export default ListElement