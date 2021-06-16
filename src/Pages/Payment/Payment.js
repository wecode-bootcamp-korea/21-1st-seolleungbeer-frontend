import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import Card from '../../Components/Payment/Card';
import validator from '../../utils/validator';
import './Payment.scss';

class Payment extends React.Component {
  state = {
    order_user_name: '사람이름이다',
    order_email: 'this@mail.com',
    order_mobile: '0001110001',
    delivery_user_name: '',
    delivery_mobile: '',
    order_item: [
      {
        image_url: 'https://cdn.imweb.me/thumbnail/20201223/8c3eb7bdf85e3.jpg',
        korean_name: 'AAAAAA',
        product_id: 12,
        id: 156,
        amount: 12,
        price: 4000,
      },
      {
        image_url: 'https://cdn.imweb.me/thumbnail/20201223/8c3eb7bdf85e3.jpg',
        korean_name: 'BBBBBB',
        product_id: 12,
        id: 16,
        amount: 8,
        price: 40000,
      },
      {
        image_url: 'https://cdn.imweb.me/thumbnail/20201223/8c3eb7bdf85e3.jpg',
        korean_name: 'CCCCCCC',
        product_id: 12,
        id: 17,
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
    isSame: false,
    isAgree: false,
    isModalOpen: false,
    checkList: {
      order_user_name: { type: 'name', validator: true },
      order_email: { type: 'email', validator: true },
      order_mobile: { type: 'mobile', validator: true },
      delivery_user_name: { type: 'name', validator: true },
      delivery_mobile: { type: 'mobile', validator: true },
    },
  };

  componentDidMount = () => {
    const { order_item } = this.props.location.state;
  };

  handleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  handleInput = e => {
    const { name, value } = e.target;
    const { checkList } = this.state;

    if (Object.keys(checkList).includes(name)) {
      console.log(name, checkList[name]);
      let isValidator = false;

      if (checkList[name].type === 'name') {
        console.log(value.length);

        if (value.length > 0) {
          isValidator = true;
        }
      } else {
        isValidator = validator[checkList[name].type](value);
      }

      this.setState({
        [name]: value,
      });
      return;
    }

    this.setState({
      [name]: value,
    });
  };

  checkListVaildator = () => {
    // if (Object.keys(checkList).includes(name)) {
    //   console.log(name, checkList[name]);
    //   let isValidator = false;
    //   if (checkList[name].type === 'name') {
    //     if (value.length > 0) {
    //       isValidator = true;
    //     }
    //   } else {
    //     isValidator = validator[checkList[name].type](value);
    //   }
    //   console.log(isValidator);
    //   this.setState({
    //     checkList: { ...checkList, validator: isValidator },
    //     [name]: value,
    //   });
    //   return;
    // }
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
    const { name: checkBoxName, checked } = e.target;
    const { order_user_name, order_mobile } = this.state;

    if (checkBoxName === 'isSame') {
      if (checked) {
        this.setState({
          [checkBoxName]: checked,
          delivery_user_name: order_user_name,
          delivery_mobile: order_mobile,
        });
        return;
      }

      this.setState({
        [checkBoxName]: checked,
        delivery_user_name: '',
        delivery_mobile: '',
      });
      return;
    }

    if (checkBoxName === 'isAgree') {
      this.setState({ [checkBoxName]: checked });
      return;
    }
  };

  sumOrder = returnValue => {
    const { order_item } = this.state;

    if (returnValue === 'amount') {
      return order_item.reduce((acc, order) =>
        typeof acc === 'object' ? acc.amount + order.amount : acc + order.amount
      );
    }
    if (returnValue === 'price') {
      return order_item.reduce((acc, order) =>
        typeof acc === 'object'
          ? acc.amount * acc.price + order.amount * order.price
          : acc + order.amount * order.price
      );
    }
    if (returnValue === 'amount') {
      return order_item.reduce((acc, order) =>
        typeof acc === 'object' ? acc.amount + order.amount : acc + order.amount
      );
    }

    return 0;
  };

  submitPayment = () => {
    const { isAgree, email, mobile } = this.state;
    const { order_item, delivery_memo, payment_information } = this.state;

    console.log(this.state);

    const pay = {};

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

    if (!isAgree) {
      alert('구매조건 확인 및 결제진행에 동의하여 주시기 바랍니다.');
      return;
    }
  };

  render() {
    const { isModalOpen, payment_information, isAgree, isSame, checkList } =
      this.state;
    const { order_item } = this.state;
    const { zonecode, address, address_detail, delivery_memo } = this.state;
    const { order_user_name, order_email, order_mobile } = this.state;
    const { delivery_user_name, delivery_mobile } = this.state;

    const orderSumAmount = this.sumOrder('amount');
    const orderSumPrice = this.sumOrder('price');
    const deliveryCharge = Math.max(
      ...order_item.map(order =>
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
              {order_item?.map(order => (
                <div className="goods-info" key={order.id}>
                  <div className="goods-left">
                    <img
                      src={order.image_url}
                      alt={order.korean_name}
                      width="90px"
                      height="90px"
                    />
                  </div>
                  <div className="goods-right">
                    <div>{order.korean_name}</div>
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
                  <input
                    type="text"
                    name="order_user_name"
                    placeholder="이름"
                    value={order_user_name}
                    onChange={this.handleInput}
                    className={
                      checkList.order_user_name.validator ? '' : 'warning'
                    }
                  />
                  <input
                    type="text"
                    name="order_mobile"
                    placeholder="연락처"
                    value={order_mobile}
                    onChange={this.handleInput}
                    className={checkList.order_mobile ? '' : 'warning'}
                  />
                </div>
                <div>
                  <span className={checkList.order_user_name ? '' : 'warning'}>
                    주문자 이름을 입력해주세요
                  </span>
                  <span className={checkList.order_mobile ? '' : 'warning'}>
                    주문자 연락처를 입력해주세요
                  </span>
                </div>
                <div>
                  <input
                    type="email"
                    name="order_email"
                    placeholder="이메일"
                    value={order_email}
                    onChange={this.handleInput}
                    className={checkList.order_email.validator ? '' : 'warning'}
                  />
                </div>
                <div>
                  <span className={checkList.order_email ? '' : 'warning'}>
                    주문자 이메일을 입력해주세요
                  </span>
                </div>
              </div>
            </Card>
            <Card title={'배송 정보'}>
              <div className="delivery-info">
                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="isSame"
                      checked={isSame}
                      onChange={this.handleCheckBox}
                    />
                    <span>주문자 정보와 동일</span>
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    name="delivery_user_name"
                    placeholder="수령인"
                    value={delivery_user_name}
                    onChange={this.handleInput}
                    className={checkList.delivery_user_name ? '' : 'warning'}
                  />
                  <input
                    type="text"
                    name="delivery_mobile"
                    placeholder="연락처"
                    value={delivery_mobile}
                    onChange={this.handleInput}
                    className={checkList.delivery_mobile ? '' : 'warning'}
                  />
                </div>
                <div>
                  <span
                    className={checkList.delivery_user_name ? '' : 'warning'}
                  >
                    수령인 이름을 입력해주세요
                  </span>
                  <span className={checkList.delivery_mobile ? '' : 'warning'}>
                    수령인 연락처를 입력해주세요
                  </span>
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
                    name="delivery_memo"
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
                    name="isAgree"
                    checked={isAgree}
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
