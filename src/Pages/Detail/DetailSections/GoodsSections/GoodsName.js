import React from 'react';
import { Link } from 'react-router-dom';
import './GoodsSections.scss';

class GoodsName extends React.Component {
  render() {
    const { goods } = this.props;
    const price = Number(goods.price).toLocaleString();

    return (
      <div className="goods-name">
        <div className="goods-heart-wrapper">
          <div>{goods.english_name}</div>
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
        <div className="goods-kor-name">{goods.korean_name}</div>
        <div className="goods-price">₩{price}원</div>
      </div>
    );
  }
}

export default GoodsName;
