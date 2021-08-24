import {observer} from 'mobx-react';
import {Router, RouterStore} from 'react-router-mobx';
import {BrowserRouter, Route} from 'react-router-dom';

import Brands from './Pages/Brands/Brands';
import EditProduct from './Pages/Edit/EditProduct';
import Products from './Pages/Products/Products';
import Header from './Header/Header';
import './App.css';

const routerStore = new RouterStore();

function App() {
  return (
    <Router component = {BrowserRouter} routerStore = {routerStore}>
      <div className="App">
        <Header />        
        <div id="display">
          <Route path="/products">
            <Products routerStore = {routerStore} />
          </Route>
          <Route exact path="/brands">
            <Brands />
          </Route>
          <Route exact path="/edit">
            <EditProduct routerStore = {routerStore} />
          </Route>
        </div>
      </div>
    </Router>
  );
}
export default observer(App);