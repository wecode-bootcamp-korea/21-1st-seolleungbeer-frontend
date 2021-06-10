import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import UserLink from './UserLink';

import './Nav.scss';

class Nav extends React.Component {
  isMain = () => {
    const { location } = this.props;
    return location.pathname === '/';
  };

  render() {
    return (
      <nav className="nav">
        <div
          className={
            this.isMain() ? 'nav-container color-white' : 'nav-container'
          }
        >
          <div className="nav-head">
            <div></div>
            <div>
              <h1>
                <Link to="/" className={this.isMain() && 'font-color-white'}>
                  선릉맥주
                </Link>
              </h1>
            </div>
            <UserLink isMain={this.isMain()} />
          </div>
          <div className="nav-main">
            <div>
              <ul>
                <li>
                  <Link to="" className={this.isMain() && 'font-color-white'}>
                    EVENT
                  </Link>
                </li>
                <li>
                  <Link to="" className={this.isMain() && 'font-color-white'}>
                    PLAYLIST
                  </Link>
                </li>
                <li>
                  <Link to="" className={this.isMain() && 'font-color-white'}>
                    EXPERIENCE
                  </Link>
                </li>
                <li>
                  <Link to="" className={this.isMain() && 'font-color-white'}>
                    SHOP
                  </Link>
                </li>
                <li>
                  <Link to="" className={this.isMain() && 'font-color-white'}>
                    BREWERY
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Nav);
