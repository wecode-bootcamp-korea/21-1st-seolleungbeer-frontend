import React from 'react';
import Goods from './DetailSections/Goods';
import Categories from './DetailSections/Categories';
import Popup from '../../Components/ShoppingModal/Popup';
import Login from '../Login/Login';
import './Detail.scss';
class Detail extends React.Component {
  state = {
    goods: {},
    isModal: false,
    page: 'Cart',
  };

  handelModal = () => {
    this.setState({
      isModal: !this.state.isModal,
    });
  };

  componentDidMount = () => {
    fetch('/Data/detail.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => this.setState({ goods: data.result }));
  };

  render() {
    const { goods, isModal, page } = this.state;

    return (
      <div className="detail">
        {isModal && (
          <Popup handelModal={this.handelModal}>
            {page === 'Cart' ? (
              <div className="promp-popup">
                <div class="container">
                  <p>선택하신 상품을 장바구니에 담았습니다.</p>
                </div>
                <div class="button-list">
                  <button onClick={this.handelModal}>계속쇼핑</button>
                  <button>장바구니</button>
                </div>
              </div>
            ) : (
              <Login />
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

export default Detail;
