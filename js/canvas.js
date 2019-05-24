"use strict";

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");




//setting size of canvas

var width = window.innerWidth;
var height = window.innerHeight;

canvas.width = width;
canvas.height = height;


//resizes canvas on window resize
var onresize = function(e) {

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;
}
window.addEventListener("resize", onresize);

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 100;
var minRadius = 2;

window.addEventListener("mousemove", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

var randomColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
var randomColor2 = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
var randomColor3 = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
var randomColor4 = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
var randomColor5 = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
var randomColor6 = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
var colorArray = [randomColor, randomColor2, randomColor3, randomColor4, randomColor5, randomColor6];

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();

    }
    this.update = function() {
        if (this.x + this.radius > width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.x - this.x < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
        ctx.globalAlpha = 0.9;
        this.draw();
    }

}

var circleArray = [];

for (var i = 0; i < 100; i++) {
    var radius = Math.random() * 50 + 1;
    var x = Math.random() * (width - radius * 2) + radius;
    var y = Math.random() * (height - radius * 2) + radius;
    var dx = (Math.random() - .5) * 2;
    var dy = (Math.random() - .5) * 2;
    circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, width, height);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}
animate();