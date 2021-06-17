import React from 'react';
import { withRouter } from 'react-router-dom';
import API from '../../config';
import Goods from './DetailSections/Goods';
import Categories from './DetailSections/Categories';
import Popup from '../../Components/ShoppingModal/Popup';
import Login from '../Login/Login';
import './Detail.scss';

class Detail extends React.Component {
  state = {
    goods: {},
    isModalOpen: false,
    isLogin: false,
    content: {},
  };

  handleModal = async (e, amount) => {
    const { name: buttonName } = e.target;
    const { isLogin, goods } = this.state;
    const { product_id, korean_name, price } = goods;
    const image_url = goods.image.filter(
      image => image.image_type === 'main'
    )[0]?.image_url;

    if (buttonName === 'buy' || buttonName === 'cart') {
      if (isLogin) {
        const item = { product_id, korean_name, amount, price, image_url };

        const { message, order_item_id } = await this.addOrder(item);

        if (message === 'SUCCESS') {
          item.order_item_id = order_item_id;

          const order_item = [item];

          if (buttonName === 'buy') {
            this.props.history.push({
              pathname: '/payment',
              state: { order_item },
            });
            return;
          }

          this.setState({ isModalOpen: true });
          return;
        }
      } else {
        this.setState({ isModalOpen: true });
        return;
      }
    } else {
      this.setState({ isModalOpen: false });
    }
  };

  addOrder = data => {
    const token = localStorage.getItem('access_token');
    const resource = `/orders/cart`;

    return fetch(API.detail + resource, {
      headers: {
        Authorization: token,
      },
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => data);
  };

  componentDidMount = () => {
    const { product_id } = this.props.match.params;
    const resource = `/products/${product_id}`;

    // fetch('/Data/detail.json')
    fetch(API.detail + resource)
      .then(res => res.json())
      .then(data => {
        if (!data.MESSAGE) {
          this.setState({ goods: { product_id, ...data.result } });
          return;
        }
        this.props.history.push('/shop');
      });
  };

  componentDidUpdate = () => {
    const { isLogin } = this.state;
    const token = localStorage.getItem('access_token');

    if (token && !isLogin) {
      this.setState({ isLogin: true });
    }
    if (!token && isLogin) {
      this.setState({ isLogin: false });
    }
  };

  render() {
    const { goods, isModalOpen, isLogin } = this.state;

    return (
      <div className="detail">
        {isModalOpen && (
          <Popup handleModal={this.handleModal} isUsed={isLogin ? false : true}>
            {isLogin ? (
              <div className="promp-popup">
                <div className="container">
                  <p>선택하신 상품을 장바구니에 담았습니다.</p>
                </div>
                <div className="button-list">
                  <button onClick={e => this.handleModal(e)}>계속쇼핑</button>
                  <button onClick={() => this.props.history.push('/cart')}>
                    장바구니
                  </button>
                </div>
              </div>
            ) : (
              <Login handleModal={this.handleModal} />
            )}
          </Popup>
        )}
        <div className="detail-wrapper">
          <Goods goods={goods} handleModal={this.handleModal} />
          <Categories goods={goods} />
        </div>
      </div>
    );
  }
}

export default withRouter(Detail);
