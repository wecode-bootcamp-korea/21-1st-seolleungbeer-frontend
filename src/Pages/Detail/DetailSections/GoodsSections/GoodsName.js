import React from 'react';
import { Link } from 'react-router-dom';

import './GoodsSections.scss';

class GoodsName extends React.Component {
  render() {
    return (
      <div className="GoodsName">
        <div className="GoodsHeartWrapper">
          <div>CRISPY LAVAR SNACK</div>
          <div className="GoodsHeart">
            <Link to="">
              <span>
                <i className="far fa-heart"></i>
                <i className="fas fa-heart"></i>
              </span>
              <span>11</span>
            </Link>
          </div>
        </div>
        <div className="GoodsKorName">
          제주에서 만난 찹쌀 김부각<span>(4ea)</span>
        </div>
        <div className="GoodsPrice">₩12,100원</div>
      </div>
    );
  }
}

export default GoodsName;
