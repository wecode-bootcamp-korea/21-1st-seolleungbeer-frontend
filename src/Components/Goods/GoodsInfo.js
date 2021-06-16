import React from 'react';
import './Goods.scss';

export default class GoodsInfo extends React.Component {
  render() {
    const { info } = this.props;

    return (
      <div className="goods-info">
        <h2>상품정보</h2>
        {info && (
          <table>
            <tbody>
              <tr>
                <th>재질</th>
                <td>{info.meterial}</td>
              </tr>
              <tr>
                <th>크기</th>
                <td>{info.size}</td>
              </tr>
              <tr>
                <th>제조자</th>
                <td>{info.manufacturer}</td>
              </tr>
              <tr>
                <th>제조국</th>
                <td>{info.made}</td>
              </tr>
              <tr>
                <th>유통 판매원</th>
                <td>{info.distributor}</td>
              </tr>
              <tr>
                <th>A/S</th>
                <td>{info.afterservice}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
