import {observer} from 'mobx-react';

import SearchField from '../../Components/SearchField';
import AddElement from './Components/AddElement';
import DisplayList from '../../Components/DisplayList';
import ListElement from './Components/ListElement';
import TableColumnNames from '../../Components/TableColumnNames';

import UserInputStore from '../../Stores/UserInputStore';
import ProductsStore from './Stores/ProductsStore';
import ListElementStore from './Components/Stores/ListElementStore';
import MessageSpace from '../../Components/MessageSpace';
import {makeAutoObservable} from 'mobx';

import './styles/products.css';


class Helper{
  msg;
  colour;
  
  constructor(){
    this.colour = 'black';
    this.msg = '';
    makeAutoObservable(this);
  }
  setAlert(msg, colour){
    this.msg = msg;
    this.colour = colour;
  }
}

const helper = new Helper();
const ProductsInputStore = new UserInputStore();

function Products() {
  return (
    <div id="products">
      <SearchField setSearchField={(x)=>{ProductsInputStore.setSearchField(x)}}/>
      <DisplayList>
        <TableColumnNames sortBy={ProductsInputStore.sortBy} keys={ProductsStore.getSortingTypes()} setSortBy={(sortBy)=>{ProductsInputStore.setSort(sortBy)}} />
        {
          ProductsStore.getProcessedList(ProductsInputStore.searchField, ProductsInputStore.sortBy).map((e)=>{
            const listElementStore = new ListElementStore(ProductsStore.getElementById(e));
            return <ListElement
              setAlert={(msg, colour)=>helper.setAlert(msg, colour)}
              element={ProductsStore.getElementById(e)} 
              editElement={(edited, id)=>ProductsStore.editElement(edited, id)} 
              removeElement={(id)=>{ProductsStore.removeElement(id)}} 
              store={listElementStore}
            />;
          })
        }     
      </DisplayList>
      <MessageSpace msg={helper.msg} colour={helper.colour} />
      <AddElement setAlert={(msg, colour)=>helper.setAlert(msg, colour)} ListStore={ProductsStore} />
    </div>
  )
}
export default observer(Products);