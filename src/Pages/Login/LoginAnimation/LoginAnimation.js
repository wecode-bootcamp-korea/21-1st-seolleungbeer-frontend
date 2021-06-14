import React, { useRef, useEffect } from 'react';

import './LoginAnimation.scss';
import MovingPoint from './MovingPoint';
import Beer from './Beer';

// const circleArr = [];
// const movingPoints = [];
const beer = [];

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
    for (let i = 0; i < 1; i++) {
      beer[i] = new Beer(
        canvasContainerRef.current,
        canvasRef.current.getContext('2d')
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

    beer[0].draw(canvas, ctx);

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
