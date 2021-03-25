import React from 'react'
import {observer} from 'mobx-react'

function UserInput({UserInputStore, ListStore}) {
  return (
    <div className="userInput">
      <input type="text" id="search" placeholder="search..."
        onChange={(e)=>{UserInputStore.setSearchField(e.target.value)}}
        />
      <select type="text" id="sortBy" placeholder="sort by..." list="sortByList"
        onChange={(e)=>{UserInputStore.setSort(e.target.value)}} >
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
