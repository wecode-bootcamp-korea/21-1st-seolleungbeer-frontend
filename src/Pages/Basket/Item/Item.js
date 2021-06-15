import React from 'react';
import './Item.scss';

class Item extends React.Component {
  constructor() {
    super();

    this.state = {
      isChecked: false,
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
      this.props.deleteItem(this.props.id);
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
    const { deliveryCharge, deliveryMethod, image, name, price } = this.props;
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
