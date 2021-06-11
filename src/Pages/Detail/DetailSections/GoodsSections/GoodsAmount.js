import React from 'react';

import './GoodsSections.scss';

class GoodsAmount extends React.Component {
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
    const { goods } = this.props;
    const { amount } = this.state;
    const price = (Number(goods.price) * amount).toLocaleString();

    return (
      <div className="goods-amount">
        <div className="goods-delivery">
          <div>배송비 미가입 시 건당 3,000원</div>
          <div>
            <span className="goods-effect">
              회원가입하면 언제 어디서나 무료배송
            </span>
          </div>
        </div>
        <div className="goods-payment">
          <div className="payment-title">수량</div>
          <div className="payment-count">
            <div>
              <button onClick={() => this.amountControl(-1)}>-</button>
              <input
                type="text"
                name="amount"
                value={amount}
                onChange={e => this.handleEvent(e)}
                onBlur={this.validationAmount}
              />
              <button onClick={() => this.amountControl(1)}>+</button>
            </div>
            <div>₩{price}원</div>
          </div>
        </div>
        <div className="goods-total">
          <div>총 상품금액({amount}개)</div>
          <div>₩{price}원</div>
        </div>
      </div>
    );
  }
}

export default GoodsAmount;
