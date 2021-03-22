import React from 'react'
import './styles/listElement.css'
import ListStore from '../Stores/ListStore'
import {useState} from 'react'
import {observer} from 'mobx-react'


function ListElement({props}) {
  const [isInEditMode, setIsInEditMode] = useState(false)

  if(!isInEditMode){
    return (
      <li>
      {
        Object.keys(props).map((e)=>{
          if(e!=='id'){
            return <p>{props[e]}</p>
          }
        })
      }
      <span onClick={()=>{setIsInEditMode(!isInEditMode)}} className="edit__span">edit</span>
      <span onClick={()=>{ListStore.removeElement(props.id)}} className="remove__span">remove</span>
    </li>
  )
  }else{
    return (
      <li>
        {
        Object.keys(props).map((e)=>{
          if(e!=='id'){
            return <input onChange={(i)=>{ListStore.editElement(props.id, e, i.target.value)}} value={props[e]} placeholder={e} type="text"></input>
          }
        })
        }
        <span onClick={()=>{setIsInEditMode(!isInEditMode)}} className="change__span">change</span>
      </li>
    )
  }
}

export default observer(ListElement)