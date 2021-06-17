import React from 'react';
import Card from '../../../Components/Payment/Card';

class FinalPaymentAmount extends React.Component {
  render() {
    const { total_price, delivery_charge, total_amount } = this.props;

    return (
      <Card title={'최종 결제금액'}>
        <div className="price-info">
          <div className="price">
            <div>
              <span>상품가격</span>
              <span>{total_price.toLocaleString()}원</span>
            </div>
            <div>
              <span>배송비</span>
              <span>
                {delivery_charge === 0
                  ? '무료'
                  : delivery_charge.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="tot-info">
            <strong>총 결제금액({total_amount}개)</strong>
            <span>
              <strong>
                {(total_price + delivery_charge).toLocaleString()} 원
              </strong>
            </span>
          </div>
        </div>
      </Card>
    );
  }
}

export default FinalPaymentAmount;
