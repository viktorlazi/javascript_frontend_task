import {observer} from 'mobx-react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import ToggleMode from './Components/ToggleMode'
import Brands from './Pages/Brands/Brands'
import Products from './Pages/Products/Products'
import './App.css'

function App() {
  return ( 
    <Router>
      <div className="App">
        <div id="display">
          <Route exact path="/">
            <Products />
          </Route>
          <Route path="/brands">
            <Brands />
          </Route>
        </div>
        <Route path="/">
          <ToggleMode/>
        </Route>
      </div>
    </Router>
  );
}

export default observer(App)