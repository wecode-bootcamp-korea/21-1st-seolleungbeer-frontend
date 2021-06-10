import React from 'react';

import GoodsDetail from './CategoriesSections/GoodsDetail';
import GoodsReview from './CategoriesSections/GoodsReview';
import './DetailSection.scss';

class Categories extends React.Component {
  render() {
    return (
      <div className="categories">
        <div className="categories-title">
          <div className="categorie-list seleted">
            <button>상세정보</button>
          </div>
          <div className="categorie-list">
            <button>구매평</button>
          </div>
        </div>
        <GoodsDetail />
        <GoodsReview />
      </div>
    );
  }
}

export default Categories;
