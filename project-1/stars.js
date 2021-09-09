//code adapted from https://editor.p5js.org/abbychen02/sketches/js0ww88Ih

// All the paths
var paths = [];
// Are we painting?
var painting = false;
// How long until the next circle
var next = 0;
// Where are we now and where were we?
var current;
var previous;

function setup() {
  createCanvas(windowWidth, windowHeight);
  current = createVector(0, 0);
  previous = createVector(0, 0);
}

function draw() {
  clear();

  if (millis() > next && painting) {
    current.x = mouseX;
    current.y = mouseY;

    var force = p5.Vector.sub(current, previous);
    force.mult(0.05);

    paths[paths.length - 1].add(current, force);

    next = millis() + random(100);

    previous.x = current.x;
    previous.y = current.y;
  }

  for (var i = 0; i < paths.length; i++) {
    paths[i].update();
    paths[i].display();
  }
}

function mousePressed() {
  next = 0;
  painting = true;
  previous.x = mouseX;
  previous.y = mouseY;
  paths.push(new Path());
}

function mouseReleased() {
  painting = false;
}

function Path() {
  this.particles = [];
  this.hue = random(50);
}

Path.prototype.add = function (position, force) {
  this.particles.push(new Particle(position, force, this.hue));
};

Path.prototype.update = function () {
  for (var i = 0; i < this.particles.length; i++) {
    this.particles[i].update();
  }
};

Path.prototype.display = function () {
  for (var i = this.particles.length - 1; i >= 0; i--) {
    if (this.particles[i].lifespan <= 0) {
      this.particles.splice(i, 1);
    } else {
      this.particles[i].display(this.particles[i + 1]);
    }
  }
};

function Particle(position, force, hue) {
  this.position = createVector(position.x, position.y);
  this.velocity = createVector(force.x, force.y);
  this.drag = 0.95;
  this.lifespan = 255;
  this.size = 5;
}

Particle.prototype.update = function () {
  this.position.add(this.velocity);
  this.velocity.mult(this.drag);
  this.lifespan = this.lifespan - 2;
  this.size = this.size + 0.05;
};

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

Particle.prototype.display = function (other) {
  noStroke();
  fill(255, this.lifespan * 2);
  star(this.position.x, this.position.y - this.size * 20, 8, 4, 5);
};
