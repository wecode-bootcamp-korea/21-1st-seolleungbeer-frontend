import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import API from '../../config';
import Popup from '../../Components/ShoppingModal/Popup';
import { paymentValidator } from '../../utils/payment';
import './Payment.scss';
import OrderInfo from './PaymentSections/OrderInfo';
import CustomerInfo from './PaymentSections/CustomerInfo';
import DeliveryInfo from './PaymentSections/DeliveryInfo';
import FinalPaymentAmount from './PaymentSections/FinalPaymentAmount';
import PaymentInfo from './PaymentSections/PaymentInfo';
import Paygo from './PaymentSections/Paygo';

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
    isCheck: {
      order_user_name: false,
      order_email: false,
      order_mobile: false,
      delivery_user_name: false,
      delivery_mobile: false,
    },
  };

  componentDidMount = () => {
    const token = localStorage.getItem('access_token');
    const resource = `/users`;
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
            (acc, order) => acc + order.amount * order.payment_charge,
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

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.isChecking(name);
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

  isChecking = name => {
    const { isCheck } = this.state;
    if (!isCheck.hasOwnProperty(name)) return;
    if (isCheck[name]) return;

    this.setState({
      isCheck: { ...isCheck, [name]: true },
    });
  };

  isAllChecked = () => {
    const {
      order_user_name,
      order_email,
      order_mobile,
      delivery_user_name,
      delivery_mobile,
      isCheck,
    } = this.state;

    const form = {
      order_user_name,
      order_email,
      order_mobile,
      delivery_user_name,
      delivery_mobile,
    };

    const copiedIsCheck = { ...isCheck };
    Object.keys(copiedIsCheck).forEach(k => (copiedIsCheck[k] = true));

    this.setState({
      isCheck: copiedIsCheck,
    });

    return Object.entries(form).every(([key, value]) =>
      paymentValidator[key](value)
    );
  };

  submitPayment = () => {
    const { isAgree, total_price, delivery_charge } = this.state;
    const { order_item, delivery_memo, payment } = this.state;
    const payment_information = payment.filter(pay => pay.checked)[0].label;

    if (!this.isAllChecked()) {
      alert('주문 정보를 확인해주세요.');
      return;
    }

    const data = {
      order_item,
      delivery_memo,
      payment_information,
      payment_charge: total_price + delivery_charge,
    };

    if (!isAgree) {
      alert('구매조건 확인 및 결제진행에 동의하여 주시기 바랍니다.');

      return;
    }

    this.gotoServer(data);
  };

  gotoServer = data => {
    const token = localStorage.getItem('access_token');
    const resource = '/orders';
<<<<<<< HEAD

    fetch(API.payment + resource, {
=======
    fetch(API + resource, {
>>>>>>> master
      headers: {
        Authorization: token,
      },
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'SUCCESS') {
          alert('결제가 완료되었습니다');
          this.props.history.push('/');
        } else {
          alert('결제를 실패했습니다.');
        }
      });
  };

  render() {
    const { isModalOpen, payment, isAgree, isSame, checkList, isCheck } =
      this.state;
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
            <OrderInfo order_item={order_item} />
            <CustomerInfo
              order_user_name={order_user_name}
              order_mobile={order_mobile}
              order_email={order_email}
              checkList={checkList}
              handleInput={this.handleInput}
              isCheck={isCheck}
            />
            <DeliveryInfo
              isSame={isSame}
              delivery_user_name={delivery_user_name}
              checkList={checkList}
              delivery_mobile={delivery_mobile}
              zonecode={zonecode}
              address={address}
              address_detail={address_detail}
              delivery_memo={delivery_memo}
              handleCheckBox={this.handleCheckBox}
              handleInput={this.handleInput}
              handleModal={this.handleModal}
              isCheck={isCheck}
            />
          </div>
          <div className="payment-right">
            <FinalPaymentAmount
              total_price={total_price}
              delivery_charge={delivery_charge}
              total_amount={total_amount}
            />
            <PaymentInfo payment={payment} handleRadio={this.handleRadio} />
            <Paygo
              isAgree={isAgree}
              handleCheckBox={this.handleCheckBox}
              submitPayment={this.submitPayment}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;
