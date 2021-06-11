import React from 'react';
import GoodsName from './GoodsSections/GoodsName';
import GoodsAmount from './GoodsSections/GoodsAmount';
import BuyButtonGroup from './GoodsSections/BuyButtonGroup';
import './DetailSection.scss';
class Goods extends React.Component {
  render() {
    const { goods, handelModal } = this.props;

    return (
      <div className="goods">
        <div className="goods-img">
          {goods.image?.map(image => {
            return (
              image.image_type === '메인' && (
                <img
                  key={image.image_type + image.image_url}
                  src={image.image_url}
                  alt={image.image_url}
                />
              )
            );
          })}
        </div>
        <div className="goods-form">
          <GoodsName goods={goods} />
          <GoodsAmount goods={goods} />
          <BuyButtonGroup handelModal={handelModal} />
        </div>
      </div>
    );
  }
}

export default Goods;
