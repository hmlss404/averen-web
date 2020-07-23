const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const maxradius = 3;
const colorarray = ["#FFFFFF", "#7289DA", "#99AAB5"];

let heightBound = 72;
let maxSpeed = 1.75;
let mouse = {
	x: null,
	y: null,
}

window.addEventListener("load", () => {
	init();
	animation();

	const movementStart = (evt) => {
		mouse.x = evt.x ? evt.pageX : evt.touches ? evt.touches[0].pageX : undefined;
		mouse.y = evt.y ? evt.pageY : evt.touches ? evt.touches[0].pageY : undefined;
	}

	const movementCancel = () => {
		mouse.x = undefined;
		mouse.y = undefined;
	}

	["mousemove", "touchstart", "touchmove"].forEach(evt => window.addEventListener(evt, movementStart, false));
	["mouseup", "mouseout", "touchend", "touchcancel"].forEach(evt => window.addEventListener(evt, movementCancel, false));
});

window.addEventListener("resize", function() {
	init();
});

function getParticleAmount() {
	return Math.floor((innerWidth * innerHeight) * 0.0003);
}

class Circle {
	constructor(x, y, radius, minradius, xspeed, yspeed, color, attractive) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.minradius = minradius;
		this.xspeed = xspeed;
		this.yspeed = yspeed;
		this.color = color;
		this.attractive = attractive;
	}

	draw() {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fill();
	}

	grow() {
		if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50 && this.radius < maxradius) {
			this.radius += 0.25;
		} else if(this.radius > this.minradius) {
			this.radius -= 0.25;
		}
	}

	move() {
		if(this.attractive == true && mouse.x != null) {
			
		} else {
			if(this.x + this.radius > innerWidth || this.x - this.radius < 0) this.xspeed =- this.xspeed;
			if(this.y + this.radius > innerHeight || this.y - this.radius < heightBound) this.yspeed =- this.yspeed;

			this.x += this.xspeed;
			this.y += this.yspeed;
		}

		this.draw();
		this.grow();
	}
}

let particleArray = [];

function init() {
	var scale = window.devicePixelRatio;
	canvas.width = window.innerWidth * scale;
	canvas.height = window.innerHeight * scale;
	ctx.scale(scale, scale);

	var particleNum = getParticleAmount();

	if(particleArray.length < particleNum) {
		for(let i = particleArray.length; i < particleNum; i++) {
			let x = Math.floor(Math.random() * window.innerWidth);
			let y = Math.max(heightBound + 1, Math.floor(Math.random() * window.innerHeight));
			let xspeed = Math.random() * maxSpeed * (Math.random() < 0.5 ? -1 : 1);
			let yspeed = Math.random() * maxSpeed * (Math.random() < 0.5 ? -1 : 1);
			let attractive = Math.random() < 0.2 ? true : false;

			let newcircle = new Circle(x, y, 1.5, 1.1, xspeed, yspeed, colorarray[Math.floor(Math.random() * colorarray.length)], attractive);
			particleArray.push(newcircle);
		}
	} else {
		for(let i = particleArray.length; i > particleNum; i--) {
			particleArray.pop();
		}
	}
}

function animation() {
	requestAnimationFrame(animation);
	ctx.clearRect(0, 0, innerWidth, innerHeight);

	for(let i = 0; i < particleArray.length; i++) {
		particleArray[i].move();
	}
}

const scroll = new SmoothScroll('a[href*="#"]', {
	speed: 500
});