import React from 'react'
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
          return <MultioptionEditButton props={BrandsStore.list} />
        case 'id':
          return null
        default:
          return <input 
            onChange={(i)=>{this.props.setElement(i.target.value, e)}} 
            placeholder={e} 
            type="text"/>
      }
    })
  }
}

export default EditElement