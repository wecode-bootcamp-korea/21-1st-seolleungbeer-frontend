import React from 'react';
import { Link } from 'react-router-dom';
import './Item.scss';

class Item extends React.Component {
  render() {
    const { productId, price, koreanName, englishName, mainImage } = this.props;

    return (
      <li className="item">
        <Link to={`/shop/detail/${productId}`}>
          <div className="image-container">
            <img
              alt={koreanName}
              src={mainImage ? mainImage : '/images/defaultImage.jpg'}
            />
          </div>
          <div className="content">
            <span>{koreanName}</span>
            <span>{englishName}</span>
            <span>₩ {parseInt(price).toLocaleString()}</span>
          </div>
        </Link>
      </li>
    );
  }
}
export default Item;
