import { inject, observer } from 'mobx-react';
import {toJS} from 'mobx';
import {Component} from 'react'
import ProductsStore from '../Products/Stores/ProductsStore';
import EditScreen from './Components/EditScreen';
import EditProductStore from './Stores/EditProductStore';

class EditProduct extends Component {
  componentDidMount(){
    const urlID = parseInt(this.props.routerStore.location.query.id);
    console.log(urlID)
    const element = ProductsStore.getElementById(urlID);
    console.log(element)
    const brands = ProductsStore.brands;
    const editElementStore = ProductsStore.getListElementStore(urlID);
    const editElement = ProductsStore.editElement;
    const setAlert = ProductsStore.alert.setAlert;
    this.props.store.setValues(element, brands, editElementStore, editElement, setAlert);
  }
  render() {
    return (
      <div>
        {
          this.props.store?
          <EditScreen 
            element = {this.props.store.element}
            brands = {this.props.store.brands}
            store = {this.props.store.store}
            editElement = {this.props.store.editElement}
            setAlert = {this.props.store.setAlert}

          />
          :null
        }
      </div>
    )
  }
}
export default 
inject(rootStore => ({store: new EditProductStore}))
observer(EditProduct);