import React from 'react';
import DOMPurify from 'dompurify';
import DeliveryInfo from '../../../../Components/Goods/DeliveryInfo';
import GoodsInfo from '../../../../Components/Goods/GoodsInfo';
import Refunds from '../../../../Components/Goods/Refunds';
import './CategoriesSections.scss';

class GoodsDetail extends React.Component {
  render() {
    const { goods, detailRef } = this.props;
    const desc = DOMPurify.sanitize(goods.description);

    return (
      <div className="goods-detail" ref={detailRef}>
        <div className="goods-wrapper">
          <div dangerouslySetInnerHTML={{ __html: desc }}></div>
          <GoodsInfo info={goods.info} />
          <DeliveryInfo />
          <Refunds />
        </div>
      </div>
    );
  }
}

export default GoodsDetail;
