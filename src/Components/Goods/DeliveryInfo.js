import React from 'react';
import './Goods.scss';
export default class DeliveryInfo extends React.Component {
  render() {
    return (
      <div className="delivery-info">
        <h2>배송안내</h2>
        <table>
          <tbody>
            <tr>
              <td colSpan="2">전국택배배송 | CJ대한통운</td>
            </tr>
            <tr>
              <td>
                <strong>배송비</strong>
              </td>
              <td>
                회원 가입하면 상시 무료배송!
                <br />
                미가입 시 건당 3,000원
              </td>
            </tr>
            <tr>
              <td>
                <strong>배송기간</strong>
              </td>
              <td>공휴일/일요일을 제외하고 결제일 기준 2-3일 소요</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
