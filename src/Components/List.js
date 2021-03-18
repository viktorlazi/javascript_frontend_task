import React from 'react'
import ListElement from './ListElement'
import UserInput from './UserInput'
import './styles/list.css'

import userInput from '../Stores/UserInputStore';

function List({listElements}) {
  return (
    <div id="list">
      <UserInput userInput={userInput} />
      {
        listElements.length > 0 ? 
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
