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
  }
}
