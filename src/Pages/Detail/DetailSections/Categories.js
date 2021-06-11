import React from 'react';
import GoodsDetail from './CategoriesSections/GoodsDetail';
import GoodsReview from './CategoriesSections/GoodsReview';
import './DetailSection.scss';

class Categories extends React.Component {
  detailRef = React.createRef();
  reviewRef = React.createRef();

  focusPage = e => {
    const { name } = e.target;
    this[name].current.scrollIntoView();
  };

  render() {
    const { goods } = this.props;

    return (
      <div className="categories">
        <div className="categories-title">
          <div className="categorie-list seleted">
            <button name="detailRef" onClick={e => this.focusPage(e)}>
              상세정보
            </button>
          </div>
          <div className="categorie-list">
            <button name="reviewRef" onClick={e => this.focusPage(e)}>
              구매평
            </button>
          </div>
        </div>
        <GoodsDetail goods={goods} detailRef={this.detailRef} />
        <GoodsReview reviewRef={this.reviewRef} />
      </div>
    );
  }
}

export default Categories;
