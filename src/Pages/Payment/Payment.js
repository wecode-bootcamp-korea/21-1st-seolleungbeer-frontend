import React from 'react';
import Card from '../../Components/Payment/Card';
import './Payment.scss';
class Payment extends React.Component {
  render() {
    return (
      <div className="payment">
        <div>
          <h1>결제하기</h1>
        </div>
        <div className="payment-body">
          <div className="payment-left">
            <Card title={'주문 상품 정보'}>
              <div className="goods-info">
                <div className="goods-left">
                  <img
                    src="https://cdn.imweb.me/thumbnail/20201223/8c3eb7bdf85e3.jpg"
                    alt="주문상품이미지"
                    width="90px"
                    height="90px"
                  />
                </div>
                <div className="goods-right">
                  <div>제주맥주</div>
                  <div className="goods-amount">9개</div>
                  <div>
                    <strong>₩79,000원</strong>
                  </div>
                </div>
              </div>
            </Card>
            <Card title={'주문자 정보'}>
              <div className="order-info">
                <div>
                  <input type="text" placeholder="이름" />
                  <input type="text" placeholder="연락처" />
                </div>
                <div>
                  <input type="email" placeholder="이메일" />
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
                    <input type="text" placeholder="우편번호" />
                    <button>주소찾기</button>
                  </div>
                  <div></div>
                </div>
                <div>
                  <input type="text" placeholder="주소" />
                </div>
                <div>
                  <input type="text" placeholder="상세주소" />
                </div>
                <div>
                  <p>배송메모</p>
                </div>
                <div>
                  <select>
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
                    <option value="custom">직접입력</option>
                  </select>
                </div>
              </div>
            </Card>
          </div>
          <div className="payment-right">
            <Card title={'최종 결제금액'}></Card>
            <Card title={'결제방법'}></Card>
            <Card></Card>
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;
