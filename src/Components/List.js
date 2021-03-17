import React from 'react'
import ListElement from './ListElement'

function List({listElements}) {
  return (
    <div>
      <input type="text" id="search"/>
      {
        listElements ? 
        <ul>
          {listElements.map((e)=>{
            return <ListElement props={e}/>
          })}
        </ul>
        : <h3>No elements in a list</h3>
      }
    </div>
  )
}

export default List
