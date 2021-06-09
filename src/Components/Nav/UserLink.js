import React from 'react';
import { Link } from 'react-router-dom';

import './UserLink.scss';

class UserLink extends React.Component {
  render() {
    const { isMain } = this.props;

    return (
      <div className="UserLink">
        <Link to="/login" className={isMain && 'fontColorWhite'}>
          LOGIN
        </Link>
        <Link to="/join" className={isMain && 'fontColorWhite'}>
          JOIN
        </Link>
        <Link to="" className={isMain && 'fontColorWhite'}>
          CART
        </Link>
      </div>
    );
  }
}

export default UserLink;
