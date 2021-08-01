var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var frame = 0;
var object_n = 0;
var objects = [];
var rect = canvas.getBoundingClientRect();
var angle = 0;
var shoot = false;
var icon = new Image();
var icon_zoom = 1;
icon.src = "elephant.png";

document.addEventListener("mousemove", mouseMove);
document.addEventListener("mousedown", mouseDown);
document.addEventListener("mouseup", mouseUp);

function mouseMove(e) {
  let mx = e.clientX - canvas.width / 2 - rect.left;
  let my = e.clientY - canvas.height / 2 - rect.top;
  angle = Math.atan2(my, mx);
}

function mouseDown(e) {
  shoot = true;
}
function mouseUp(e) {
  shoot = false;
}

function setup() {
  // for (let i = 0; i < 10; i++) {
  //   let dx = Math.random() * 4 - 2;
  //   let dy = Math.random() * 4 - 2;
  //   objects.push(
  //     new Ball(
  //       object_n,
  //       20 + Math.random() * canvas.width * 0.8,
  //       20 + Math.random() * canvas.height * 0.8,
  //       dx,
  //       dy,
  //       canvas,
  //       ctx
  //     )
  //   );
  //   object_n += 1;
  // }
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // shoot balls
  if (frame % 5 == 0 && shoot) {
    objects.push(
      new Ball(
        object_n,
        canvas.width / 2,
        canvas.height / 2,
        Math.cos(angle) * 2,
        Math.sin(angle) * 2,
        canvas,
        ctx
      )
    );
    object_n += 1;
  }

  // draw icon
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(angle - Math.PI / 2);
  ctx.drawImage(
    icon,
    (-icon.naturalWidth * icon_zoom) / 2,
    (-icon.naturalHeight * icon_zoom) / 2,
    icon.naturalWidth * icon_zoom,
    icon.naturalHeight * icon_zoom
  );
  ctx.restore();

  objects.forEach(function (b) {
    b.checkCollision();
  });

  objects.forEach(async function (b) {
    b.draw();
  });

  // remove object
  for (let i = 0; i < objects.length; i++) {
    var b = objects[i];
    if (
      b.x < -30 ||
      b.x > canvas.width + 30 ||
      b.y < -30 ||
      b.y > canvas.height + 30
    ) {
      objects[i] = null;
      objects.splice(i, 1);
      i--;
      console.log("remove ball", i);
    }
  }

  // count
  frame++;
  // console.log(frame);
  // console.log("---------------");
}

setup();
var interval = setInterval(render, 10);
