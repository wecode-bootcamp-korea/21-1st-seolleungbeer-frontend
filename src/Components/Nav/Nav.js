import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import UserLink from './UserLink';
import './Nav.scss';
class Nav extends React.Component {
  render() {
    const isMain = this.props.location.pathname === '/';

    return (
      <nav className="nav">
        <div className={isMain ? 'nav-container color-white' : 'nav-container'}>
          <div className="nav-head">
            <div></div>
            <div>
              <h1>
                <Link to="/">선릉맥주</Link>
              </h1>
            </div>
            <UserLink isMain={isMain} />
          </div>
          <div className="nav-main">
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

export default withRouter(Nav);
