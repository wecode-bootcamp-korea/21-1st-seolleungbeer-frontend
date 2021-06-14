import React from 'react';
import { withRouter } from 'react-router-dom';
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

  handelModal = e => {
    const { name } = e.target;
    const { isLogin } = this.state;

    if (isLogin && name === 'buy') {
      this.props.history.push('/payment');
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
    const url = `http://10.58.2.90:8000/products/${id}`;

    fetch('/Data/detail.json')
      // fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ goods: data.result });
      });
  };

  render() {
    const { goods, isModalOpen, isLogin } = this.state;

    return (
      <div className="detail">
        {isModalOpen && (
          <Popup handelModal={this.handelModal} isUsed={isLogin ? false : true}>
            {isLogin ? (
              <div className="promp-popup">
                <div class="container">
                  <p>선택하신 상품을 장바구니에 담았습니다.</p>
                </div>
                <div class="button-list">
                  <button onClick={e => this.handelModal(e)}>계속쇼핑</button>
                  <button onClick={() => this.props.history.push('/cart')}>
                    장바구니
                  </button>
                </div>
              </div>
            ) : (
              <Login handelModal={this.handelModal} />
            )}
          </Popup>
        )}
        <div className="detail-wrapper">
          <Goods goods={goods} handelModal={this.handelModal} />
          <Categories goods={goods} />
        </div>
      </div>
    );
  }
}

export default withRouter(Detail);
