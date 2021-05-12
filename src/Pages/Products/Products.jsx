import {observer} from 'mobx-react';

import SearchField from '../../Components/SearchField';
import AddElement from './Components/AddElement';
import DisplayList from '../../Components/DisplayList';
import ListElement from './Components/ListElement';
import TableColumnNames from '../../Components/TableColumnNames';
import MessageSpace from '../../Components/MessageSpace';

import UserInputStore from '../../Stores/UserInputStore';
import ProductsStore from './Stores/ProductsStore';
import ListElementStore from './Components/Stores/ListElementStore';
import AddElementStore from './Components/Stores/AddElementStore';
import AlertStore from './Stores/AlertStore';

import './styles/products.css';

const alertStore = new AlertStore();
const ProductsInputStore = new UserInputStore();
const addElementStore = new AddElementStore();

function Products() {  
  return (
    <div id="products">
      <SearchField setSearchField={(x)=>{ProductsInputStore.setSearchField(x)}}/>
      <DisplayList>
        <TableColumnNames sortBy={ProductsInputStore.sortBy} keys={ProductsStore.getSortingTypes()} setSortBy={(sortBy)=>{ProductsInputStore.setSort(sortBy)}} />
        {
          ProductsStore.getProcessedList(ProductsInputStore.searchField, ProductsInputStore.sortBy).map((e)=>{
            return <ListElement
              setAlert={(msg, colour)=>alertStore.setAlert(msg, colour)}
              element={ProductsStore.getElementById(e)} 
              editElement={(edited, id)=>ProductsStore.editElement(edited, id)} 
              removeElement={(id)=>{ProductsStore.removeElement(id)}} 
              store={new ListElementStore(ProductsStore.getElementById(e))}
            />;
          })
        }     
      </DisplayList>
      <MessageSpace msg={alertStore.msg} colour={alertStore.colour} />
      <AddElement 
        setAlert={(msg, colour)=>alertStore.setAlert(msg, colour)} 
        getSortingTypes={()=>{return ProductsStore.getSortingTypes()}} 
        store={addElementStore}
        addNewElement={(newElement)=>{return ProductsStore.addNewElement(newElement)}}
      />
    </div>
  )
}
export default observer(Products);