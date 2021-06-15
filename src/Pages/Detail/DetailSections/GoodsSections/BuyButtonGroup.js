import React from 'react';

import './GoodsSections.scss';

class BuyButtonGroup extends React.Component {
  render() {
    const { amount, handleModal } = this.props;

    return (
      <div className="buy-button-group">
        <div>
          <button
            className="button-grooups buy-button"
            name="buy"
            onClick={e => handleModal(e, amount)}
          >
            BUY NOW
          </button>
          <button
            className="button-grooups cart-button"
            name="cart"
            onClick={e => handleModal(e, amount)}
          >
            CART
          </button>
        </div>
      </div>
    );
  }
}

export default BuyButtonGroup;
