import React from 'react';
import './CategoriesSections.scss';
class GoodsReview extends React.Component {
  render() {
    const { reviewRef } = this.props;

    return (
      <div className="goods-review">
        <div className="review-head" ref={reviewRef}>
          <div>
            <strong>구매평</strong>
            <span>99+</span>
          </div>
          <div>상품을 구매하신 분들이 작성한 리뷰입니다.</div>
          <button className="review-button">구매평 작성</button>
          <button className="review-photo">
            <i className="far fa-image"></i> 포토 구매평만 보기
          </button>
        </div>
        <div className="review-list">등록된 구매평이 없습니다.</div>
      </div>
    );
  }
}

export default GoodsReview;
