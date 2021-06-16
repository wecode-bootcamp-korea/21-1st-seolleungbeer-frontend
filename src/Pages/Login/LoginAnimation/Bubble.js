export default class Bubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = Math.random() * 2 + 1;
    this.radius = Math.random() * 2 + 1;
  }

  draw(canvas, ctx) {
    this.y -= this.speed;

    if (this.y < canvas.height * 0.83) {
      this.y = canvas.height;
    }

    ctx.fillStyle = 'white';
    // ctx.strokeStyle = 'rgba(34,147,214,1)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    // ctx.stroke();
    // // ctx.closePath();
    // // ctx.beginPath();
    // ctx.arc(this.x - 1, this.y - 1, this.radius / 3, 0, Math.PI * 2);
  }
}
