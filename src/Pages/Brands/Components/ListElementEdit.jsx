import {action} from 'mobx';
import {observer} from 'mobx-react';

function ListElementEdit({element, storeElementValue, setElementField}) {
  return (
    Object.keys(element).map((e)=>{
      switch(e){
        case 'id':
          return null;
        case 'number':
          return <p>{element[e]}</p>;
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
