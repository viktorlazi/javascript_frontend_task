import './App.css';
import ToggleMode from './Components/ToggleMode';
import {observer} from 'mobx-react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Brands from './Pages/Brands/Brands'
import Products from './Pages/Products/Products'

import ListStore from './Stores/ListStore'


function App() {
  return ( 
    <Router>
      <div className="App">
        <div id="display">
          <Route exact path="/">
            <Products />
          </Route>
          <Route path="/brands">
            <Brands/>
          </Route>
        </div>
        <Route path="/">
          <ToggleMode/>
        </Route>
      </div>
    </Router>
  );
}

export default observer(App);
