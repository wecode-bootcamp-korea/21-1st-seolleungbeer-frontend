import React from 'react';
import Goods from './DetailSections/Goods';
import Categories from './DetailSections/Categories';
import './Detail.scss';
class Detail extends React.Component {
  state = {
    goods: {},
  };

  componentDidMount = () => {
    fetch('/Data/detail.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(goods =>
        this.setState({
          goods,
        })
      );
  };

  render() {
    const { goods } = this.state;

    return (
      <div className="detail">
        <div className="detail-wrapper">
          <Goods goods={goods} />
          <Categories goods={goods} />
        </div>
      </div>
    );
  }
}

export default Detail;
