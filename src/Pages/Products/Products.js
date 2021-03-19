import React from 'react'
import ListElement from '../../Components/ListElement'
import UserInput from '../../Components/UserInput'
import './styles/products.css'
import {observer} from 'mobx-react'
import userInputStore from '../../Stores/UserInputStore';
import {useEffect} from 'react'
import HelperStore from '../../Stores/HelperStore'

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
    HelperStore.filteredAndSortedList=[...filtered]
  }, [userInputStore.searchField, userInputStore.sort, listElements])
  return (
    <div id="list">
      <UserInput userInput={userInputStore} />
      {
        HelperStore.filteredAndSortedList.length > 0 ? 
        <ul>
          {
            HelperStore.filteredAndSortedList.map((e)=>{
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
