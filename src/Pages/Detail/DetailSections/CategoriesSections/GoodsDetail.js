import React from 'react';
import DeliveryInfo from '../../../../Components/Goods/DeliveryInfo';
import GoodsInfo from '../../../../Components/Goods/GoodsInfo';
import Refunds from '../../../../Components/Goods/Refunds';
import './CategoriesSections.scss';
import { data } from './Data';
class GoodsDetail extends React.Component {
  state = {
    text: data.text,
  };

  render() {
    return (
      <div className="GoodsDetail">
        <div className="GoodsWrapper">
          <div dangerouslySetInnerHTML={{ __html: this.state.text }}></div>
          <GoodsInfo />
          <DeliveryInfo />
          <Refunds />
        </div>
      </div>
    );
  }
}

export default GoodsDetail;
