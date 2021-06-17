import React from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../../../utils/token';
import DEFAULT_IMG from '../../../defaultImage';
import './Item.scss';

class Item extends React.Component {
  constructor() {
    super();
  }

  handleClickButton = e => {
    const { orderItemId } = this.props;

    if (e.target.name === 'delete') {
      this.props.requestDeleteItem([orderItemId]);
    } else {
      this.props.openQuantityForm(orderItemId);
    }
  };

  handleChangeInput = () => {
    this.props.checkItems(this.props.orderItemId);
  };

  render() {
    const {
      deliveryCharge,
      deliveryMethod,
      mainImage,
      koreanName,
      paymentCharge,
      amount,
      isChecked,
    } = this.props;

    return (
      <li className="basket-item">
        <div className="checkbox-container">
          <input
            type="checkbox"
            onChange={this.handleChangeInput}
            checked={isChecked}
          />
        </div>
        <div className="item-description">
          <div>
            <img alt={koreanName} src={mainImage || DEFAULT_IMG} />
          </div>
          <span>{koreanName}</span>
        </div>
        <div className="wish">
          <i className="far fa-heart"></i>
        </div>
        <div className="quantity">
          <span>{amount}개</span>
          <button onClick={this.handleClickButton}>변경</button>
        </div>
        <div className="transportation">
          <span>{deliveryMethod}</span>
        </div>
        <div className="shipping-fee">
          {getToken() ? (
            <span>0원</span>
          ) : (
            <span>{parseInt(deliveryCharge).toLocaleString()}원</span>
          )}
        </div>
        <div className="price">
          <span>{(parseInt(paymentCharge) * amount).toLocaleString()}원</span>
        </div>
        <div className="control-buttons">
          <Link to={{ pathname: '/shop/payment', state: this.props.item }}>
            <button name="order">주문</button>
          </Link>
          <button name="delete" onClick={this.handleClickButton}>
            삭제
          </button>
        </div>
      </li>
    );
  }
}

export default Item;
