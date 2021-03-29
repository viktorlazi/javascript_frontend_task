import React from 'react'
import './styles/listElement.css'
import {useState} from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'
import MultioptionEditButton from './MultioptionEditButton'

function ListElement({props, ListStore}) {
  const [isInEditMode, setIsInEditMode] = useState(false)
  if(!isInEditMode){
    return (
      <li>
      {
        Object.keys(props).map((e)=>{
          if(e!=='id'){
            return <p>{props[e]}</p>
          }
          return null
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
          if(e==='brand'){
            return <MultioptionEditButton props={props} ListStore={ListStore} name="brand" />
          }
          else if(e!=='id'){
            return <input onChange={action((i)=>{ListStore.editElement(props.id, e, i.target.value)})} 
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