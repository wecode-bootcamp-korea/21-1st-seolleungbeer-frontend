import React from 'react';

import './GoodsSections.scss';

class BuyButtonGroup extends React.Component {
  render() {
    return (
      <div className="BuyButtonGroup">
        <div>
          <button className="ButtonGrooups BuyButton">BUY NOW</button>
          <button className="ButtonGrooups CartButton">CART</button>
        </div>
      </div>
    );
  }
}

export default BuyButtonGroup;
