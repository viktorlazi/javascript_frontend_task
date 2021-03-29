import React, {useEffect} from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'

function AddElement({ListStore}) {
  return (
    <div className="add__new">
      {
        ListStore.sortingTypesList.map((e)=>{
          if(e==='brand'){
            return <select type="text" onChange={action((i)=>{
                ListStore.newElement['brand'] = i.target.value
              })
            }>
              {
                <option>-</option>
              }
              {
                ListStore.brands.map((e)=>{
                  return <option value={e}>{e}</option>
                })
              }
            </select>           
          }else if(e!=='id'){
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
