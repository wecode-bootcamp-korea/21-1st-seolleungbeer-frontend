import React from 'react';
import { paymentValidator } from '../../../utils/payment';
import Card from '../../../Components/Payment/Card';

class DeliveryInfo extends React.Component {
  render() {
    const {
      isSame,
      delivery_user_name,
      delivery_mobile,
      zonecode,
      address,
      address_detail,
      delivery_memo,
      handleCheckBox,
      handleInput,
      handleModal,
      isCheck,
    } = this.props;

    return (
      <Card title={'배송 정보'}>
        <div className="card-delivery-info">
          <div>
            <label>
              <input
                type="checkbox"
                name="isSame"
                checked={isSame}
                onChange={handleCheckBox}
              />
              <span>주문자 정보와 동일</span>
            </label>
          </div>
          <div className="card-delivery-section">
            <input
              type="text"
              name="delivery_user_name"
              placeholder="수령인"
              value={delivery_user_name}
              onChange={handleInput}
              className={
                !isCheck.delivery_user_name ||
                paymentValidator['delivery_user_name'](delivery_user_name)
                  ? ''
                  : 'warning'
              }
            />
            <input
              type="text"
              name="delivery_mobile"
              placeholder="연락처"
              value={delivery_mobile}
              onChange={handleInput}
              className={
                !isCheck.delivery_mobile ||
                paymentValidator['delivery_mobile'](delivery_mobile)
                  ? ''
                  : 'warning'
              }
            />
          </div>
          <div className="card-delivery-section">
            <span
              className={
                !isCheck.delivery_user_name ||
                paymentValidator['delivery_user_name'](delivery_user_name)
                  ? ''
                  : 'warning'
              }
            >
              수령인 이름을 입력해주세요
            </span>
            <span
              className={
                !isCheck.delivery_mobile ||
                paymentValidator['delivery_mobile'](delivery_mobile)
                  ? ''
                  : 'warning'
              }
            >
              수령인 연락처를 입력해주세요
            </span>
          </div>
          <div className="card-delivery-section">
            <div className="card-delivery-section">
              <input
                type="text"
                placeholder="우편번호"
                disabled={true}
                value={zonecode}
              />
              <button onClick={handleModal}>주소찾기</button>
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
              onChange={handleInput}
            />
          </div>
          <div>
            <p>배송메모</p>
          </div>
          <div>
            <select
              name="delivery_memo"
              value={delivery_memo}
              onChange={handleInput}
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
    );
  }
}

export default DeliveryInfo;
