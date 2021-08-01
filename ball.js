class Ball {
  constructor(id, x, y, dx, dy, canvas, ctx) {
    this.objId = id;
    this.type = "ball";
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = 10;
    this.color = "#FFF";
    this.canvas = canvas;
    this.ctx = ctx;
  }

  ballDist(ball) {
    return Math.sqrt(
      Math.pow(ball.x - this.x, 2) + Math.pow(ball.y - this.y, 2)
    );
  }

  checkBallCollision(obj) {
    let dist = this.ballDist(obj);
  }

  checkCollision() {
    // for (let i = 0; i < objects.length; i++) {
    //   let obj = objects[i];
    //   if (obj.type == "ball" && obj.objId != this.objId) {
    //     this.checkBallCollision(obj);
    //   }
    // }

    // walls
    if (this.x > canvas.width - this.size || this.x < 0 + this.size) {
      this.dx *= -1;
      this.x += this.dx;
    }

    if (this.y < 0 + this.size) {
      this.dy *= -1;
      this.y += this.dy;
    }
  }

  draw() {
    this.x += this.dx;
    this.y += this.dy;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();

    
  }
}
