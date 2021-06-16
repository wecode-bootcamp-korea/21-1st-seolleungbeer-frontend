import React, { useRef, useEffect } from 'react';

import './LoginAnimation.scss';
import MovingPoint from './MovingPoint';
import Beer from './Beer';
import BeerFoam from './BeerFoam';
import Bubble from './Bubble';

// const circleArr = [];
// const movingPoints = [];
const beer = [];
const beerFoam = [];
const bubbles = [];

function LoginAnimation({ isAnimated }) {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  let rafId;
  let count = 0;

  useEffect(() => {
    // for (let i = 0; i <= 5; i++) {
    //   movingPoints.push(
    //     new MovingPoint(
    //       canvasContainerRef.current.clientWidth * i * 0.2,
    //       canvasContainerRef.current.clientHeight * 0.8,
    //       i * 0.5
    //     )
    //   );
    // }
    for (let i = 0; i < 5; i++) {
      beer[i] = new Beer(
        canvasContainerRef.current,
        canvasRef.current.getContext('2d')
      );
    }

    for (let i = 0; i < 1; i++) {
      beerFoam[i] = new BeerFoam(
        canvasContainerRef.current,
        canvasRef.current.getContext('2d')
      );
    }

    for (let i = 0; i < 20; i++) {
      bubbles[i] = new Bubble(
        canvasContainerRef.current.clientWidth * Math.random(),
        canvasContainerRef.current.clientHeight
      );
    }
    animate();
    // console.log(movingPoints);
  }, []);

  const animate = () => {
    const canvasContainer = canvasContainerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = canvasContainer.clientWidth;
    canvas.height = canvasContainer.clientHeight;

    // console.log(canvas);

    // console.log(beer);

    beerFoam[0].draw(canvas, ctx);

    for (let i = 0; i < beer.length; i++) {
      beer[i].draw(canvas, ctx);
    }

    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].draw(canvas, ctx);
    }

    requestAnimationFrame(animate);
  };

  // if (isAnimated) {
  //   animate();
  // }

  return (
    <div className="canvas-container" ref={canvasContainerRef}>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default LoginAnimation;
