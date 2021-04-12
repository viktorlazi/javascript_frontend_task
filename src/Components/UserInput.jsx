import React from 'react'
import {observer} from 'mobx-react'

function UserInput({UserInputStore, ListStore}) {
  return (
    <div className="userInput">
      <input type="text" id="search" placeholder="search..."
        onChange={(e)=>{UserInputStore.setSearchField(e.target.value)}}
        />
        {
        ListStore.sortingTypes.length?
        <select type="text" id="sortBy" placeholder="sort by..." list="sortByList"
          onChange={(e)=>{UserInputStore.setSort(e.target.value)}} >
          {
            <option>-</option>
          }
          {
            ListStore.sortingTypes.map((e)=>{
              return <option value={e}>sort by: {e}</option>
            })
          }
        </select>
        :null
        }
    </div>
  )
}

export default observer(UserInput)
