import React, {useEffect} from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'

function AddElement({ListStore}) {
  return (
    <div className="add__new">
      {
        ListStore.sortingTypesList.map((e)=>{
          switch(e){
            case 'brand':
              return <select type="text" value={ListStore.getNewElementValue(e)} onChange={action((i)=>{
                  ListStore.newElement['brand'] = i.target.value
                })
              }>
              {
                <option value="undefined">-</option>
              }
              {
                ListStore.brands.map((e)=>{
                  return <option value={e}>{e}</option>
                })
              }
              </select>
            case 'id':
              return null
            default:
              return <input onChange={ 
                action((i)=>{
                  ListStore.newElement[e] = i.target.value
                })
              } placeholder={e} value={ListStore.getNewElementValue(e)} type="text">
              </input>
            }
        })
      }
      <button onClick={()=>{
        ListStore.addNewElement()
      }}>Add New</button>
    </div>
  )
}

export default observer(AddElement)
