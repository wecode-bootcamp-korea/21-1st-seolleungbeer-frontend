import React from 'react';
import { Link } from 'react-router-dom';
import ItemList from './ItemList/ItemList';
import QuantityForm from './QuantityForm/QuantityForm';
import API from '../../config';
import { getToken } from '../../utils/token';
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
      quantityFormId: '',
      isClickedCountButton: false,
    };
  }

  componentDidMount() {
    this.fetchBasketItems();
  }

  fetchBasketItems = async () => {
    try {
      const res = await fetch(`${API}/orders/cart`, {
        method: 'GET',
        headers: {
          Authorization: getToken(),
        },
      });

      const items = await res.json();

      if (items.message === 'SUCCESS') {
        this.setState({
          items: items.result.map(item => {
            return { ...item, isChecked: true };
          }),
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  requestDeleteItem = async orderItemId => {
    if (orderItemId.length <= 0) {
      console.error('아이템을 선택하세요');
      return;
    }

    try {
      const res = await fetch(`${API}/orders/cart`, {
        method: 'PUT',
        headers: {
          Authorization: getToken(),
        },
        body: JSON.stringify({
          order_item_id: orderItemId,
        }),
      });
      const result = await res.json();

      if (result.message === 'DELETE_SUCCESS') {
        this.deleteItems(orderItemId);
      } else {
        throw new Error('메시지가 올바르지 않습니다');
      }
    } catch (err) {
      console.error(err);
    }
  };

  handleChangeCheckBox = () => {
    const isAllChecked = this.state.items.every(item => item.isChecked);
    this.checkAllItems(isAllChecked);
  };

  handleClickDeleteButton = () => {
    const checkedItemsId = this.state.items
      .map(item => item.isChecked && item.order_item_id)
      .filter(item => item);

    this.requestDeleteItem(checkedItemsId);
  };

  checkAllItems = isAllChecked => {
    this.setState({
      items: this.state.items.map(item => {
        return { ...item, isChecked: !isAllChecked };
      }),
    });
  };

  checkItems = orderItemId => {
    this.setState({
      items: this.state.items.map(item => {
        if (item.order_item_id === orderItemId) {
          return { ...item, isChecked: !item.isChecked };
        }
        return item;
      }),
    });
  };

  deleteItems = orderItemId => {
    if (orderItemId.length === 1) {
      const [itemId] = orderItemId;
      this.setState({
        items: this.state.items.filter(item => item.order_item_id !== itemId),
      });
      return;
    }

    this.setState({
      items: this.state.items.filter(item => !item.isChecked),
    });
  };

  openQuantityForm = orderItemId => {
    this.setState({
      isClickedCountButton: !this.state.isClickedCountButton,
      quantityFormId: orderItemId,
    });
  };

  requestModifyQuantity = async (orderItemId, amount) => {
    try {
      const res = await fetch(`${API}/orders/cart`, {
        method: 'PATCH',
        headers: {
          Authorization: getToken(),
        },
        body: JSON.stringify({
          order_item_id: orderItemId,
          amount,
        }),
      });

      const result = await res.json();

      if (result.message === 'CHANGE SUCCESS') {
        this.modifyQuantity(orderItemId, amount);
      } else {
        throw new Error('수량 변경 실패');
      }
    } catch (err) {
      console.error(err);
    }
  };

  modifyQuantity = (orderItemId, amount) => {
    const modifiedItems = this.state.items.map(item => {
      if (item.order_item_id === orderItemId) {
        item.amount = amount;
      }
      return item;
    });

    this.setState({
      items: modifiedItems,
    });
  };

  render() {
    const { items, isClickedCountButton, quantityFormId } = this.state;
    const checkedItems = items.filter(item => item.isChecked);

    console.log(items);

    return (
      <div className="basket">
        {isClickedCountButton && (
          <QuantityForm
            item={items.filter(item => item.order_item_id === quantityFormId)}
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
                checked={items.every(item => item.isChecked)}
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
            // isCheckedAllItems={isCheckedAllItems}
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
                    {getToken()
                      ? sum(checkedItems).toLocaleString()
                      : (sum(checkedItems) + 2500).toLocaleString()}
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
            <Link to={{ pathname: '/signup', state: checkedItems }}>
              <button className="order">주문하기</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Basket;
