import React from 'react';
import GoodsName from './GoodsSections/GoodsName';
import GoodsAmount from './GoodsSections/GoodsAmount';
import BuyButtonGroup from './GoodsSections/BuyButtonGroup';
import './DetailSection.scss';
class Goods extends React.Component {
  render() {
    return (
      <div className="goods">
        <div className="goods-img">
          <img
            src="https://cdn.imweb.me/upload/S20200702f03eaee38b16e/1150315c58715.png"
            alt="123"
          />
        </div>
        <div className="goods-form">
          <GoodsName />
          <GoodsAmount />
          <BuyButtonGroup />
        </div>
      </div>
    );
  }
}

export default Goods;
