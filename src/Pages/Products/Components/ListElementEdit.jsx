/**
 * NOT USED
 * : editing inline
 * 
 */

import MultioptionEditButton from '../../../Components/MultioptionEditButton';
import {action} from 'mobx';
import {observer} from 'mobx-react';

function ListElementEdit({element, brands, storeElementValue, setElementField}) {
  return (
    Object.keys(element).map((e)=>{
      switch(e){
        case 'brand':
          return <div><MultioptionEditButton selected={element.brand} options={brands} getValue={(e)=>{setElementField(e, 'brand')}} /></div>
        case 'id':
          return null
        default:
          return <div><input 
          onChange={action((i)=>{setElementField(i.target.value, e)})}
          value={storeElementValue[e]} 
          type="text"/></div>
        }
      })
  )
}
export default observer(ListElementEdit);

