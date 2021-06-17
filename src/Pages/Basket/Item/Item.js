import React from 'react';
import { Link } from 'react-router-dom';
import DEFAULT_IMG from '../../../defaultImage';
import './Item.scss';

class Item extends React.Component {
  constructor() {
    super();

    this.state = {
      isChecked: true,
    };
  }

  componentDidUpdate = prevProps => {
    if (prevProps.isCheckedAllItems !== this.props.isCheckedAllItems) {
      this.setState({
        isChecked: this.props.isCheckedAllItems,
      });
    }
  };

  handleClickButton = e => {
    if (e.target.name === 'delete') {
      this.props.requestDeleteItem([this.props.orderItemId]);
    } else {
      this.props.openQuantityForm(this.props.orderItemId);
    }
  };

  handleChangeInput = () => {
    const { isChecked } = this.state;
    this.setState(
      {
        isChecked: !isChecked,
      },
      () => this.props.checkItems(isChecked, this.props.orderItemId)
    );
  };

  render() {
    const {
      deliveryCharge,
      deliveryMethod,
      mainImage,
      koreanName,
      paymentCharge,
      amount,
    } = this.props;

    return (
      <li className="basket-item">
        <div className="checkbox-container">
          <input
            type="checkbox"
            onChange={this.handleChangeInput}
            checked={this.state.isChecked}
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
          <span>{parseInt(deliveryCharge).toLocaleString()}원</span>
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
