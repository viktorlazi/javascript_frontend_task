import React from 'react'
import {observer} from 'mobx-react'
import ListStore from '../Stores/ListStore'

function UserInput({userInput}) {
  return (
    <div className="userInput">
      <input type="text" id="search" placeholder="search..."
        onChange={(e)=>{userInput.setSearchField(e.target.value)}}
        />
      <select type="text" id="sortBy" placeholder="sort by..." list="sortByList"
        onChange={(e)=>{userInput.setSort(e.target.value)}} >
        {
          ListStore.sortingTypesList.map((e)=>{
            return <option value={e}>sort by: {e}</option>
          })
        }
      </select>
    </div>
  )
}

export default observer(UserInput)
