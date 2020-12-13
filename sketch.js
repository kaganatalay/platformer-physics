let platforms = [];
let gravity = 0.14;

let x, y;
function setup() {
  createCanvas(600, 400);
  p = new Player();


  platforms.push(new Platform(width / 2, height / 2, width / 2, height / 6, 1));
  platforms.push(new Platform(width / 2, height, width / 1.5, 50));
}

function draw() {
  background(220);
  x = width / 2 - p.pos.x;
  y = height / 2 - p.pos.y;
  push();
  translate(x, y);
  p.start();
  for (let i = 0; i < platforms.length; i++) {
    platforms[i].render();
    platforms[i].collide(p);
  }
  pop();

  push();
  textAlign(CENTER);
  fill(0);
  textSize(20);
  text(p.jumps + " / " + p.max_jumps, 500, 70);

  text(floor(p.pos.x) + " , " + floor(p.pos.y), 100, 70);
  pop();
}

class Player {
  constructor() {
    this.pos = createVector(width / 2, 0);
    this.vel = createVector();
    this.acc = createVector();
    this.w = 30;
    this.h = 30;
    this.def_force = 0.4;
    this.collider = createVector();

    this.jumps = 2;
    this.max_jumps = 2;
  }

  start() {
    this.render();
    this.update();
  }

  render() {
    push();
    rectMode(CENTER);

    fill(255, 0, 0, 50);
    rect(this.collider.x, this.collider.y, this.w, this.h);
    noStroke();
    fill(51);
    rect(this.pos.x, this.pos.y, this.w, this.h);

    pop();
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    if (abs(this.vel.x) > 0.0001) {
      this.vel.x *= 0.9
    }

    this.collider.x = this.pos.x + this.vel.x;
    this.collider.y = this.pos.y + this.vel.y;

    this.applyForce(0, gravity);


    if (keyIsDown(65)) {
      this.applyForce(-this.def_force, 0)
    }

    if (keyIsDown(68)) {
      this.applyForce(this.def_force, 0)
    }

    if (keyIsDown(87)) {
      this.applyForce(0, -this.def_force*2)
    }

    if (keyIsDown(83)) {
      this.applyForce(0, this.def_force*2)
    }


  }

  jump() {
    if (this.jumps > 0) {
      this.jumps--;
      this.vel.y = -4.5
    }
    this.jumping = true;
  }

  applyForce(fx, fy) {
    this.acc.add(createVector(fx, fy));
  }
}

function keyPressed() {
  if (key == " ") {
    p.jump();
  }
}

function mousePressed() {
  let px = mouseX - x;
  let py = mouseY - y;
  platforms.push(new Platform(px, py, 50, 50));
}

class Platform {
  constructor(x, y, w, h, bounciness) {
    this.pos = createVector(x, y);
    this.w = w;
    this.h = h;
    if(bounciness) {
      // 1 < bounciness < 2
      this.bounciness = bounciness;
    } else {
      this.bounciness = 1;
    }
  }

  render() {
    push();
    rectMode(CENTER);
    noStroke();
    fill(100);
    rect(this.pos.x, this.pos.y, this.w, this.h)
    pop();
  }

  collide(object) {
    if (object.collider.x + object.w / 2 >= this.pos.x - this.w / 2 && object.collider.x - object.w / 2 <= this.pos.x + this.w / 2 && object.collider.y + object.h / 2 >= this.pos.y - this.h / 2 && object.collider.y - object.h / 2 <= this.pos.y + this.h / 2) {
      
      // Y Axis
      if (object.pos.y + object.h / 2 <= this.pos.y - this.h/2 + 1) {
        object.applyForce(0, -object.vel.y * this.bounciness - gravity - object.acc.y);
        if (object == p) {
          object.jumps = object.max_jumps;
        }
      }
      
      if (object.pos.y - object.h / 2 >= this.pos.y + this.h/2 - 1) {
        object.applyForce(0, -object.vel.y + gravity - object.acc.y);
      }
      
      // X Axis
      if (object.pos.x + object.h / 2 <= this.pos.x - this.w/2 + 1) {
        object.applyForce(-object.vel.x * 1.5 - object.acc.x * 2, 0);
      }
      
      if (object.pos.x - object.h / 2 >= this.pos.x + this.w/2 - 1) {
        object.applyForce(-object.vel.x * 1.5 - object.acc.x * 2, 0);
      }

    }



  }
}