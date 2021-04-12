import React from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'
import {BrandsListStore} from '../Stores/ListStore'


function AddElement({ListStore}) {
  return (
    <div className="add__new">
      {
        ListStore.sortingTypesList.map((e)=>{
          switch(e){
            case 'brand':
              const brands = BrandsListStore.list
              return <select type="text" value={ListStore.getNewElementValue(e)} onChange={action((i)=>{
                  ListStore.newElement['brand'] = i.target.value
                })
              }>
              {
                <option value="undefined">-</option>
              }
              {
                brands.map((e)=>{
                  return <option value={e.id}>{e.name}</option>
                })
              }
              </select>
            case 'id':
            case 'number of products':
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
