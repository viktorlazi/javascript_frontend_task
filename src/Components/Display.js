import React from 'react'
import {observer} from 'mobx-react'

import Edit from './Edit'
import List from './List'

function Display({isInEditMode}) {
  return isInEditMode? <Edit/> : <List/>
}

export default observer(Display)
