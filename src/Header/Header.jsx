import {Link, useLocation} from 'react-router-dom';
import './styles/header.css';

function Header() {
  const location = useLocation();
  return (
    <header>
      <div className="logo">
        <h1>ListApp</h1>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/products" className={`toggle__buttons__link ${location.pathname.includes('products')?"active":""}`}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/brands" className={`toggle__buttons__link ${location.pathname.includes('brands')?"active":""}`}>
              Brands
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
export default Header;