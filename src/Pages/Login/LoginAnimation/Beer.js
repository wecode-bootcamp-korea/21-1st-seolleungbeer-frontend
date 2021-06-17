import MovingPoint from './MovingPoint';
export default class Beer {
  constructor(canvasContainer) {
    this.movingPoints = [];
    this.canvasContainer = canvasContainer;

    for (let i = 0; i <= 5; i++) {
      this.movingPoints.push(
        new MovingPoint(
          this.canvasContainer.clientWidth * i * 0.2,
          this.canvasContainer.clientHeight * 0.8,
          i * 0.5
        )
      );
    }
  }

  draw(canvas, ctx) {
    ctx.beginPath();

    let prevX = this.movingPoints[0].x;
    let prevY = this.movingPoints[0].y;

    ctx.moveTo(prevX, prevY);

    for (let i = 0; i < this.movingPoints.length; i++) {
      this.movingPoints[i].update(canvas, ctx);

      const cx = (prevX + this.movingPoints[i].x) / 2;
      const cy = (prevY + this.movingPoints[i].y) / 2;

      ctx.quadraticCurveTo(prevX, prevY, cx, cy);

      prevX = this.movingPoints[i].x;
      prevY = this.movingPoints[i].y;
    }

    ctx.lineTo(prevX, prevY);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(this.movingPoints[0].x, canvas.height);

    const beerColor = ctx.createLinearGradient(0, 0, canvas.width, 0);
    beerColor.addColorStop(0, '#FFB400');
    beerColor.addColorStop(0.2, '#FFF400');
    beerColor.addColorStop(0.4, '#FFF56E');
    beerColor.addColorStop(0.5, '#FAFAAA');
    beerColor.addColorStop(0.6, '#FAF58C');
    beerColor.addColorStop(0.8, '#FFF064');
    beerColor.addColorStop(1, '#FFB400');

    ctx.fillStyle = beerColor;
    ctx.fill();
    ctx.closePath();
  }
}
