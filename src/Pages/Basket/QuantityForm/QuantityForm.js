import React from 'react';
import './QuantityForm.scss';

class QuantityForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: this.props.item[0].amount,
    };
  }

  handleClickControlButton = e => {
    const { cart_id, payment_charge } = this.props.item[0];
    if (e.target.name === 'cancle') {
      this.props.openQuantityForm(cart_id);
    } else {
      // const totalPrice = payment_charge * this.state.amount;
      const totalAmount = this.state.amount;

      this.props.requestModifyQuantity(cart_id, totalAmount);
      this.props.openQuantityForm(cart_id);
    }
  };

  handleClickCountButton = e => {
    if (e.target.name === 'minus' && this.state.amount > 0) {
      this.setState(prev => prev.amount--);
    } else {
      this.setState(prev => prev.amount++);
    }
  };

  render() {
    const {
      delivery_charge,
      delivery_method,
      img_url,
      korean_name,
      payment_charge,
      amount,
    } = this.props.item[0];
    console.log(this.state.amount);
    return (
      <div className="quantity-form">
        <div className="quantity-form-content">
          <div className="title">
            <h2>옵션 변경</h2>
          </div>
          <div className="item-container">
            <div className="image-container">
              <img alt="" src="/images/cat.jpg" />
            </div>
            <div className="description">
              <span>{korean_name}</span>
              <span>{parseInt(payment_charge).toLocaleString()}원</span>
            </div>
          </div>
          <div className="count-container">
            <span className="quantity">수량</span>
            <button onClick={this.handleClickCountButton} name="minus">
              -
            </button>
            <div className="amount-box">
              <span>{this.state.amount}</span>
            </div>
            <button onClick={this.handleClickCountButton} name="plus">
              +
            </button>
          </div>
          <div className="result">
            <div>
              <span>
                총 수량
                <span className="result-quantity">{this.state.amount}</span>개
              </span>
            </div>
            <div>
              <span className="result-price">
                {(payment_charge * this.state.amount).toLocaleString()}원
              </span>
            </div>
          </div>
          <div className="control-button">
            <button onClick={this.handleClickControlButton} name="cancle">
              취소
            </button>
            <button onClick={this.handleClickControlButton} name="modify">
              변경
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default QuantityForm;
