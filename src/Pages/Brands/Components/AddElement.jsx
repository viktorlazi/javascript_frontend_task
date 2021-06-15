import {observer} from 'mobx-react';
import {action} from 'mobx';
import './styles/addElement.css';

function AddElement({getSortingTypes, addNewElement, setAlert, store, addListElementStore}){
  return(
  <div className="add__new">
    {
      getSortingTypes().map((e)=>{
        switch(e){
          case 'id':
          case 'number':
            return null;
          default:
            return [<p>{e}:</p>, <input onChange={ 
              action((i)=>{
                store.newElement[e]=i.target.value
              })
            } placeholder={e} value={store.newElement[e]} type="text">
            </input>]
          }
        })
      }
    <button onClick={action(()=>{
      store.addNewElement(addNewElement, addListElementStore, setAlert);
    })}>Add New</button>
  </div>
  );
}
export default observer(AddElement);