import React from 'react'
import './styles/listElement.css'
import {useState} from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'
import MultioptionEditButton from './MultioptionEditButton'
import {BrandsListStore} from '../Stores/ListStore'


function ListElement({props, ListStore}) {
  const [isInEditMode, setIsInEditMode] = useState(false)
  if(!isInEditMode){
    return (
      <li>
      {
        Object.keys(props).map((e)=>{
          switch(e){
            case 'brand':
              const brands = BrandsListStore.getListProperties('name')
              return <p>{brands[props[e]]}</p>
            case 'id':
              return null
            default:
              return <p>{props[e]}</p>
          }
        })
      }
      <span onClick={()=>{setIsInEditMode(!isInEditMode)}} className="edit__span">edit</span>
      <span onClick={action(()=>{ListStore.removeElement(props.id)})} className="remove__span">remove</span>
    </li>
  )
  }else{
    return (
      <li>
        {
        Object.keys(props).map((e)=>{
          switch(e){
            case 'brand':
              return <MultioptionEditButton props={props} ListStore={ListStore} name="brand" />
            case 'id':
              return null
            default:
              return <input 
                onChange={action((i)=>{
                  ListStore.editElement(props.id, e, i.target.value)
                })} 
                value={props[e]} 
                placeholder={e} 
                type="text"/>
          }
        })
        }
        <span onClick={()=>{setIsInEditMode(!isInEditMode)}} className="change__span">change</span>
      </li>
    )
  }
}

export default observer(ListElement)