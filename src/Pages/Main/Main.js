import React from 'react';

import Carusel from './Carusel';

import './Main.scss';

class Main extends React.Component {
  render() {
    return (
      <div className="Main">
        <Carusel />
      </div>
    );
  }
}

export default Main;
