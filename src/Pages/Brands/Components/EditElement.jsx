import React from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'

class EditElement extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return Object.keys(this.props.props).map((e)=>{
      switch(e){
        case 'id':
          return null
        case 'numberOfProducts':
          return <p>{this.props.props[e]}</p>
        default:
          return <input 
            onChange={action((i)=>{this.props.setElementField(i.target.value, e)})}
            defaultValue={this.props.props[e]} 
            type="text"/>
      }
    })
  }
}

export default observer(EditElement)