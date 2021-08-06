import './styles/editScreen.css';
import MultioptionEditButton from '../../../Components/MultioptionEditButton';
import {action} from 'mobx';
import {observer} from 'mobx-react';

function EditScreen({element, brands, store, setAlert, editElement}) {
  if(!element){
    return (
      <div className="editScreen">
        <p>Edit screen</p>
      </div>
    );
  }
  return (
    <div className="editScreen">
      <p>Editing item id [{element.id}]</p>
      <br/>
      {
         Object.keys(element).map((e)=>{
          switch(e){
            case 'brand':
              return [<p>brand:</p>,<div><MultioptionEditButton selected={element.brand} options={brands}  getValue={(e)=>{store.setElementField(e, 'brand')}} /></div>]
            case 'id':
              return null
            default:
              return [<p>{e}:</p>,<div><input 
                onChange={action((i)=>{store.setElementField(i.target.value, e)})}
                value={store.element[e]}              
                type="text"/>
              </div>]
            }
         })
      }
      <button onClick={action(()=>{store.edit(setAlert, element, editElement)})}>
        change
      </button>
    </div>
  )
}
export default observer(EditScreen);
