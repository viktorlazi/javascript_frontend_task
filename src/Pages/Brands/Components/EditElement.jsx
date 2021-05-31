import {observer} from 'mobx-react';
import {action} from 'mobx';
import MultioptionEditButton from '../../../Components/MultioptionEditButton';
import BrandsService from '../../../Services/BrandsService';

function EditElement() {
  return Object.keys(this.props.props).map((e)=>{
    switch(e){
      case 'brand':
        return <MultioptionEditButton selected={this.props.props.brand} props={BrandsService.fetchList()} getValue={(e)=>{this.props.setElementField(e, 'brand')}} />;
      case 'id':
        return null;
      default:
        return <input 
          onChange={action((i)=>{this.props.setElementField(i.target.value, e)})}
          defaultValue={this.props.props[e]} 
          type="text"/>;
    }
  })
}
export default observer(EditElement);
