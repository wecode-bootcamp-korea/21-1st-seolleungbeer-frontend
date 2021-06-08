import React from 'react';
import { Link } from 'react-router-dom';

import UserLink from './UserLink';

import './Nav.scss';

class Nav extends React.Component {
  render() {
    return (
      <nav className="Nav">
        <div className="NavContainer">
          <div className="NavHead">
            <div></div>
            <div>
              <h1>
                <Link to="/">선릉맥주</Link>
              </h1>
            </div>
            <div>
              <UserLink />
            </div>
          </div>
          <div className="NavMain">
            <div>
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
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
