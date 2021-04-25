import {observer} from 'mobx-react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Brands from './Pages/Brands/Brands'
import Products from './Pages/Products/Products'
import Header from './Pages/Header/Header'
import './App.css'

function App() {
  return ( 
    <Router>
      <div className="App">
        <Header />
        <div id="display">
          <Route exact path="/">
            <Products />
          </Route>
          <Route path="/brands">
            <Brands />
          </Route>
        </div>
      </div>
    </Router>
  );
}

export default observer(App)