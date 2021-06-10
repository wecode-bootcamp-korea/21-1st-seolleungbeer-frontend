import React from 'react';
import './Item.scss';

class Item extends React.Component {
  render() {
    return (
      <li className="item">
        <div>
          <img />
        </div>
        <div>
          <span>title</span>
          <span>span</span>
        </div>
      </li>
    );
  }
}
export default Item;
