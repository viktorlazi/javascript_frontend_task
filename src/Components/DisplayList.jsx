import React from 'react'
import ListElement from './ListElement'
import {observer} from 'mobx-react'


function DisplayList({ListStore}) {
  return (
    <div>
      {
        ListStore.filteredAndSortedList.length > 0 ? 
        <ul>
          {
            ListStore.filteredAndSortedList.map((e)=>{
              return <ListElement props={e} ListStore={ListStore}/>
            })
          }
        </ul>
        : <h4>No results</h4>
      }
    </div>
  )
}

export default observer(DisplayList)
