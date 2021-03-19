import React, {useEffect, useState} from 'react'
import {observer} from 'mobx-react'
import {sortingTypes} from '../Constants/Enum'

function UserInput({userInput}) {
  const [sortingTypesList, setSortingTypesList] = useState([])
  useEffect(() => {
    let list = [];
    for (let item in sortingTypes) {
      if (isNaN(Number(item))) {
        list.push(item)
      }
    }
    setSortingTypesList([...list])
  }, [sortingTypes])
  return (
    <div className="userInput">
      <input type="text" id="search" placeholder="search..."
        onChange={(e)=>{userInput.setSearchField(e.target.value)}}
        />
      <select type="text" id="sortBy" placeholder="sort by..." list="sortByList"
        onChange={(e)=>{userInput.setSort(e.target.value)}} >
        {
          sortingTypesList.map((e)=>{
            return <option value={e}>sort by: {e}</option>
          })
        }
      </select>
    </div>
  )
}

export default observer(UserInput)
