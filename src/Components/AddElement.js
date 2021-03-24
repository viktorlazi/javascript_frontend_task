import React from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'
import ListStore from '../Stores/ListStore'

function AddElement() {
  return (
    <div className="add__new">
      {
        Object.keys(ListStore.list[0]).map((e)=>{
          if(e!=='id'){
            return <input onChange={ 
              action((i)=>{
                ListStore.newElement[e] = i.target.value
              })
            } placeholder={e} value={ListStore.getNewElementValue(e)} type="text"></input>
          }
          return null
        })
      }
      <button onClick={()=>{
        ListStore.addNewElement()
      }}>Add New</button>
    </div>
  )
}

export default observer(AddElement)
