import React from 'react'
import {observer} from 'mobx-react'

import Edit from './Edit'
import List from './List'
import './display.css'

function Display({isInEditMode}) {
  return <div id="display">
    {isInEditMode? <Edit/> : <List/>}
  </div>
}

export default observer(Display)
