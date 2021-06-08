import React from 'react';
import { Link } from 'react-router-dom';

import './UserLink.scss';

class UserLink extends React.Component {
  render() {
    return (
      <div className="UserLink">
        <Link to="">LOGIN</Link>
        <Link to="">JOIN</Link>
        <Link to="">CART</Link>
      </div>
    );
  }
}

export default UserLink;
