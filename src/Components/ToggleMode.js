import React from 'react'
import {observer} from 'mobx-react'
import './styles/toggleMode.css';

function ToggleMode({UserMode}) {
  return (
    <div id="toggle__buttons">
      <button onClick={()=>UserMode.setListMode()}>List</button>
      <button onClick={()=>UserMode.setEditMode()}>Edit</button>
    </div>
  )
}

export default observer(ToggleMode)
