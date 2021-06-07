import React from 'react';
import { Link } from 'react-router-dom';

import './Nav.scss';

class Nav extends React.Component {
  render() {
    return (
      <nav className="Nav">
        <div className="NavLogo">
          <div></div>
          <div>
            <h1>선릉맥주</h1>
          </div>
          <div>
            <Link to="">LOGIN</Link>
            <Link to="">JOIN</Link>
            <Link to="">CART</Link>
          </div>
        </div>
        <div className="NavLink">
          <ul>
            <li>
              <Link to="">EVENT</Link>
            </li>
            <li>
              <Link to="">PLAYLIST</Link>
            </li>
            <li>
              <Link to="">EXPERIENCE</Link>
            </li>
            <li>
              <Link to="">SHOP</Link>
            </li>
            <li>
              <Link to="">BREWERY</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
