import React from 'react';
import Goods from './DetailSections/Goods';
import Categories from './DetailSections/Categories';
import './Detail.scss';
class Detail extends React.Component {
  state = {
    goods: {},
  };

  render() {
    return (
      <div className="Detail">
        <div className="DetailWrapper">
          <Goods />
          <Categories />
        </div>
      </div>
    );
  }
}

export default Detail;
