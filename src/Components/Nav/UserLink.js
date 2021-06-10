import React from 'react';
import { Link } from 'react-router-dom';

import './UserLink.scss';

class UserLink extends React.Component {
  render() {
    const { isMain } = this.props;

    return (
      <div className="user-link">
        <Link to="/login" className={isMain && 'font-color-white'}>
          LOGIN
        </Link>
        <Link to="/join" className={isMain && 'font-color-white'}>
          JOIN
        </Link>
        <Link to="" className={isMain && 'font-color-white'}>
          CART
        </Link>
      </div>
    );
  }
}

export default UserLink;
