import React from 'react';
import { Link } from 'react-router-dom';
import './UserLink.scss';
class UserLink extends React.Component {
  render() {
    return (
      <>
        {!localStorage.getItem('access_token') ? (
          <div className="user-link">
            <Link to="/login">LOGIN</Link>
            <Link to="/signup">JOIN</Link>
          </div>
        ) : (
          <div className="user-link">
            <Link to="/logout">LOGOUT</Link>
            <Link to="/shop/basket">CART</Link>
          </div>
        )}
      </>
    );
  }
}

export default UserLink;
