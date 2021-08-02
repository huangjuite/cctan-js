class Objc{
    constructor(id, x, y, dx, dy, canvas, ctx) {
        this.objId = id;
        this.type = "brick_c";
        this.x = x;
        this.y = y;
        this.dx = dx; //Approach the center of the circle
        this.dy = dy;
        this.size = 30;
        this.color = "#F00"; //red
        this.canvas = canvas;
        this.ctx = ctx;
        this.count = 30;
    }
    checkBallCollision(ball) {
        let dist = Math.sqrt(Math.pow(ball.x - this.x, 2) + Math.pow(ball.y - this.y, 2));
        if(dist<=ball.size+this.size){
            return true;
        }
        return false;
    }
    checkCenterCollision(){
        let dist = Math.sqrt(Math.pow((canvas.width/2) - this.x, 2) + Math.pow((canvas.height/2) - this.y, 2))
        if (dist<=this.size)
            return true;
        return false;
    }
    draw() {
        this.x -= this.dx;
        this.y -= this.dy;
    
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
}