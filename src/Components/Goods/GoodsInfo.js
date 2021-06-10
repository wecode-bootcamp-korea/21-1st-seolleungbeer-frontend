import React from 'react';
import './Goods.scss';
export default class GoodsInfo extends React.Component {
  render() {
    return (
      <div className="goods-info">
        <h2>상품정보</h2>
        <table>
          <tr>
            <th>품명 및 모델명</th>
            <td>조약돌 화투</td>
          </tr>
          <tr>
            <th>재질</th>
            <td> 플라스틱</td>
          </tr>
          <tr>
            <th>재질</th>
            <td> 플라스틱</td>
          </tr>
          <tr>
            <th>재질</th>
            <td> 플라스틱</td>
          </tr>
          <tr>
            <th>재질</th>
            <td> 플라스틱</td>
          </tr>
        </table>
      </div>
    );
  }
}
