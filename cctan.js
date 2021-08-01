var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var frame = 0;
var object_n = 0;
var objects = [];

class Ball {
  constructor(id, x, y, dx, dy) {
    this.objId = id;
    this.type = "ball";
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = 10;
    this.color = "#0095DD";
  }

  ballDist(ball) {
    return Math.sqrt(
      Math.pow(ball.x - this.x, 2) + Math.pow(ball.y - this.y, 2)
    );
  }

  checkBallCollision(obj) {
    let dist = this.ballDist(obj);
    // console.log(dist);
    // if (dist < this.size*2){
    //   this.dx -= obj.dx/2.0;
    //   this.dy -= obj.dy/2.0;
    // }
  }

  checkCollision() {
    for (let i = 0; i < objects.length; i++) {
      let obj = objects[i];
      if (obj.type == "ball" && obj.objId != this.objId) {
        this.checkBallCollision(obj);
      }
    }

    // walls
    if (this.x > canvas.width - this.size || this.x < 0 + this.size) {
      this.dx *= -1;
    }

    if (this.y > canvas.height - this.size || this.y < 0 + this.size) {
      this.dy *= -1;
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

function setup() {
  for (let i = 0; i < 10; i++) {
    let dx = Math.random() * 4 - 2;
    let dy = Math.random() * 4 - 2;
    objects.push(
      new Ball(object_n, Math.random()*canvas.width, Math.random()*canvas.height, dx, dy)
    );
    object_n += 1;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  objects.forEach(function (b) {
    b.checkCollision();
  });

  objects.forEach(async function (b) {
    b.draw();
  });

  frame++;
  // console.log(frame);
  // console.log("---------------");
}

setup();
var interval = setInterval(draw, 10);
