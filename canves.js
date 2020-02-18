const canves = document.querySelector("canvas");
canves.width = window.innerWidth;
canves.height = window.innerHeight;

var c = canves.getContext("2d");


// change color of rectangle

// c.fillStyle = 'rgba(255, 0, 1, 0.4)';

// rectagle

// c.fillRect(100, 100, 100, 100);
// c.fillRect(200, 350, 100, 100);
// c.fillRect(400, 500, 100, 100);
// c.fillRect(600, 200, 100, 100);
// console.log(canves)

// line

// c.beginPath();
// // moveTo(x: number, y: number)
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = '#fff';
// c.stroke();


// arc/circle

// for (let i = 0; i < 10; i++) {
//     const x = Math.random() * window.innerWidth;
//     const y = Math.random() * window.innerHeight;
//     c.beginPath();
//     // arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise ?: boolean)
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = "blue";
//     c.stroke();
// }
var mouse = {
    x: undefined,
    y: undefined
}


var minRadius = 10;
var maxRadius = 40;

var colorArray = ['#8C0B3B', '#9538F2', '#271273', '#0FF25E', '#F23C13'];

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', function () {
    canves.width = window.innerWidth;
    canves.height = window.innerHeight;

    init();
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = minRadius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];


    this.draw = function () {

        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function () {
        if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > window.innerHeight || this.y - radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x - this.x < 50
            && mouse.x - this.x > -50
            && mouse.y - this.y < 50
            && mouse.y - this.y > -50
        ) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }

        }
        else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
        this.draw();
    }

}

var circlesArray = [];

function init() {

    circlesArray = [];

    for (var i = 0; i < 500; i++) {
        var x = Math.random() * (innerWidth - 2 * radius) + radius;
        var y = Math.random() * (innerHeight - 2 * radius) + radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        var radius = Math.random() * 3 + 3;
        circlesArray.push(new Circle(x, y, dx, dy, radius))
    }
}

function animate() {

    c.clearRect(0, 0, innerWidth, innerHeight);
    requestAnimationFrame(animate);

    for (var i = 0; i < circlesArray.length; i++) {
        circlesArray[i].update();
    }



}
init();
animate();