import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import Card from '../../Components/Payment/Card';
import validator from '../../utils/validator';
import './Payment.scss';

class Payment extends React.Component {
  state = {
    email: '',
    mobile: '',
    orders: [
      {
        img: 'https://cdn.imweb.me/thumbnail/20201223/8c3eb7bdf85e3.jpg',
        name: 'AAAAAA',
        id: 156,
        amount: 12,
        price: 4000,
      },
      {
        img: 'https://cdn.imweb.me/thumbnail/20201223/8c3eb7bdf85e3.jpg',
        name: 'BBBBBB',
        id: 16,
        amount: 8,
        price: 40000,
      },
      {
        img: 'https://cdn.imweb.me/thumbnail/20201223/8c3eb7bdf85e3.jpg',
        name: 'CCCCCCC',
        id: 16,
        amount: 19,
        price: 10000,
      },
    ],
    zonecode: '',
    address: '',
    address_detail: '',
    delivery_memo: '',
    payment_information: [
      { value: 'card', checked: true, label: '신용카드' },
      { value: 'kakao', checked: false, label: '카카오페이' },
    ],
    isModalOpen: false,
    agree_check: false,
  };

  componentDidMount = () => {
    const orders = this.props.location.state;
  };

  handleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleComplete = data => {
    const { zonecode, address, bname, buildingName } = data;
    const addr = `${address} ( ${bname} ${buildingName}) `;

    this.setState(
      {
        zonecode,
        address: addr,
      },
      this.handleModal
    );
  };

  handleRadio = e => {
    const { value, checked } = e.target;
    const { payment } = this.state;

    this.setState({
      payment: payment.map(pay => ({
        ...pay,
        checked: pay.value === value ? checked : !checked,
      })),
    });
  };

  handleCheckBox = e => {
    const { name, checked } = e.target;
    this.setState({ [name]: checked });
  };

  submitPayment = () => {
    const { agree_check, email, mobile } = this.state;

    // const obj ={
    //   order_number: '주문번호(장바구니의 주문번호)',
    //   order_item: [아이템.id:수량, 아이템id:수량, 아이템.id:수량, ...],
    //   delivery_memo: '배송메모',
    //   payment_information: '결제방법',
    //   payment_charge: 최종결제금액,
    //   }

    if (!validator.email(email)) {
      return;
    }
    if (!validator.mobile(mobile)) {
      return;
    }

    if (!agree_check) {
      alert('구매조건 확인 및 결제진행에 동의하여 주시기 바랍니다.');
      return;
    }
  };

  render() {
    const {
      orders,
      isModalOpen,
      zonecode,
      address,
      address_detail,
      delivery_memo,
      payment_information,
      agree_check,
    } = this.state;

    const orderSumAmount = orders.reduce((acc, order) =>
      typeof acc === 'object' ? acc.amount + order.amount : acc + order.amount
    );

    const orderSumPrice = orders.reduce((acc, order) =>
      typeof acc === 'object'
        ? acc.amount * acc.price + order.amount * order.price
        : acc + order.amount * order.price
    );

    const deliveryCharge = Math.max(
      ...orders.map(order =>
        order.delivery_charge ? order.delivery_charge : 0
      )
    );

    const totalCost = orderSumPrice + deliveryCharge;

    return (
      <div className="payment">
        {/* {isModalOpen && (
          <Popup handelModal={this.handelModal} isUsed={true}>
            <DaumPostcode onComplete={this.handleComplete} />
          </Popup>
        )} */}
        <div>
          <h1>결제하기</h1>
        </div>
        <div className="payment-body">
          <div className="payment-left">
            <Card title={'주문 상품 정보'}>
              {orders?.map(order => (
                <div className="goods-info">
                  <div className="goods-left">
                    <img
                      src={order.img}
                      alt={order.name}
                      width="90px"
                      height="90px"
                    />
                  </div>
                  <div className="goods-right">
                    <div>{order.name}</div>
                    <div className="goods-amount">{order.amount}개</div>
                    <div>
                      <strong>
                        ₩{(order.price * order.amount).toLocaleString()}원
                      </strong>
                    </div>
                  </div>
                </div>
              ))}
            </Card>
            <Card title={'주문자 정보'}>
              <div className="order-info">
                <div>
                  <input type="text" name="" placeholder="이름" />
                  <input type="text" name="" placeholder="연락처" />
                </div>
                <div>
                  <input type="email" name="email" placeholder="이메일" />
                </div>
              </div>
            </Card>
            <Card title={'배송 정보'}>
              <div className="delivery-info">
                <div>
                  <label>
                    <input type="checkbox" />
                    <span>주문자 정보와 동일</span>
                  </label>
                </div>
                <div>
                  <input type="text" placeholder="수령인" />
                  <input type="text" placeholder="연락처" />
                </div>
                <div>
                  <div>
                    <input
                      type="text"
                      placeholder="우편번호"
                      disabled={true}
                      value={zonecode}
                    />
                    <button onClick={this.handleModal}>주소찾기</button>
                  </div>
                  <div></div>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="주소"
                    disabled={true}
                    value={address}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="상세주소"
                    name="address_detail"
                    value={address_detail}
                    onChange={this.handleInput}
                  />
                </div>
                <div>
                  <p>배송메모</p>
                </div>
                <div>
                  <select
                    name="delivery_message"
                    value={delivery_memo}
                    onChange={this.handleInput}
                  >
                    <option value="">배송메모를 선택해 주세요.</option>
                    <option value="배송 전에 미리 연락 바랍니다.">
                      배송 전에 미리 연락 바랍니다.
                    </option>
                    <option value="부재시 경비실에 맡겨주세요.">
                      부재시 경비실에 맡겨주세요.
                    </option>
                    <option value="부재시 전화나 문자를 남겨주세요.">
                      부재시 전화나 문자를 남겨주세요.
                    </option>
                  </select>
                </div>
              </div>
            </Card>
          </div>
          <div className="payment-right">
            <Card title={'최종 결제금액'}>
              <div className="price-info">
                <div className="price">
                  <div>
                    <span>상품가격</span>
                    <span>{orderSumPrice.toLocaleString()}원</span>
                  </div>
                  <div>
                    <span>배송비</span>
                    <span>
                      {deliveryCharge === 0
                        ? '무료'
                        : deliveryCharge.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="tot-info">
                  <strong>총 결제금액({orderSumAmount}개)</strong>
                  <span>
                    <strong>{totalCost.toLocaleString()} 원</strong>
                  </span>
                </div>
              </div>
            </Card>
            <Card title={'결제방법'}>
              <div className="pay">
                {payment_information.map(pay => (
                  <label key={pay.checked}>
                    <input
                      type="radio"
                      name="payment"
                      value={pay.value}
                      checked={pay.checked}
                      onChange={this.handleRadio}
                    />
                    <span>{pay.label}</span>
                  </label>
                ))}
              </div>
            </Card>
            <Card>
              <div className="paygo">
                <label>
                  <input
                    type="checkbox"
                    name="agree_check"
                    checked={agree_check}
                    onChange={this.handleCheckBox}
                  />
                  <span>구매조건 확인 및 결제진행에 동의</span>
                </label>
                <button onClick={this.submitPayment}>결제하기</button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;
