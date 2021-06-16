import React from 'react';
import { Link } from 'react-router-dom';
import ItemList from './ItemList/ItemList';
import API from '../../config';
import QuantityForm from './QuantityForm/QuantityForm';
import './Basket.scss';

const sum = items => {
  const sum = items.reduce(
    (acc, item) => acc + parseInt(item.payment_charge * item.amount),
    0
  );
  return sum;
};

class Basket extends React.Component {
  constructor() {
    super();

    this.state = {
      items: [],
      checkedItems: [],
      quantityFormId: '',
      isCheckedAllItems: true,
      isClickedCountButton: false,
    };
  }

  componentDidMount() {
    this.fetchBasketItems();
  }

  // ${API}/orders/cart
  // /Data/basket.json
  fetchBasketItems = async () => {
    try {
      const res = await fetch(`${API}/orders/cart`, {
        method: 'GET',
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      });

      const items = await res.json();

      // this.setState({
      //   items,
      //   checkedItems: items.map(item => item.cart_id),
      // });

      if (items.message === 'SUCCESS') {
        this.setState({
          items: items.result,
          checkedItems: items.result.map(item => item.cart_id),
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  requestDeleteItem = async id => {
    if (id.length <= 0) {
      console.error('아이템을 선택하세요');
      return;
    }

    try {
      const res = await fetch(`${API}/orders/cart`, {
        method: 'PUT',
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          cart_item_id: id,
        }),
      });
      const result = await res.json();

      if (result.message === 'DELETE_SUCCESS') {
        this.deleteItems(id);
      } else {
        console.error('메시지가 올바르지 않습니다');
      }
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
  };

  handleClickDeleteButton = () => {
    const checkedItems = this.state.checkedItems;
    this.requestDeleteItem(checkedItems);
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

  deleteItems = id => {
    const filteredItems = this.state.items;
    const checkedItems = this.state.checkedItems;

    if (id.length === 1) {
      const [itemId] = id;
      this.setState({
        items: this.state.items.filter(item => item.cart_id !== itemId),
        checkedItems: checkedItems.filter(
          checkedItem => checkedItem !== itemId
        ),
      });
      return;
    }

    for (let i = 0; i < filteredItems.length; i++) {
      for (let j = 0; j < checkedItems.length; j++) {
        if (
          filteredItems[i] &&
          filteredItems[i].cart_id === parseInt(checkedItems[j])
        ) {
          filteredItems.splice(i, 1);
          i--;
        }
      }
    }

    this.setState({
      items: filteredItems,
      checkedItems: [],
    });
  };

  openQuantityForm = id => {
    this.setState({
      isClickedCountButton: !this.state.isClickedCountButton,
      quantityFormId: id,
    });
  };

  requestModifyQuantity = async (id, amount) => {
    console.log(id, amount);
    try {
      //   const res = await fetch('http://10.58.1.215:8000/orders/cart', {
      //     method: 'PATCH',
      //     headers: {
      //       // Authorization: `${localStorage.getItem('accessToken')}`,
      //       Authorization:
      //         'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1fQ.m9NNCruvdjZaxXrQnciYLBZOPU9GHpKlTjhBFzTMWo0',
      //     },
      //     body: JSON.stringify({
      //       product_id: 165,
      //       amount,
      //     }),
      //   });

      //   const result = await res.json();
      //   // console.log(result);

      //   if (result.message === 'CHANGE SUCCESS') {
      //     this.modifyQuantity(id, price, amount);
      //   } else {
      //     console.error('수량 변경 실패');
      //   }

      this.modifyQuantity(id, amount);
    } catch (err) {
      console.error(err);
    }
  };

  modifyQuantity = (id, amount) => {
    const modifiedItems = this.state.items.map(item => {
      if (item.cart_id === id) {
        // item.payment_charge = price + '.00';
        item.amount = amount;
      }

      return item;
    });

    this.setState({
      items: modifiedItems,
    });
  };

  render() {
    const {
      items,
      checkedItems,
      isCheckedAllItems,
      isClickedCountButton,
      quantityFormId,
    } = this.state;

    const state = items.filter(item => {
      for (const checkedItem of checkedItems) {
        if (item.cart_id === checkedItem) {
          return item;
        }
      }
    });

    // console.log(state);

    return (
      <div className="basket">
        {isClickedCountButton && (
          <QuantityForm
            item={items.filter(item => item.cart_id === quantityFormId)}
            openQuantityForm={this.openQuantityForm}
            requestModifyQuantity={this.requestModifyQuantity}
          />
        )}
        <div className="title">
          <h1>CART</h1>
          <span>당신의 선릉은 어떤가요?</span>
        </div>
        <div className="cart">
          <div className="cart-header">
            <div className="checkbox">
              <input
                type="checkbox"
                onChange={this.handleChangeCheckBox}
                checked={isCheckedAllItems}
              />
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
            requestDeleteItem={this.requestDeleteItem}
            checkItems={this.checkItems}
            openQuantityForm={this.openQuantityForm}
            isCheckedAllItems={isCheckedAllItems}
          />
          <div className="cart-result">
            <div className="cart-result-preview">
              <div>
                <div>
                  <span>상품가격</span>
                </div>
                <div>
                  <span>{sum(items).toLocaleString()}원</span>
                </div>
              </div>
              <div>
                <div>
                  <span>배송비</span>
                </div>
                <div>
                  {localStorage.getItem('access_token') ? (
                    <span>0원</span>
                  ) : (
                    <span>2,500원</span>
                  )}
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
                  <span>
                    {/* 체크된 것만 가격계산 */}
                    {localStorage.getItem('access_token')
                      ? sum(items).toLocaleString()
                      : (sum(items) + 2500).toLocaleString()}
                    원
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="cart-result-button">
            <Link to="/shop">
              <button className="continue">계속 쇼핑하기</button>
            </Link>
            <Link to={{ pathname: '/signup', state }}>
              <button className="order">주문하기</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Basket;
