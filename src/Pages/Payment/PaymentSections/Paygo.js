import React from 'react';
import Card from '../../../Components/Payment/Card';

class Paygo extends React.Component {
  render() {
    const { isAgree, handleCheckBox, submitPayment } = this.props;

    return (
      <Card>
        <div className="paygo">
          <label>
            <input
              type="checkbox"
              name="isAgree"
              checked={isAgree}
              onChange={handleCheckBox}
            />
            <span>구매조건 확인 및 결제진행에 동의</span>
          </label>
          <button onClick={submitPayment}>결제하기</button>
        </div>
      </Card>
    );
  }
}

export default Paygo;
