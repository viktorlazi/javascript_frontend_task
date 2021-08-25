import { inject, observer } from 'mobx-react';
import {Component} from 'react'
import ProductsStore from '../Products/Stores/ProductsStore';
import EditScreen from './Components/EditScreen';

class EditProduct extends Component {
  componentDidMount(){
    const urlID = parseInt(this.props.routerStore.location.query.id);
    const element = ProductsStore.getElementById(urlID);
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
            store = {this.props.store.editElementStore}
            setAlert = {this.props.store.setAlert}
            editElement = {this.props.store.editElement}
          />
          :null
        }
      </div>
    )
  }
}
export default observer(inject(rootStore => ({store: ProductsStore.editStore}))(EditProduct));