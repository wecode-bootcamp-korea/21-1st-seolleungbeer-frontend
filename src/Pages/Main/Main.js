import React from 'react';
import Carousel from './Carousel';
import './Main.scss';
class Main extends React.Component {
  render() {
    return (
      <div className="main">
        <Carousel />
      </div>
    );
  }
}

export default Main;
