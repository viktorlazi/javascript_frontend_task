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
      return (e.brand + e.type + e.colour).includes(userInput.searchField)
    })]
    filtered.sort(
      (a,b)=>{
        const nameA = a[userInput.sort]
        const nameB = b[userInput.sort]
        if (nameA < nameB) {
          return -1;
        }else if (nameA > nameB) {
          return 1;
        }
        return 0;
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
