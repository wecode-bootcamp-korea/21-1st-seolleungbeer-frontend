import React from 'react';
import './CategoriesSections.scss';
class GoodsReview extends React.Component {
  render() {
    return (
      <div className="GoodsReview">
        <div className="ReviewHead">
          <div>
            <strong>구매평</strong>
            <span>99+</span>
          </div>
          <div>상품을 구매하신 분들이 작성한 리뷰입니다.</div>
          <button className="ReviewButton">구매평 작성</button>
          <button className="ReviewPhoto">
            <i class="far fa-image"></i> 포토 구매평만 보기
          </button>
        </div>
        <div className="ReviewList">등록된 구매평이 없습니다.</div>
      </div>
    );
  }
}

export default GoodsReview;
