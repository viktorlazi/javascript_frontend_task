import {observer} from 'mobx-react';

import SearchField from '../../Components/SearchField';
import AddElement from './Components/AddElement';
import DisplayList from '../../Components/DisplayList';
import ListElement from './Components/ListElement';
import TableColumnNames from '../../Components/TableColumnNames';
import MessageSpace from '../../Components/MessageSpace';
import EditScreen from './Components/EditScreen';

import ProductsStore from './Stores/ProductsStore';
import ListElementStore from './Components/Stores/ListElementStore';

import './styles/products.css';

function Products() {  
  return (
    <div id="products">
      <SearchField setSearchField={(x)=>{ProductsStore.input.setSearchField(x)}}/>
      <DisplayList>
        <TableColumnNames sortBy={ProductsStore.input.sortBy} keys={ProductsStore.getSortingTypes()} setSortBy={(sortBy)=>{ProductsStore.input.setSort(sortBy)}} />
        {
          ProductsStore.listElement.length ?
          ProductsStore.getProcessedList().map((e)=>{
            return <ListElement
              setAlert={(msg, colour)=>ProductsStore.alert.setAlert(msg, colour)}
              element={ProductsStore.getElementById(e)} 
              editElement={(edited, id)=>ProductsStore.editElement(edited, id)} 
              removeElement={(id)=>{return ProductsStore.removeElement(id)}} 
              store={ProductsStore.listElement.filter(i=>{return i.id===e})[0].store}
              brands={ProductsStore.brands}
            />;
          }):null
        }
      </DisplayList>
      <MessageSpace msg={ProductsStore.alert.msg} colour={ProductsStore.alert.colour} />
      <div className="flex">
        <AddElement 
          setAlert={(status)=>{ProductsStore.alert.setAlert(status)}} 
          getSortingTypes={()=>{return ProductsStore.getSortingTypes()}} 
          store={ProductsStore.addElement}
          addNewElement={(newElement)=>{return ProductsStore.addNewElement(newElement)}}
          addListElementStore={(id)=>{ProductsStore.listElement.push({id:id, key:id, store: new ListElementStore(ProductsStore.getElementById(id))})}}
          brands={ProductsStore.brands}
        />
        <EditScreen />
      </div>
    </div>
  )
}
export default observer(Products);