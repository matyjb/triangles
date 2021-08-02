var canvasElem
var HEIGHT
var WIDTH
var ctx
var points
const SPEED_MULTIPLIER = 0.7
const POINTS_COUNT = 100
window.onload=setup

function randomInt(a, b) {
  return Math.floor((Math.random() * b) + a);
}

function drawPoint(point){
  ctx.beginPath();
  ctx.arc(point[0], point[1],0.5,0,2*Math.PI);
  ctx.fillStyle = 'black';
  ctx.fill()
  ctx.stroke()
}

function movePoints() {
  points.forEach(point => {
    point[0] += point[2]*SPEED_MULTIPLIER
    point[1] += point[3]*SPEED_MULTIPLIER
    if(point[0] < 0) point[0] += WIDTH;
    else if(point[0] > WIDTH) point[0] -= WIDTH;
    if(point[1] < 0) point[1] += HEIGHT;
    else if(point[1] > HEIGHT) point[1] -= HEIGHT;

  });
}

function distance(p1, p2) {
  x = Math.abs(p1[0]-p2[0]);
  y = Math.abs(p1[1]-p2[1]);
  d = Math.sqrt(x*x+y*y)
  return d
}

function setup() {
  canvasElem = document.getElementById('can');
  ctx = canvasElem.getContext('2d');
  WIDTH = canvasElem.width = window.innerWidth;
  HEIGHT = canvasElem.height = window.innerHeight;
  points = []

  for (let i = 0; i < POINTS_COUNT; i++) {
    var point = [randomInt(0, WIDTH), randomInt(0, HEIGHT), Math.random()*2-1, Math.random()*2-1];
    points.push(point)
  }
  // console.log(points)

  setInterval(draw, 10);
}

function draw() {
  WIDTH = canvasElem.width = window.innerWidth;
  HEIGHT = canvasElem.height = window.innerHeight;
  ctx.clearRect(0,0,WIDTH, HEIGHT);
  points.forEach(point => {
    drawPoint(point)
  });
  for (let i = 0; i < points.length; i++) {
    const p1 = points[i];
    for (let j = i+1; j < points.length; j++) {
      const p2 = points[j];
      const d = distance(p1,p2);
      if(d < 20) {
        ctx.strokeStyle = "black"
        ctx.beginPath();
        ctx.moveTo(p1[0],p1[1])
        ctx.lineTo(p2[0],p2[1])
        ctx.stroke()
        // console.log(d)
      }else if (d < 100) {
        const a = 1-(d-20)/90.0
        // console.log(a)
        ctx.strokeStyle = "rgba(0,0,0," + a + ")";
        ctx.beginPath();
        ctx.moveTo(p1[0],p1[1])
        ctx.lineTo(p2[0],p2[1])
        ctx.stroke()
      }
    }
  }
  movePoints();
}