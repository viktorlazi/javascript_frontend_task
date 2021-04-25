import React from 'react'
import './styles/listElement.css'
import {observer} from 'mobx-react'

function DisplayList(props) {
  return (
    <div>
      {
        props.children.length ? 
        <table>
          {
            props.children
          }
        </table>
        : <h4>No results</h4>
      }
    </div>
  )
}

export default observer(DisplayList)
