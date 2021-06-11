import React from 'react';
import './Item.scss';

class Item extends React.Component {
  render() {
    const { id, price, koreanName, englishName, description, imgUrl } =
      this.props;
    return (
      <li className="item">
        <div className="image-container">
          <img alt={koreanName} src={imgUrl} />
        </div>
        <div className="content">
          <span>{koreanName}</span>
          <span>{englishName}</span>
          <span>₩ {price}</span>
          {/* <span>{description}</span> */}
        </div>
      </li>
    );
  }
}
export default Item;
