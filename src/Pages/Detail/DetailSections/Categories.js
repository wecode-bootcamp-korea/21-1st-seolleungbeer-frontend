import React from 'react';

import GoodsDetail from './CategoriesSections/GoodsDetail';
import GoodsReview from './CategoriesSections/GoodsReview';
import './DetailSection.scss';

class Categories extends React.Component {
  render() {
    return (
      <div className="Categories">
        <div className="CategoriesTitle">
          <div className="CategorieList seleted">
            <button>상세정보</button>
          </div>
          <div className="CategorieList">
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
