import React from 'react'
import ListElement from './ListElement'
import UserInput from './UserInput'
import './styles/list.css'
import {observer} from 'mobx-react'
import userInput from '../Stores/UserInputStore';

function List({listElements}) {
  return (
    <div id="list">
      <UserInput userInput={userInput} />
      {
        listElements.length > 0 ? 
        <ul>
          {listElements.map((e)=>{
            if((e.brand + e.type + e.colour).includes(userInput.searchField)){
              return <ListElement props={e}/>
            }
          })}
        </ul>
        : <h3>List is empty</h3>
      }
    </div>
  )
}

export default observer(List)
