import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import API from '../../config';
import Card from '../../Components/Payment/Card';
import Popup from '../../Components/ShoppingModal/Popup';
import validator from '../../utils/validator';
import './Payment.scss';

class Payment extends React.Component {
  state = {
    order_user_name: '',
    order_email: '',
    order_mobile: '',
    delivery_user_name: '',
    delivery_mobile: '',
    order_item: [],
    zonecode: '',
    address: '',
    address_detail: '',
    delivery_memo: '',
    total_price: 0,
    total_amount: 0,
    delivery_charge: 0,
    payment: [
      { value: 'card', checked: true, label: '신용카드' },
      { value: 'kakao', checked: false, label: '카카오페이' },
    ],
    isSame: false,
    isAgree: false,
    isModalOpen: false,
    checkList: {
      order_user_name: {
        type: 'name',
        validator: true,
        message: '주문자 이름을 확인해주세요',
      },
      order_email: {
        type: 'email',
        validator: true,
        message: '주문자 이메일을 확인해주세요',
      },
      order_mobile: {
        type: 'mobile',
        validator: true,
        message: '주문자 연락처를 확인해주세요',
      },
      delivery_user_name: {
        type: 'name',
        validator: true,
        message: '수령인 이름을 확인해주세요',
      },
      delivery_mobile: {
        type: 'mobile',
        validator: true,
        message: '수령인 연락처를 확인해주세요',
      },
    },
  };

  componentDidMount = () => {
    const token = localStorage.getItem('access_token');
    const resource = `/users/account`;
    const { order_item } = this.props.history.location.state;

    fetch(API.payment + resource, {
      headers: {
        Authorization: token,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          return;
        }
        const { email, mobile, name } = data;

        if (order_item) {
          const total_amount = order_item.reduce(
            (acc, order) => acc + order.amount,
            0
          );

          const total_price = order_item.reduce(
            (acc, order) => acc + order.amount * order.price,
            0
          );

          const delivery_charge = 0;

          this.setState({
            order_item,
            total_amount,
            total_price,
            delivery_charge,
            order_user_name: name,
            order_email: email,
            order_mobile: mobile,
          });
        }
      });
  };

  handleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  validationCheck = key => {
    const { checkList } = this.state;
    let isValidator = false;
    const value = this.state[key];

    if (checkList[key].type === 'name') {
      if (value.length > 1) {
        isValidator = true;
      }
    } else {
      isValidator = validator[checkList[key].type](value);
    }

    this.setState({
      ...checkList[key],
      ...(checkList[key].validator = isValidator),
    });
  };

  handleInput = e => {
    const { name, value } = e.target;
    const { checkList } = this.state;

    this.setState({ [name]: value }, () => {
      if (Object.keys(checkList).includes(name)) {
        this.validationCheck(name);
      }
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

  validationCheckList = () => {
    const { checkList } = this.state;

    Object.keys(checkList).map(key => this.validationCheck(key));

    console.log(`validationCheckList`);

    for (let item in checkList) {
      if (checkList[item].validator === false) {
        alert(checkList[item].message);
        return true;
      }
    }
    return false;
  };

  submitPayment = () => {
    const { isAgree, total_price, delivery_charge } = this.state;
    const { order_item, delivery_memo, payment } = this.state;
    const payment_information = payment.filter(pay => pay.checked)[0].label;

    const data = {
      order_item,
      delivery_memo,
      payment_information,
      payment_charge: total_price + delivery_charge,
    };

    if (this.validationCheckList()) {
      return;
    }

    if (!isAgree) {
      alert('구매조건 확인 및 결제진행에 동의하여 주시기 바랍니다.');
      return;
    }

    this.gotoServer(data);
  };

  gotoServer = data => {
    const token = localStorage.getItem('access_token');
    const resource = '/orders/payment';
    fetch(API.payment + resource, {
      headers: {
        Authorization: token,
      },
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.message === 'SUCCESS') {
          alert('결제가 완료되었습니다');
          this.props.history.push('/');
        }
      });
  };

  render() {
    const { isModalOpen, payment, isAgree, isSame, checkList } = this.state;
    const { order_item, total_amount, total_price } = this.state;
    const { zonecode, address, address_detail, delivery_memo } = this.state;
    const { order_user_name, order_email, order_mobile } = this.state;
    const { delivery_user_name, delivery_mobile, delivery_charge } = this.state;

    const postStyle = { width: '400px', height: '500px', margin: '20px' };

    return (
      <div className="payment">
        {isModalOpen && (
          <Popup handleModal={this.handleModal} isUsed={true}>
            <DaumPostcode onComplete={this.handleComplete} style={postStyle} />
          </Popup>
        )}
        <div>
          <h1>결제하기</h1>
        </div>
        <div className="payment-body">
          <div className="payment-left">
            <Card title={'주문 상품 정보'}>
              {order_item?.map(order => (
                <div className="card-goods-info" key={order.order_item_id}>
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
                    <div className="card-goods-amount">{order.amount}개</div>
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
              <div className="card-order-info">
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
                    className={
                      checkList.order_mobile.validator ? '' : 'warning'
                    }
                  />
                </div>
                <div>
                  <span
                    className={
                      checkList.order_user_name.validator ? '' : 'warning'
                    }
                  >
                    주문자 이름을 입력해주세요
                  </span>
                  <span
                    className={
                      checkList.order_mobile.validator ? '' : 'warning'
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
                    onChange={this.handleInput}
                    className={checkList.order_email.validator ? '' : 'warning'}
                  />
                </div>
                <div>
                  <span
                    className={checkList.order_email.validator ? '' : 'warning'}
                  >
                    주문자 이메일을 입력해주세요
                  </span>
                </div>
              </div>
            </Card>
            <Card title={'배송 정보'}>
              <div className="card-delivery-info">
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
                    className={
                      checkList.delivery_user_name.validator ? '' : 'warning'
                    }
                  />
                  <input
                    type="text"
                    name="delivery_mobile"
                    placeholder="연락처"
                    value={delivery_mobile}
                    onChange={this.handleInput}
                    className={
                      checkList.delivery_mobile.validator ? '' : 'warning'
                    }
                  />
                </div>
                <div>
                  <span
                    className={
                      checkList.delivery_user_name.validator ? '' : 'warning'
                    }
                  >
                    수령인 이름을 입력해주세요
                  </span>
                  <span
                    className={
                      checkList.delivery_mobile.validator ? '' : 'warning'
                    }
                  >
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
            <Card title={'결제방법'}>
              <div className="pay">
                {payment?.map(pay => (
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
