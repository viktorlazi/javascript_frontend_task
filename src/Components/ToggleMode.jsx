import React from 'react'
import './styles/toggleMode.css';
import {Link} from 'react-router-dom'

function ToggleMode() {
  return (
    <div id="toggle__buttons">
      <Link to="/" className="toggle__buttons__link">
        Products
      </Link>
      <Link to="/brands" className="toggle__buttons__link">
        Brands
      </Link>
    </div>
  )
}

export default ToggleMode
