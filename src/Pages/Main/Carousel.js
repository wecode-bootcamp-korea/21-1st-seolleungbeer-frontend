import React from 'react';

import './Carousel.scss';

class Carousel extends React.Component {
  interval;
  state = {
    currentIndex: 0,
    carouselImgList: [],
  };

  carouselMovingIndex = moveIndex => {
    const { currentIndex, carouselImgList } = this.state;
    const lastIndex = carouselImgList.length;
    const checkIndex = moveIndex === undefined ? currentIndex + 1 : moveIndex;

    let seletedIndex;

    if (checkIndex === -1) {
      seletedIndex = lastIndex - 1;
    } else if (checkIndex === lastIndex) {
      seletedIndex = 0;
    } else {
      seletedIndex = checkIndex;
    }

    this.setState({ currentIndex: seletedIndex });
  };

  componentDidMount = () => {
    fetch('/Data/main.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(carouselImgList => {
        this.setState({ carouselImgList }, () => {
          this.interval = setInterval(() => this.carouselMovingIndex(), 7000);
        });
      });
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { currentIndex, carouselImgList } = this.state;

    return (
      <div className="carousel">
        <div className="list">
          {carouselImgList.map((carousel, index) => (
            <div
              key={carousel.id}
              className={index === currentIndex ? 'active' : 'nonActive'}
            >
              {/* <img src={carousel.imgUrl} alt={carousel.imgAlt} /> */}
              <video muted autoPlay src={carousel.imgUrl}></video>
              <button
                className="left"
                type="button"
                onClick={() => this.carouselMovingIndex(index - 1)}
              >
                &#10094;
              </button>
              <button
                className="right"
                type="button"
                onClick={() => this.carouselMovingIndex(index + 1)}
              >
                &#10095;
              </button>
            </div>
          ))}
        </div>

        <div className="list-button">
          {carouselImgList.map((carousel, index) => (
            <span
              key={carousel.id}
              className={index === currentIndex ? 'dot selected' : 'dot'}
              onClick={() => this.carouselMovingIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
