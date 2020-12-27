let player;
let canvas;
let resolution;

function setup() {
  let c = createCanvas(displayWidth, displayHeight);
  c.position(0, 0);
  rectMode(CENTER);

  resolution = height / 1080
  canvas = createVector(width/resolution, height/resolution);
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
  translate(canvas.x/2 - player.position.x, canvas.y/2 - player.position.y);
  
  for(let platform of platforms) {
    platform.render();
    for(let body of bodies) {
      platform.collide(body);
    }
  }

  player.start();

  pop();
  
}

 
