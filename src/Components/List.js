import React from 'react'
import ListElement from './ListElement'
import UserInput from './UserInput'
import './styles/list.css'
import {observer} from 'mobx-react'
import userInput from '../Stores/UserInputStore';
import {useState, useEffect} from 'react'

function List({listElements}) {
  const [filteredAndSortedList, setFilteredAndSortedList] = useState([])
  useEffect(() => {
    let filtered = [...listElements.filter((e)=>{
      if((e.brand + e.type + e.colour).includes(userInput.searchField)){
        return e
      }
    })]
    filtered.sort(
      (a,b)=>{
        return a.cost - b.cost
      }
    ) 
    setFilteredAndSortedList(
      [...filtered]
    )
  }, [userInput.searchField, userInput.sort, listElements])
  return (
    <div id="list">
      <UserInput userInput={userInput} />
      {
        filteredAndSortedList.length > 0 ? 
        <ul>
          {
            filteredAndSortedList.map((e)=>{
              return <ListElement props={e}/>
            })
          }
        </ul>
        : <h4>No results</h4>
      }
    </div>
  )
}

export default observer(List)
