import React from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'
import MultioptionEditButton from '../../../Components/MultioptionEditButton'
import BrandsStore from '../../../Stores/BrandsStore'

class EditElement extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return Object.keys(this.props.props).map((e)=>{
      switch(e){
        case 'brand':
          return <MultioptionEditButton selected={this.props.props.brand} props={BrandsStore.list} getValue={(e)=>{this.props.setElementField(e, 'brand')}} />
        case 'id':
          return null
        default:
          return <input 
            onChange={action((i)=>{this.props.setElementField(i.target.value, e)})}
            placeholder={this.props.props[e]} 
            type="text"/>
      }
    })
  }
}

export default observer(EditElement)