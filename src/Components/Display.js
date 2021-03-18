import React from 'react'
import {observer} from 'mobx-react'

import ListStore from '../Stores/ListStore'
import Edit from './Edit'
import List from './List'
import './styles/display.css'

function Display({isInEditMode}) {
  return <div id="display">
    {isInEditMode? <Edit/> : <List listElements={ListStore.list}/>}
  </div>
}

export default observer(Display)
