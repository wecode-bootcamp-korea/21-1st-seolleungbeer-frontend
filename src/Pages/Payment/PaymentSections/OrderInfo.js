import React from 'react';
import Card from '../../../Components/Payment/Card';

class OrderInfo extends React.Component {
  render() {
    const { order_item } = this.props;

    return (
      <Card title={'주문 상품 정보'}>
        {order_item?.map(order => (
          <div className="card-goods-info" key={order.order_item_id}>
            <div className="goods-left">
              <img
                src={order.main_image}
                alt={order.korean_name}
                width="90px"
                height="90px"
              />
            </div>
            <div className="goods-right">
              <div>{order.korean_name}</div>
              <div className="card-goods-amount">{order.amount}개</div>
              <div>
                <strong>
                  ₩{(order.payment_charge * order.amount).toLocaleString()}원
                </strong>
              </div>
            </div>
          </div>
        ))}
      </Card>
    );
  }
}

export default OrderInfo;
