let platforms = [];
let gravity = 0.14;

let x, y, p;
let parser;
let level1;

function setup() {
  createCanvas(800, 800);
  p = new Player();

  parser = new LevelParser();
  parser.generate(level1.source);

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

function preload() {
  level1 = loadJSON("level.json");


}

class LevelParser {
  constructor() {
    this.origin = createVector(0, 0);
    this.cell_size = createVector(150, 150);
  }

  generate(source) {
    let location = this.origin.copy();
    for(let i = 0; i < source.length; i++) {
      location.x = this.origin.x;
      location.y += this.cell_size.y;

      for(let j = 0; j < source[i].length; j++) {
        location.x += this.cell_size.x;
        if(source[i][j] == 1) {
          platforms.push(new Platform(location.x - this.cell_size.x/2, location.y - this.cell_size.y/2, this.cell_size.x, this.cell_size.y));
        }
        
        
      } 
    }

    console.log(source);
  }
}

class Player {
  constructor() {
    this.pos = createVector(0, 0);
    this.vel = createVector();
    this.acc = createVector();
    this.collider = createVector();
    this.w = 30;
    this.h = 30;
    this.def_force = 0.4;
    
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

}

function mousePressed() {

}

class Platform {
  constructor(x, y, w, h) {
    this.pos = createVector(x, y);
    this.w = w;
    this.h = h;
  }

  render() {
    push();
    
    pop();
  }
}