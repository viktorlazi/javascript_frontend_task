import {observer} from 'mobx-react';
import {action} from 'mobx';

import NoEditButtons from '../../../Components/NoEditButtons';
import ListElementDisplay from './ListElementDisplay';

function ListElement({setAlert, element, removeElement, store, brands, isEdited, toggleEdit}) {
  return (
    <div className="row">
      <ListElementDisplay 
        element={element} 
        brands={brands}
        invalidInputs={store.invalidInputs}
        />
      <NoEditButtons
        isInEditMode={isEdited}
        confirmDelete={store.confirmDelete}
        removeElement={store.confirmDelete?action(()=>{setAlert(removeElement(element.id))}):action(()=>{store.toggleConfirmDelete()})} 
        toggleEditMode={()=>{toggleEdit()}}/>
    </div>
  );
}
export default observer(ListElement);