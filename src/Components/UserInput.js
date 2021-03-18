import React from 'react'
import {observer} from 'mobx-react'

function UserInput({userInput}) {
  return (
    <div className="userInput">
      <input type="text" id="search" placeholder="search..."
        onChange={(e)=>{userInput.setSearchField(e.target.value)}}
        />
      <select type="text" id="sortBy" placeholder="sort by..." list="sortByList"
      onChange={(e)=>{userInput.setFilter(e.target.value)}} >
        <option value="cost">sort by: cost</option>
        <option value="brand">sort by: brand</option>
        <option value="type">sort by: type</option>
        <option value="colour">sort by: colour</option>
      </select>
    </div>
  )
}

export default observer(UserInput)
