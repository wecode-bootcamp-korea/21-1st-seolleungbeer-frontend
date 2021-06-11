import React from 'react';

import './GoodsSections.scss';

class BuyButtonGroup extends React.Component {
  render() {
    const { handelModal } = this.props;

    return (
      <div className="buy-button-group">
        <div>
          <button
            className="button-grooups buy-button"
            name="buy"
            onClick={e => handelModal(e)}
          >
            BUY NOW
          </button>
          <button
            className="button-grooups cart-button"
            name="cart"
            onClick={e => handelModal(e)}
          >
            CART
          </button>
        </div>
      </div>
    );
  }
}

export default BuyButtonGroup;
