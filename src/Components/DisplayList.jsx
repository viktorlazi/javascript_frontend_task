import React from 'react'
import ListElement from './ListElement'
import {observer} from 'mobx-react'


function DisplayList({ListStore}) {
  return (
    <div>
      {
        ListStore.filteredAndSorted.length > 0 ? 
        <ul>
          {
            ListStore.filteredAndSorted.map((e)=>{
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
