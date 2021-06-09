import React from 'react';
import GoodsName from './GoodsSections/GoodsName';
import GoodsAmount from './GoodsSections/GoodsAmount';
import BuyButtonGroup from './GoodsSections/BuyButtonGroup';
import './DetailSection.scss';
class Goods extends React.Component {
  render() {
    return (
      <div className="Goods">
        <div className="GoodsImg">
          <img
            src="https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E"
            alt="123"
          />
        </div>
        <div className="GoodsForm">
          <GoodsName />
          <GoodsAmount />
          <BuyButtonGroup />
        </div>
      </div>
    );
  }
}

export default Goods;
