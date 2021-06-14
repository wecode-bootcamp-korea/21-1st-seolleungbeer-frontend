export default class MovingPoint {
  constructor(x, y, radian) {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.radian = radian;
  }

  update(canvas, ctx) {
    this.radian += 0.05;
    this.y += Math.sin(this.radian) * 0.7;
    // this.draw(canvas, ctx);
  }

  // draw(canvas, ctx) {
  //   // console.log(canvas, ctx);
  //   // ctx.fillStyle = 'white';
  //   // ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   ctx.fillStyle = 'red';
  //   ctx.beginPath();
  //   ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  //   ctx.fill();
  // }
}
