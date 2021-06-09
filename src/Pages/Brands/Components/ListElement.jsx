import {observer} from 'mobx-react';
import {action} from 'mobx';

import EditButtons from '../../../Components/EditButtons';
import NoEditButtons from '../../../Components/NoEditButtons';
import ListElementDisplay from './ListElementDisplay';
import ListElementEdit from './ListElementEdit';

function ListElement({setAlert, element, editElement, removeElement, store}) {
  if(!store.isInEditMode){
    return (
      <div className="row">
        <ListElementDisplay 
          element={element} 
          invalidInputs={store.invalidInputs}
          />
        {
          element.name !== 'unbranded'?
          <NoEditButtons 
            removeElement={action(()=>{setAlert(removeElement(element.id))})} 
            toggleEditMode={()=>{store.toggleEditMode()}}/>
          :null
        }
      </div>
    );
  }else{
    return (
      <div className="row">
        <ListElementEdit 
          element={element} 
          storeElementValue={store.element} 
          setElementField={(x,y)=>{return store.setElementField(x,y)}} />
        <EditButtons 
          edit={action(()=>{store.edit(setAlert, element, editElement)})} 
          toggleEditMode={()=>{store.toggleEditMode()}} />
      </div>
    );
  }
}
export default observer(ListElement);