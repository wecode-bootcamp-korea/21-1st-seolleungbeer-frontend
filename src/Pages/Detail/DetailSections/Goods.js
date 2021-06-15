import React from 'react';
import GoodsName from './GoodsSections/GoodsName';
import GoodsAmount from './GoodsSections/GoodsAmount';
import BuyButtonGroup from './GoodsSections/BuyButtonGroup';
import './DetailSection.scss';
class Goods extends React.Component {
  state = {
    amount: 1,
  };

  handleEvent = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  amountControl = count => {
    const { amount } = this.state;

    const counting = count + amount <= 0 ? 1 : count + amount;

    this.setState({
      amount: counting,
    });
  };

  validationAmount = () => {
    const { amount } = this.state;

    if (Number(amount) > 0) return;

    this.setState({ amount: 1 });
  };

  render() {
    const { goods, handleModal } = this.props;
    const { amount } = this.state;

    return (
      <div className="goods">
        <div className="goods-img">
          {goods.image?.map(image => {
            return (
              image.image_type === 'main' && (
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
          <GoodsAmount
            goods={goods}
            amount={amount}
            handleEvent={this.handleEvent}
            amountControl={this.amountControl}
            validationAmount={this.validationAmount}
          />
          <BuyButtonGroup amount={amount} handleModal={handleModal} />
        </div>
      </div>
    );
  }
}

export default Goods;
