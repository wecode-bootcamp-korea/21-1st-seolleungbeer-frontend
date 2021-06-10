import React from 'react';
import './Goods.scss';

// meterial. : 재질
// size : 크기
// manufacturer : 제조자
// made : 제조국
// distributor : 유통판매원
// afterservice :a/s

export default class GoodsInfo extends React.Component {
  render() {
    return (
      <div className="goods-info">
        <h2>상품정보</h2>
        <table>
          <tr>
            <th>재질</th>
            <td></td>
          </tr>
          <tr>
            <th>크기</th>
            <td></td>
          </tr>
          <tr>
            <th>제조자</th>
            <td></td>
          </tr>
          <tr>
            <th>제조국</th>
            <td></td>
          </tr>
          <tr>
            <th>유통 판매원</th>
            <td></td>
          </tr>
          <tr>
            <th>A/S</th>
            <td></td>
          </tr>
        </table>
      </div>
    );
  }
}
