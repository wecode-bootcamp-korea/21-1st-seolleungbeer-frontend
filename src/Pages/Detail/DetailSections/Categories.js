import React from 'react';
import GoodsDetail from './CategoriesSections/GoodsDetail';
import GoodsReview from './CategoriesSections/GoodsReview';
import './DetailSection.scss';

class Categories extends React.Component {
  buttonRef = React.createRef();
  detailRef = React.createRef();
  reviewRef = React.createRef();

  focusPage = e => {
    const { name } = e.target;
    this[name].current.scrollIntoView();
  };

  onScroll = e => {
    const scrollTop = e.srcElement.scrollingElement.scrollTop;
    console.log(this.buttonRef, scrollTop);
  };

  componentDidUpdate = () => {
    window.addEventListener('scroll', this.onScroll);
  };

  render() {
    const { goods } = this.props;

    return (
      <div className="categories">
        <div className="categories-title title-fixed">
          <div className="categorie-list seleted" ref={this.buttonRef}>
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
