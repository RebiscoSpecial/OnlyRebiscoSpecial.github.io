//   https://codepen.io/Mahi-K/full/wvqYLEL  //
var c = document.getElementById("c");
var ctx = c.getContext("2d");
var cw = (c.width = window.innerWidth);
var ch = (c.height = window.innerHeight);
var cx = cw / 2,
	cy = ch / 2;
var rad = Math.PI / 180;
var A = 360 / 5;
var R = 150;
var delta = 20;
var howMany = 50;

var flowersRy = [];
var colors = [
	"hsl(2,70%,90%)",
	"hsl(2,80%,90%)",
	"hsl(2,90%,90%)",
	"hsl(2,100%,90%)",
	"hsl(2,70%,85%)",
	"hsl(2,80%,85%)",
	"hsl(2,90%,85%)",
	"hsl(2,100%,85%)",
	"hsl(2,70%,95%)",
	"hsl(2,80%,95%)",
	"hsl(2,90%,95%)",
	"hsl(2,100%,95%)",
	"hsl(2,100%,100%)"
];

function flower() {
	var maxW = cw > 1200 ? 1250 : cw;
	this.pm = Math.random() < 0.5 ? -1 : 1;
	this.cx = ~~(Math.random() * maxW) + 1;
	this.cy = ~~((Math.random() * ch) / 2) + 1;
	this.R = randomIntFromInterval(20, 50);
	this.color = colors[~~(Math.random() * colors.length)];
	this.delta = ~~(Math.random() * 90) + 1;
	this.pm = Math.random() < 0.5 ? -1 : 1;
	this.speedX = 2 + Math.random();
	this.speedY = 1.01 + Math.random() / 50;
	this.drift = this.pm + this.speedX;
	this.fall = this.speedY;
}

function init() {
	for (var i = 0; i < howMany; i++) {
		createFlower();
	}
	requestId = window.requestAnimationFrame(updateFlowers);
}

function updateFlowers() {
	ctx.clearRect(0, 0, cw, ch);

	for (var i = 0; i < flowersRy.length; i++) {
		if (i % 2 == 0 || i % 3 == 0 || flowersRy[i].cy > 200 || cx < 100) {
			flowersRy[i].cx += flowersRy[i].drift;
			flowersRy[i].cy *= flowersRy[i].fall;
			flowersRy[i].delta += 1;
		} else {
			var pm = Math.random() < 0.5 ? -1 : 1;
			flowersRy[i].cx += pm / 5;
			//flowersRy[i].cy += pm/10;
			flowersRy[i].delta += pm / 10;
		}
		drawFlower(
			flowersRy[i].cx,
			flowersRy[i].cy,
			flowersRy[i].R,
			flowersRy[i].color,
			flowersRy[i].delta
		);
	}

	requestId = window.requestAnimationFrame(updateFlowers);
}

function createFlower() {
	var l = flowersRy.length;
	flowersRy[l] = new flower();
	drawFlower(
		flowersRy[l].cx,
		flowersRy[l].cy,
		flowersRy[l].R,
		flowersRy[l].color,
		flowersRy[l].delta
	);
}

function drawFlower(cx, cy, R, color, delta) {
	ctx.fillStyle = color;
	var R1 = R * 1.3;
	for (var a = 0; a < 5; a++) {
		drawPetal(cx, cy, a, R, R1, color, delta);
		drawAnthers(cx, cy, a, R, R1, delta);
	}
}

function drawAnthers(cx, cy, a, R, R1, delta) {
	ctx.save();
	ctx.strokeStyle = "#fff";
	ctx.shadowBlur = 5;
	ctx.shadowOffsetX = 1;
	ctx.shadowOffsetY = 1;
	ctx.shadowColor = "#333";

	var ax0 = cx + (R / 3) * Math.cos((a * A + (2 * A) / 6 + delta) * rad);
	var ay0 = cy + (R / 3) * Math.sin((a * A + (2 * A) / 6 + delta) * rad);
	var ax1 = cx + (R / 2) * Math.cos((a * A + (3 * A) / 6 + delta) * rad);
	var ay1 = cy + (R / 2) * Math.sin((a * A + (3 * A) / 6 + delta) * rad);
	var ax2 = cx + (R / 3) * Math.cos((a * A + (4 * A) / 6 + delta) * rad);
	var ay2 = cy + (R / 3) * Math.sin((a * A + (4 * A) / 6 + delta) * rad);

	if (R > 40) {
		var ary = [
			{
				x: ax0,
				y: ay0
			},
			{
				x: ax1,
				y: ay1
			},
			{
				x: ax2,
				y: ay2
			}
		];
	} else {
		var ary = [
			{
				x: ax1,
				y: ay1
			}
		];
	}

	ctx.beginPath();
	for (var i = 0; i < ary.length; i++) {
		ctx.moveTo(cx, cy);
		ctx.lineTo(ary[i].x, ary[i].y);
		ctx.arc(ary[i].x, ary[i].y, 2, 0, 2 * Math.PI);
	}
	ctx.stroke();
	ctx.restore();
}

function drawPetal(cx, cy, a, R, R1, color, delta) {
	ctx.strokeStyle = "#d9d9d9";
	ctx.fillStyle = color;

	var x0 = cx + R * Math.cos((a * A + delta) * rad);
	var y0 = cy + R * Math.sin((a * A + delta) * rad);

	var x1 = cx + R1 * Math.cos((a * A + (2 * A) / 6 + delta) * rad);
	var y1 = cy + R1 * Math.sin((a * A + (2 * A) / 6 + delta) * rad);

	var x2 = cx + R * Math.cos((a * A + (3 * A) / 6 + delta) * rad);
	var y2 = cy + R * Math.sin((a * A + (3 * A) / 6 + delta) * rad);

	var x3 = cx + R1 * Math.cos((a * A + (4 * A) / 6 + delta) * rad);
	var y3 = cy + R1 * Math.sin((a * A + (4 * A) / 6 + delta) * rad);

	var x4 = cx + R * Math.cos((a * A + A + delta) * rad);
	var y4 = cy + R * Math.sin((a * A + A + delta) * rad);

	ctx.beginPath();
	ctx.moveTo(cx, cy);
	ctx.quadraticCurveTo(x0, y0, x1, y1);
	ctx.lineTo(x2, y2);
	ctx.lineTo(x3, y3);
	ctx.quadraticCurveTo(x4, y4, cx, cy);
	ctx.fill();
	ctx.stroke();
}

function randomIntFromInterval(mn, mx) {
	return ~~(Math.random() * (mx - mn + 1) + mn);
}

window.addEventListener("load", init, false);