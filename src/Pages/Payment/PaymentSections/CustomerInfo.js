import React from 'react';
import { paymentValidator } from '../../../utils/payment';
import Card from '../../../Components/Payment/Card';

class CustomerInfo extends React.Component {
  render() {
    const { order_user_name, order_mobile, order_email, handleInput, isCheck } =
      this.props;

    return (
      <Card title={'주문자 정보'}>
        <div className="card-order-info">
          <div>
            <input
              type="text"
              name="order_user_name"
              placeholder="이름"
              value={order_user_name}
              onChange={handleInput}
              className={
                !isCheck.order_user_name ||
                paymentValidator['order_user_name'](order_user_name) // || order_user_name === undefined
                  ? ''
                  : 'warning'
              }
            />
            <input
              type="text"
              name="order_mobile"
              placeholder="연락처"
              value={order_mobile}
              onChange={handleInput}
              className={
                !isCheck.order_mobile ||
                paymentValidator['order_mobile'](order_mobile)
                  ? ''
                  : 'warning'
              }
            />
          </div>
          <div>
            <span
              className={
                !isCheck.order_user_name ||
                paymentValidator['order_user_name'](order_user_name)
                  ? ''
                  : 'warning'
              }
            >
              주문자 이름을 입력해주세요
            </span>
            <span
              className={
                !isCheck.order_mobile ||
                paymentValidator['order_mobile'](order_mobile)
                  ? ''
                  : 'warning'
              }
            >
              주문자 연락처를 입력해주세요
            </span>
          </div>
          <div>
            <input
              type="email"
              name="order_email"
              placeholder="이메일"
              value={order_email}
              onChange={handleInput}
              className={
                !isCheck.order_email ||
                paymentValidator['order_email'](order_email)
                  ? ''
                  : 'warning'
              }
            />
          </div>
          <div>
            <span
              className={
                !isCheck.order_email ||
                paymentValidator['order_email'](order_email)
                  ? ''
                  : 'warning'
              }
            >
              주문자 이메일을 입력해주세요
            </span>
          </div>
        </div>
      </Card>
    );
  }
}

export default CustomerInfo;
