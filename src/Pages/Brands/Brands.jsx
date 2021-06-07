import {observer} from 'mobx-react';

import SearchField from '../../Components/SearchField';
import DisplayList from '../../Components/DisplayList';
import AddElement from './Components/AddElement';
import ListElement from './Components/ListElement';
import TableColumnNames from '../../Components/TableColumnNames';
import MessageSpace from '../../Components/MessageSpace';

import BrandsStore from './Stores/BrandsStore';
import ListElementStore from './Components/Stores/ListElementStore';
import './styles/brands.css';

function Brands() {  
  return (
    <div id="brands">
      <SearchField setSearchField={(x)=>{BrandsStore.input.setSearchField(x)}}/>
      <DisplayList>
        <TableColumnNames sortBy={BrandsStore.input.sortBy} keys={BrandsStore.getSortingTypes()} setSortBy={(sortBy)=>{BrandsStore.input.setSort(sortBy)}} />
        {
          BrandsStore.getProcessedList(BrandsStore.input.searchField, BrandsStore.input.sortBy).map((e)=>{
            return <ListElement
              setAlert={(msg, colour)=>BrandsStore.alert.setAlert(msg, colour)}
              element={BrandsStore.getElementById(e)} 
              editElement={(edited, id)=>BrandsStore.editElement(edited, id)} 
              removeElement={(id)=>{return BrandsStore.removeElement(id)}} 
              store={BrandsStore.listElement.filter(i=>{return i.id===e})[0].store}
            />;
          })
        }
      </DisplayList>
      <MessageSpace msg={BrandsStore.alert.msg} colour={BrandsStore.alert.colour} />
      <AddElement 
        setAlert={(status)=>{BrandsStore.alert.setAlert(status)}} 
        getSortingTypes={()=>{return BrandsStore.getSortingTypes()}} 
        store={BrandsStore.addElement}
        addNewElement={(newElement)=>{return BrandsStore.addNewElement(newElement)}}
        addListElementStore={(id)=>{BrandsStore.listElement.push({id:id, store: new ListElementStore(BrandsStore.getElementById(id))})}}
      />
    </div>
  )
}
export default observer(Brands);