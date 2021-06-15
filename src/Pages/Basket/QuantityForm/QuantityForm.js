import React from 'react';
import './QuantityForm.scss';

class QuantityForm extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="quantity-form">
        <div className="quantity-form-content">
          <div className="title">
            <h2>옵션 변경</h2>
          </div>
          <div className="item-container">
            <div className="image-container">
              <img alt="" src="/images/cat.jpg" />
            </div>
            <div className="description">
              <span>제주에서 만난 김부각</span>
              <span>12,100원</span>
            </div>
          </div>
          <div className="count-container">
            <span>수량</span>
            <button>-</button>
            <input />
            <button>+</button>
          </div>
          <div className="result">
            <div>
              <span>
                총 수량 <span className="result-quantity">17</span>개
              </span>
            </div>
            <div>
              <span className="result-price">205,700원</span>
            </div>
          </div>
          <div className="control-button">
            <button>취소</button>
            <button>변경</button>
          </div>
        </div>
      </div>
    );
  }
}

export default QuantityForm;
