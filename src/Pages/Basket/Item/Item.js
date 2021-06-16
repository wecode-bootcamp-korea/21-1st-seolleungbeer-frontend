import React from 'react';
import { Link } from 'react-router-dom';
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
      this.props.requestDeleteItem([this.props.id]);
    } else {
      this.props.openQuantityForm(this.props.id);
    }
  };

  handleChangeInput = () => {
    this.setState(
      {
        isChecked: !this.state.isChecked,
      },
      () => this.props.checkItems(this.state.isChecked, this.props.id)
    );
  };

  render() {
    const {
      deliveryCharge,
      deliveryMethod,
      image,
      name,
      price,
      amount,
      orderId,
    } = this.props;

    // console.log(this.props.item);

    // const state = [

    // ]

    // const state = [
    //   {
    //     image_url: image,
    //     korean_name: name,
    //     product_id: 3,
    //     order_item_id: orderId,
    //     amount,
    //     price: parseInt(price) / amount + '.00',
    //   },
    // ];

    // console.log(state[0].price);

    return (
      <li className="item">
        <div className="checkbox-container">
          <input
            type="checkbox"
            onChange={this.handleChangeInput}
            checked={this.state.isChecked ? true : false}
          />
        </div>
        <div className="item-description">
          <div>
            <img alt="" src={image ? image : '/images/cat.jpg'} />
          </div>
          <span>{name}</span>
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
          <span>{(parseInt(price) * amount).toLocaleString()}원</span>
        </div>
        <div className="control-buttons">
          <Link to={{ pathname: '/signup', state: this.props.item }}>
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
