import React from 'react';
import ItemList from './ItemList/ItemList';
import API from '../../config';
import './Basket.scss';
import QuantityForm from './QuantityForm/QuantityForm';

const sum = items => {
  const sum = items.reduce(
    (acc, item) => acc + parseInt(item.payment_charge),
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
      const res = await fetch(`/Data/basket.json`, {
        method: 'GET',
        // headers: {
        //   Authorization: `${localStorage.getItem('accessToken')}`,
        // },
      });

      const items = await res.json();

      this.setState({
        items,
        checkedItems: items.map(item => item.cart_id),
      });

      // if (items.message === 'SUCCESS') {
      //   this.setState({
      //     items: items.result,
      //   });
      // }
    } catch (err) {
      console.error(err);
    }
  };

  requestDeleteItem = async id => {
    try {
      const res = await fetch('#', {
        method: '',
        body: {
          cart_id: id,
        },
      });
      const result = await res.json();

      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  // requestDeleteItems = async checkedItems => {
  //   try {
  //     const res = await fetch('#', {
  //       method: '',
  //       body: {
  //         checkedItems,
  //       },
  //     });
  //     const result = await res.json();

  //     console.log(result);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

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

  deleteItem = itemId => {
    const [id] = itemId;
    this.setState({
      items: this.state.items.filter(item => item.cart_id !== id),
      checkedItems: this.state.checkedItems.filter(
        checkedItem => checkedItem !== id
      ),
    });
    // this.requestDeleteItem(id)
  };

  openQuantityForm = () => {
    this.setState({
      isClickedCountButton: !this.state.isClickedCountButton,
    });
  };

  // modifyQuantity = () => {

  // }

  render() {
    const { items, checkedItems, isCheckedAllItems, isClickedCountButton } =
      this.state;
    console.log(isClickedCountButton);
    return (
      <div className="basket">
        {isClickedCountButton && <QuantityForm />}
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
            deleteItem={this.deleteItem}
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
                  {localStorage.getItem('accessToken') ? (
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
                  <span>{sum(items).toLocaleString()}원</span>
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
