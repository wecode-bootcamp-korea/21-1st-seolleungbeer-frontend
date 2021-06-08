import React from 'react';

import './Carusel.scss';

class Carusel extends React.Component {
  interval;
  state = {
    caruselImgList: [],
  };

  caruselMovingIndex = (e, index, moveIndex = 0) => {
    const { caruselImgList } = this.state;
    const lastIndex = caruselImgList.length;

    index = index
      ? index
      : caruselImgList.findIndex(carusel => carusel.isSelected);

    const seletedIndex =
      index + moveIndex === -1
        ? lastIndex - 1
        : index + moveIndex === lastIndex
        ? 0
        : index + moveIndex;

    this.setState({
      caruselImgList: caruselImgList.map((carusel, index) => {
        index === seletedIndex
          ? (carusel.isSelected = true)
          : (carusel.isSelected = false);
        return carusel;
      }),
    });
  };

  componentDidMount = () => {
    fetch('/Data/main.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(caruselImgList => {
        this.setState({ caruselImgList });
      }, (this.interval = setInterval(e => this.caruselMovingIndex(e, null, 1), 5000)));
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { caruselImgList } = this.state;

    return (
      <div className="Carusel">
        <div className="list">
          {caruselImgList
            ? caruselImgList.map((carusel, index) => (
                <div
                  key={carusel.id}
                  className={carusel.isSelected ? 'active' : 'nonActive'}
                >
                  {/* <img src={carusel.imgUrl} alt={carusel.imgAlt} /> */}
                  <video muted autoPlay src={carusel.imgUrl}></video>
                  <button
                    className="left"
                    type="button"
                    onClick={e => this.caruselMovingIndex(e, index, -1)}
                  >
                    &#10094;
                  </button>
                  <button
                    className="right"
                    type="button"
                    onClick={e => this.caruselMovingIndex(e, index, 1)}
                  >
                    &#10095;
                  </button>
                </div>
              ))
            : ''}
        </div>

        <div className="listButton">
          {caruselImgList
            ? caruselImgList.map((carusel, index) => (
                <span
                  key={carusel.id}
                  className={carusel.isSelected ? 'dot selected' : 'dot'}
                  onClick={e => this.caruselMovingIndex(e, index)}
                ></span>
              ))
            : ''}
        </div>
      </div>
    );
  }
}

export default Carusel;
