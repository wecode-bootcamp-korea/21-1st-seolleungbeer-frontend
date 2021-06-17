import React from 'react';
import Card from '../../../Components/Payment/Card';

class PaymentInfo extends React.Component {
  render() {
    const { payment, handleRadio } = this.props;

    return (
      <Card title={'결제방법'}>
        <div className="pay">
          {payment.map(pay => (
            <label key={pay.checked}>
              <input
                type="radio"
                name="payment"
                value={pay.value}
                checked={pay.checked}
                onChange={handleRadio}
              />
              <span>{pay.label}</span>
            </label>
          ))}
        </div>
      </Card>
    );
  }
}

export default PaymentInfo;
