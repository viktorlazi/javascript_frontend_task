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
    switch(userInput.sort){
      case 'cost':
        filtered.sort(
          (a,b)=>{
            return a.cost - b.cost
          }
        )
        break;
      case 'brand':
        filtered.sort(
          (a,b)=>{
            const nameA = a.brand.toUpperCase();
            const nameB = b.brand.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          }
        )
        break;
      case 'type':
        filtered.sort(
          (a,b)=>{
            const nameA = a.type.toUpperCase();
            const nameB = b.type.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          }
        )
        break;
      case 'colour':
        filtered.sort(
          (a,b)=>{
            const nameA = a.colour.toUpperCase();
            const nameB = b.colour.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          }
        )
        break;
      default: break;
    }
     
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
