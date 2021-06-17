import React, { useRef, useEffect } from 'react';
import Beer from './Beer';
import BeerFoam from './BeerFoam';
import Bubble from './Bubble';
import './LoginAnimation.scss';

const beer = [];
const beerFoam = [];
const bubbles = [];

function LoginAnimation({ isAnimated }) {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  let rafId;
  let count = 0;

  useEffect(() => {
    for (let i = 0; i < 1; i++) {
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
    rafId = requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    const canvasContainer = canvasContainerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = canvasContainer.clientWidth;
    canvas.height = canvasContainer.clientHeight;

    beerFoam[0].draw(canvas, ctx);

    for (let i = 0; i < beer.length; i++) {
      beer[i].draw(canvas, ctx);
    }

    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].draw(canvas, ctx);
    }

    count++;
    console.log(count);

    rafId = requestAnimationFrame(animate);

    if (count >= 70) {
      cancelAnimationFrame(rafId);
    }
  };

  if (isAnimated) {
    animate();
  }

  return (
    <div className="canvas-container" ref={canvasContainerRef}>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default LoginAnimation;
