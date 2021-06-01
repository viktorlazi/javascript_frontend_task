import {observer} from 'mobx-react';

import SearchField from '../../Components/SearchField';
import DisplayList from '../../Components/DisplayList';
import AddElement from './Components/AddElement';
import ListElement from './Components/ListElement';
import TableColumnNames from '../../Components/TableColumnNames';
import MessageSpace from '../../Components/MessageSpace';

import UserInputStore from '../../Stores/UserInputStore';
import BrandsStore from './Stores/BrandsStore';
import ListElementStore from './Components/Stores/ListElementStore';
import AddElementStore from './Components/Stores/AddElementStore';
import AlertStore from './Stores/AlertStore';

import './styles/brands.css';

const BrandsInputStore = new UserInputStore();
BrandsInputStore.sortBy = 'number';
const alertStore = new AlertStore();
const addElementStore = new AddElementStore();
const listElementStores = [];
BrandsStore.list.forEach(e => {
  listElementStores.push({id:e.id, store: new ListElementStore(BrandsStore.getElementById(e.id))})
});

function Brands() {  
  return (
    <div id="brands">
      <SearchField setSearchField={(x)=>{BrandsInputStore.setSearchField(x)}}/>
      <DisplayList>
        <TableColumnNames sortBy={BrandsInputStore.sortBy} keys={BrandsStore.getSortingTypes()} setSortBy={(sortBy)=>{BrandsInputStore.setSort(sortBy)}} />
        {
          BrandsStore.getProcessedList(BrandsInputStore.searchField, BrandsInputStore.sortBy).map((e)=>{
            return <ListElement
              setAlert={(msg, colour)=>alertStore.setAlert(msg, colour)}
              element={BrandsStore.getElementById(e)} 
              editElement={(edited, id)=>BrandsStore.editElement(edited, id)} 
              removeElement={(id)=>{return BrandsStore.removeElement(id)}} 
              store={listElementStores.filter(i=>{return i.id===e})[0].store}
            />;
          })
        }
      </DisplayList>
      <MessageSpace msg={alertStore.msg} colour={alertStore.colour} />
      <AddElement 
        setAlert={(status)=>{alertStore.setAlert(status)}} 
        getSortingTypes={()=>{return BrandsStore.getSortingTypes()}} 
        store={addElementStore}
        addNewElement={(newElement)=>{return BrandsStore.addNewElement(newElement)}}
        addListElementStore={(id)=>{listElementStores.push({id:id, store: new ListElementStore(BrandsStore.getElementById(id))})}}
      />
    </div>
  )
}
export default observer(Brands);