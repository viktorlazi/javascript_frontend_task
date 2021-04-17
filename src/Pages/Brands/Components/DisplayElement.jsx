import React from 'react'
import {observer} from 'mobx-react'

function DisplayElement({props}) {
  return Object.keys(props).map((e)=>{
    switch(e){
      case 'id':
        return null
      default:
        return <p>{props[e]}</p>
    }
  })
}

export default observer(DisplayElement)