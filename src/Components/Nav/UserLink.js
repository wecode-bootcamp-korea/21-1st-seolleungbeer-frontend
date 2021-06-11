import React from 'react';
import { Link } from 'react-router-dom';
import './UserLink.scss';
class UserLink extends React.Component {
  render() {
    return (
      <div className="user-link">
        <Link to="/login">LOGIN</Link>
        <Link to="/join">JOIN</Link>
        <Link to="">CART</Link>
      </div>
    );
  }
}

export default UserLink;
