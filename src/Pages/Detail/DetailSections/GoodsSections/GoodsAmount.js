import React from 'react';

import './GoodsSections.scss';

class GoodsAmount extends React.Component {
  render() {
    return (
      <div className="goods-amount">
        <div className="goods-delivery">
          <div>배송비 미가입 시 건당 3,000원</div>
          <div>
            <span className="goods-effect">
              회원가입하면 언제 어디서나 무료배송
            </span>
          </div>
        </div>
        <div className="goods-payment">
          <div className="payment-title">수량</div>
          <div className="payment-count">
            <div>
              <button>-</button>
              <input type="text" />
              <button>+</button>
            </div>
            <div>₩12,100원</div>
          </div>
        </div>
        <div className="goods-total">
          <div>총 상품금액(3개)</div>
          <div>₩30,000원</div>
        </div>
      </div>
    );
  }
}

export default GoodsAmount;
