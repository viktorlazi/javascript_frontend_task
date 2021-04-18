import React from 'react'
import {observer} from 'mobx-react'

function UserInput({UserInputStore, getSortingTypes}) {
  return (
    <div className="userInput">
      <input type="text" id="search" placeholder="search..."
        onChange={(e)=>{UserInputStore.setSearchField(e.target.value)}}
        />
        {
        getSortingTypes()?
        <select type="text" id="sortBy" placeholder="sort by..." list="sortByList"
          onChange={(e)=>{UserInputStore.sortBy=e.target.value}} >
          {
            getSortingTypes().map((e)=>{
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