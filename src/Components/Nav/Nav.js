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
      <nav className="Nav">
        <div className="NavContainer">
          <div className="NavHead">
            <div></div>
            <div>
              <h1>
                <Link to="/" className={this.isMain() && 'fontColorWhite'}>
                  선릉맥주
                </Link>
              </h1>
            </div>
            <UserLink isMain={this.isMain()} />
          </div>
          <div className="NavMain">
            <div>
              <ul>
                <li>
                  <Link to="" className={this.isMain() && 'fontColorWhite'}>
                    EVENT
                  </Link>
                </li>
                <li>
                  <Link to="" className={this.isMain() && 'fontColorWhite'}>
                    PLAYLIST
                  </Link>
                </li>
                <li>
                  <Link to="" className={this.isMain() && 'fontColorWhite'}>
                    EXPERIENCE
                  </Link>
                </li>
                <li>
                  <Link to="" className={this.isMain() && 'fontColorWhite'}>
                    SHOP
                  </Link>
                </li>
                <li>
                  <Link to="" className={this.isMain() && 'fontColorWhite'}>
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
