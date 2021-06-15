import React from 'react';
import './Item.scss';

class Item extends React.Component {
  constructor() {
    super();

    this.state = {
      isChecked: false,
    };
  }

  handleClickButton = e => {
    // console.log(e.target.name, this.props.id);
    if (e.target.name === 'delete') {
      this.props.deleteItem(this.props.id);
    }
  };

  handleChangeInput = e => {
    this.setState(
      {
        isChecked: !this.state.isChecked,
      },
      () => this.props.checkItems(this.state.isChecked, e.target.name)
    );
    // this.props.checkItems(this.state.isChecked, e.target.name);
    console.log(e.target.name);
  };

  render() {
    console.log(this.state.isChecked);
    const { id, deliveryCharge, deliveryMethod, imgUrl, name, price } =
      this.props;
    return (
      <li className="item">
        <div className="checkbox-container">
          <input type="checkbox" name={id} onChange={this.handleChangeInput} />
        </div>
        <div className="item-description">
          <div>
            <img alt="" src={imgUrl} />
          </div>
          <span>{name}</span>
        </div>
        <div className="wish">
          <i className="far fa-heart"></i>
        </div>
        <div className="quantity">
          <span>1개</span>
          <button name="change" onClick={this.handleClickButton}>
            변경
          </button>
        </div>
        <div className="transportation">
          <span>{deliveryMethod}</span>
        </div>
        <div className="shipping-fee">
          <span>{deliveryCharge}원</span>
        </div>
        <div className="price">
          <span>{price}원</span>
        </div>
        <div className="control-buttons">
          <button name="order" onClick={this.handleClickButton}>
            주문
          </button>
          <button name="delete" onClick={this.handleClickButton}>
            삭제
          </button>
        </div>
      </li>
    );
  }
}

export default Item;
