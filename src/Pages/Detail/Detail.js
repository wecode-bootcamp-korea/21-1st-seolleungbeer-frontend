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
    isLogin: true,
    content: {},
  };

  handleModal = (e, amount) => {
    const { name } = e.target;
    const { isLogin, goods } = this.state;
    const { id, korean_name, price } = goods;

    const order = { id, korean_name, amount, price };

    if (isLogin) {
      this.addOrder(order);
      if (name === 'buy') {
        this.props.history.push('/payment');
        return;
      }
      this.setState({ isModalOpen: true });
      return;
    }

    if (name === 'buy' || name === 'cart') {
      this.setState({ isModalOpen: true });
      return;
    }

    this.setState({ isModalOpen: false });
  };

  componentDidMount = () => {
    const { id } = this.props.match.params;
    const resource = `/products/${id}`;

    // fetch('/Data/detail.json')
    fetch(API.detail + resource)
      .then(res => res.json())
      .then(data => {
        if (!data.MESSAGE) {
          this.setState({ goods: { id, ...data.result } });
          return;
        }
        this.props.history.push('/shop');
      });
  };

  addOrder = body => {
    const resource = `/orders/cart`;

    fetch(API.detail + resource, {
      method: 'POST',
      body,
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
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