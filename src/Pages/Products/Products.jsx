import {observer} from 'mobx-react';
import {Route} from 'react-router-dom';

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

function Products({routerStore}) {  
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
              removeElement={(id)=>{return ProductsStore.removeElement(id)}} 
              store={ProductsStore.getListElementStore(e)}
              brands={ProductsStore.brands}
              isEdited={parseInt(routerStore.location.query.id) === e}
              toggleEdit={()=>{routerStore.location.query = {id:e}}}
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
        {
          ProductsStore.listElement.length
          && routerStore.location.query.id?
          <EditScreen 
            editElement={(edited, id)=>ProductsStore.editElement(edited, id)} 
            setAlert={(msg, colour)=>ProductsStore.alert.setAlert(msg, colour)}
            element={ProductsStore.getElementById(parseInt(routerStore.location.query.id))} 
            brands={ProductsStore.brands} 
            store={ProductsStore.getListElementStore(parseInt(routerStore.location.query.id))}
          />
          :null
        }
      </div>
    </div>
  )
}
export default observer(Products);