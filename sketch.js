let player;
let canvas;
let resolution;

function setup() {
  createCanvas(displayWidth, displayHeight);
  rectMode(CENTER);

  canvas = createVector(width, height);
  player = new Player(width/2, height/2);
  //platforms.push(new Platform(createVector(width/2, height * 0.7), createVector(500, 75)));
  
  TilemapParser({
    src: 
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 0, 0, 0, 0]
    ],
    
    size: createVector(160, 160)
  });
}

function draw() {
  background(51);
  
  push();
  scale(resolution);
  translate(width/2 - player.position.x, height/2 - player.position.y);
  
  for(let platform of platforms) {
    platform.render();
    for(let body of bodies) {
      platform.collide(body);
    }
  }

  player.start();

  pop();
  
}

 
