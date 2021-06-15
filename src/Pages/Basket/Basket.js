import React from 'react';
import ItemList from './ItemList/ItemList';
import API from '../../config';
import './Basket.scss';

const sum = items => {
  const sum = items.reduce(
    (acc, item) => acc + parseInt(item.payment_charge),
    0
  );

  return sum;
};

const formatter = price => {
  const priceArr = price.toString().split('');
  const result = [];

  let count = 0;
  for (let i = priceArr.length - 1; i >= 0; i--) {
    if (count === 3) {
      result.unshift(',');
      count = 0;
    }
    result.unshift(priceArr[i]);
    count++;
  }

  return result.join('');
};

class Basket extends React.Component {
  constructor() {
    super();

    this.state = {
      items: [],
      checkedItems: [],
      isCheckedAllItems: false,
    };
  }

  componentDidMount() {
    this.fetchBasketItems();
  }

  // /Data/basket.json
  fetchBasketItems = async () => {
    try {
      const res = await fetch(`${API}/order/cart`, {
        method: 'GET',
      });
      const items = await res.json();

      console.log(items);
      this.setState({
        items,
      });
    } catch (err) {
      console.error(err);
    }
  };

  requestDeleteItem = async id => {
    try {
      const res = await fetch('#', {
        method: '',
        body: {
          id,
        },
      });
      const result = await res.json();

      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  requestDeleteItems = async checkedItems => {
    try {
      const res = await fetch('#', {
        method: '',
        body: {
          checkedItems,
        },
      });
      const result = await res.json();

      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  handleChangeCheckBox = e => {
    this.setState(
      {
        isCheckedAllItems: !this.state.isCheckedAllItems,
      },
      this.checkAllItems
    );
    // this.checkAllItems();
  };

  handleClickDeleteButton = () => {
    const filteredItems = this.state.items;
    const checkedItems = this.state.checkedItems;

    for (let i = 0; i < filteredItems.length; i++) {
      for (let j = 0; j < checkedItems.length; j++) {
        if (filteredItems[i].cart_id === parseInt(checkedItems[j])) {
          filteredItems.splice(i, 1);
          i--;
        }
      }
    }

    this.setState({
      items: filteredItems,
      checkedItems: [],
    });

    // this.requestDeleteItems(checkedItems)
  };

  checkAllItems = () => {
    const { items, isCheckedAllItems } = this.state;
    const checkedItems = items.map(item => item.cart_id);

    if (isCheckedAllItems) {
      this.setState({
        checkedItems,
      });
    } else {
      this.setState({
        checkedItems: [],
      });
    }
  };

  checkItems = (isChecked, id) => {
    if (isChecked) {
      this.setState({
        checkedItems: [...this.state.checkedItems, id],
      });
    } else {
      this.setState({
        checkedItems: this.state.checkedItems.filter(
          checkedItem => checkedItem !== id
        ),
      });
    }
  };

  deleteItem = id => {
    this.setState({
      items: this.state.items.filter(item => item.cart_id !== id),
    });
    // this.requestDeleteItem(id)
  };

  render() {
    const { items, checkedItems, isCheckedAllItems } = this.state;
    console.log(checkedItems);
    return (
      <div className="basket">
        <div className="title">
          <h1>CART</h1>
          <span>당신의 선릉은 어떤가요?</span>
        </div>
        <div className="cart">
          <div className="cart-header">
            <div className="checkbox">
              <input type="checkbox" onChange={this.handleChangeCheckBox} />
            </div>
            <div>
              <span>item</span>
            </div>
            <div>
              <span>위시</span>
            </div>
            <div>
              <span>수량</span>
            </div>
            <div>
              <span>배송수단</span>
            </div>
            <div>
              <span>배송비</span>
            </div>
            <div>
              <span>가격</span>
            </div>
          </div>
          <ItemList
            items={items}
            deleteItem={this.deleteItem}
            checkItems={this.checkItems}
            isCheckedAllItems={isCheckedAllItems}
          />
          <div className="cart-result">
            <div className="cart-result-preview">
              <div>
                <div>
                  <span>상품가격</span>
                </div>
                <div>
                  <span>{formatter(sum(items))}원</span>
                </div>
              </div>
              <div>
                <div>
                  <span>배송비</span>
                </div>
                <div>
                  <span>3,000원</span>
                </div>
              </div>
            </div>
            <div className="cart-result-final">
              <div>
                <button onClick={this.handleClickDeleteButton}>
                  선택상품 삭제
                </button>
                <button>위시리스트 담기</button>
              </div>
              <div>
                <div>
                  <span>결제금액</span>
                </div>
                <div>
                  <span>{formatter(parseInt(sum(items)) + 3000)}원</span>
                </div>
              </div>
            </div>
          </div>
          <div className="cart-result-button">
            <button>계속 쇼핑하기</button>
            <button>주문하기</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Basket;
