let mouseX, mouseY;

window.addEventListener("mousemove", e => {
    mouseX = e.pageX;
    mouseY = e.pageY;
    mouse.x = mouseX;
    mouse.y = mouseY;
});

class AutoMouse{
    constructor(canvas, context){
        this.canvas = canvas;
        this.context = context;
        this.x = 100;
        this.y = 100;
        this.xVelocity = 1;
        this.yVelocity = 1;
        this.globalVelocity = 1;
    }

    start(){
        setInterval(()=>{
            let xDirection = Math.random() > 0.5 ? 1 : -1;
            let yDirection = Math.random() > 0.5 ? 1 : -1;
            this.xVelocity = this.globalVelocity * Math.random() * xDirection;
            this.yVelocity = this.globalVelocity * Math.random() * yDirection;
        },10000);

    }

    boundary(){
        this.x > this.canvas.width ? this.x = 0 : null;
        this.y > this.canvas.height ? this.y = 0 : null;
100
        this.x < 0 ? this.x = this.canvas.width : null;
        this.y < 0 ? this.y = this.canvas.height : null;
    }

    move(){
        this.x += this.xVelocity;
        this.y += this.yVelocity;
    }

    draw({context} = this){
        context.save();
        context.beginPath();
        context.strokeStyle = "black";
        context.arc(this.x, this.y, 10, 0, Math.PI*2);
        context.stroke();
        context.restore();
    }

    animate(){
        this.boundary();
        this.move();
        // this.draw();
    }
}

const mouse = new AutoMouse(canvas, context);
mouse.start();
