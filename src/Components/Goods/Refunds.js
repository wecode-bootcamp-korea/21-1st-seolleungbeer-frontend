import React from 'react';
import './Goods.scss';
export default class Refunds extends React.Component {
  render() {
    return (
      <div className="Refunds">
        <h2>교환 및 환불 안내</h2>
        <ul>
          <li>
            제주맥주에서 구매하신 제품은 받으셨을 때와 동일한 상태로, 구매 후
            7일 이내 교환/환불이 가능합니다.
          </li>
          <li>
            단순 변심으로 인한 교환 시 왕복 배송비 6천원, 환불 시 3천원을
            청구합니다.
          </li>
          <li>오배송, 불량으로 인한 교환/환불 시 배송비 무료입니다.</li>
          <li>
            제품 배송 이후 환불 요청 시에는 제품 회수 후에 환불이 완료됩니다.
          </li>
          <li>자세한 사항은 고객센터 혹은 문의 게시판에 문의해주세요.</li>
        </ul>
      </div>
    );
  }
}
