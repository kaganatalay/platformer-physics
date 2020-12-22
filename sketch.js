let player;
function setup() {
  createCanvas(800, 800);
  rectMode(CENTER);
  player = new Player(width/2, height/2);
  platforms.push(new Platform(createVector(width/2, height * 0.7), createVector(500, 75)));
  
  TilemapParser({
    src: 
    [
      [0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0],
    ],
    
    size: createVector(100, 100)
  });
}

function draw() {
  background(51);
  

  for(let platform of platforms) {
    platform.render();
    for(let body of bodies) {
      platform.collide(body);
    }
  }

  player.start();

  
  
}

 
