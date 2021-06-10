import React from 'react';
import { Link } from 'react-router-dom';

import './GoodsSections.scss';

class GoodsName extends React.Component {
  render() {
    return (
      <div className="goods-name">
        <div className="goods-heart-wrapper">
          <div>CRISPY LAVAR SNACK</div>
          <div className="goods-heart">
            <Link to="">
              <span>
                <i className="far fa-heart"></i>
                <i className="fas fa-heart"></i>
              </span>
              <span>11</span>
            </Link>
          </div>
        </div>
        <div className="goods-kor-name">제주에서 만난 찹쌀 김부각(4ea)</div>
        <div className="goods-price">₩12,100,103,100원</div>
      </div>
    );
  }
}

export default GoodsName;
