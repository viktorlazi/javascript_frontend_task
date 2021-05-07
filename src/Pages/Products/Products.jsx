import {observer} from 'mobx-react';

import SearchField from '../../Components/SearchField';
import AddElement from './Components/AddElement';
import DisplayList from '../../Components/DisplayList';
import ListElement from './Components/ListElement';
import TableColumnNames from '../../Components/TableColumnNames';

import UserInputStore from '../../Stores/UserInputStore';
import ProductsService from './Stores/ProductsService';
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

const ProductsInputStore = new UserInputStore();
ProductsInputStore.setSort('brand');
const helper = new Helper;

function Products() {
  return (
    <div id="products">
      <SearchField UserInputStore={ProductsInputStore}/>
      <DisplayList>
        <TableColumnNames sortBy={ProductsInputStore.sortBy} keys={ProductsService.getSortingTypes()} setSortBy={(sortBy)=>{ProductsInputStore.setSort(sortBy)}} />
        {
          ProductsService.getProcessedList(ProductsInputStore.searchField, ProductsInputStore.sortBy).map((e)=>{
            return <ListElement
              setAlert={(msg, colour)=>helper.setAlert(msg, colour)}
              props={ProductsService.getElementById(e)} 
              editElement={ProductsService.editElement} 
              removeElement={ProductsService.removeElement} />
          })
        }     
      </DisplayList>
      <MessageSpace msg={helper.msg} colour={helper.colour} />
      <AddElement setAlert={(msg, colour)=>helper.setAlert(msg, colour)} ListStore={ProductsService} />
    </div>
  )
}
export default observer(Products);