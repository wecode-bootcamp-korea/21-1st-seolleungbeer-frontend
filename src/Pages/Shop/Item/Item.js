import React from 'react';
import { Link } from 'react-router-dom';
import { priceFormat } from '../../../utils/priceFormat';
import './Item.scss';

class Item extends React.Component {
  render() {
    const { id, price, koreanName, englishName, image } = this.props;

    return (
      <li className="item">
        <Link to={`/shop/detail/${id}`}>
          <div className="image-container">
            <img
              alt={koreanName}
              src={image === null ? '/images/defaultImage.jpg' : image}
            />
          </div>
          <div className="content">
            <span>{koreanName}</span>
            <span>{englishName}</span>
            <span>₩ {priceFormat(price)}</span>
          </div>
        </Link>
      </li>
    );
  }
}
export default Item;
