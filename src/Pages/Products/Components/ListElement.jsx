import React from 'react';
import {observer} from 'mobx-react';
import {action} from 'mobx';
import BrandsStore from '../../../Stores/BrandsStore';

import MultioptionEditButton from '../../../Components/MultioptionEditButton';
import EditButtons from '../../../Components/EditButtons';
import NoEditButtons from '../../../Components/NoEditButtons';

function ListElement({setAlert, element, editElement, removeElement, store}) {
  if(!store.isInEditMode){
    return (
      <div className="row">
        {
          Object.keys(element).map((e)=>{
            switch(e){
              case 'id':
                return null
              case 'brand':
                const brands = BrandsStore.list
                return <div>{(brands.find((e)=>{return e.id===element['brand']})||{}).name || 'unbranded'}</div>
              default:
                return <div>{element[e]}</div>
              }
            }
          )
        }
        <NoEditButtons 
          removeElement={action(()=>{removeElement(element.id)})} 
          toggleEditMode={()=>{store.toggleEditMode()}} 
          setAlert={()=>{setAlert()}} />
      </div>
    );
  }else{
    return (
      <div className="row">
        {
          Object.keys(element).map((e)=>{
            switch(e){
              case 'brand':
              return <div><MultioptionEditButton selected={element.brand} options={BrandsStore.list} getValue={(e)=>{store.setElementField(e, 'brand')}} /></div>
              case 'id':
              return null
              default:
                return <div><input 
                onChange={action((i)=>{store.setElementField(i.target.value, e)})}
                value={store.element[e]} 
                type="text"/></div>
              }
            })
          }
          <EditButtons 
            edit={action(()=>{store.edit(setAlert, element, editElement)})} 
            toggleEditMode={()=>{store.toggleEditMode()}} 
            setAlert={()=>{setAlert()}} />
      </div>
    );
  }
}
export default observer(ListElement);