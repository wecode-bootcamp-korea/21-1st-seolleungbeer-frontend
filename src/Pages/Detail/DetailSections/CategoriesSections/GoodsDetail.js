import React from 'react';
import DeliveryInfo from '../../../../Components/Goods/DeliveryInfo';
import GoodsInfo from '../../../../Components/Goods/GoodsInfo';
import Refunds from '../../../../Components/Goods/Refunds';
import './CategoriesSections.scss';

class GoodsDetail extends React.Component {
  render() {
    return (
      <div className="goods-detail">
        <div className="goods-wrapper">
          <div dangerouslySetInnerHTML={{ __html: '' }}></div>
          <GoodsInfo />
          <DeliveryInfo />
          <Refunds />
        </div>
      </div>
    );
  }
}

export default GoodsDetail;
