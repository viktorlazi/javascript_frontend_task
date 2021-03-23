import React, {useEffect} from 'react'
import ListElement from '../../Components/ListElement'
import UserInput from '../../Components/UserInput'
import './styles/products.css'
import {observer} from 'mobx-react'
import userInputStore from '../../Stores/UserInputStore'
import ListStore from '../../Stores/ListStore'

function List({listElements}) {
  
  useEffect(() => {
    let filtered = [...listElements.filter((e)=>{
      return (e.brand + e.type + e.colour).includes(userInputStore.searchField)
    })]
    filtered.sort(
      (a,b)=>{
        const nameA = a[userInputStore.sort]
        const nameB = b[userInputStore.sort]
        if (nameA < nameB) {
          return -1;
        }else if (nameA > nameB) {
          return 1;
        }
        return 0;
      }
    )
    ListStore.filteredAndSortedList=[...filtered]
  }, [userInputStore.searchField, userInputStore.sort, listElements])
  return (
    <div id="products">
      <UserInput userInput={userInputStore} />
      {
        ListStore.filteredAndSortedList.length > 0 ? 
        <ul>
          {
            ListStore.filteredAndSortedList.map((e)=>{
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
