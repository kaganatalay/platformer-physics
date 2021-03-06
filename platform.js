let bodies = [];
let platforms = [];

function TilemapParser(tilemap) {
  let src = tilemap.src;
  let size = tilemap.size;
  for(let i = 0; i < src.length; i++) {
    let counter = 0;
    let origin;
    for(let j = 0; j < src[i].length; j++) {
      if(src[i][j] == 1) {
        if(origin == null) {
          origin = j;
        }
        counter++;

        if(src[i][j+1] != null) {
          if(src[i][j+1] == 0) {
            let platform = new Platform(createVector(origin * size.x + counter * size.x / 2, i * size.y + size.y/2), createVector(counter * size.x, size.y));
            platforms.push(platform);

            origin = null;
            counter = 0;
          }
        } else {
          // Reached the end of array
          let platform = new Platform(createVector(origin * size.x + counter * size.x / 2, i * size.y + size.y/2), createVector(counter * size.x, size.y));
          platforms.push(platform);
        }

        
      } 
    }
  }

}

class Platform {
    constructor(position, size) {
      this.position = position;
      this.size = size;
      this.col = color(random(100, 255), random(100, 255), 0);
    }
  
    render() {
      push();
      rectMode(CENTER);
      noStroke();
      fill(this.col);
      rect(this.position.x, this.position.y, this.size.x, this.size.y);
      pop();
    }
  
    collide(object) {
      if(object.position.y + object.size.y/2 < this.position.y - this.size.y/2 || object.position.y - object.size.y/2 > this.position.y + this.size.y/2 || object.position.x + object.size.x/2 < this.position.x - this.size.x/2 || object.position.x - object.size.x/2 > this.position.x + this.size.x/2) return;
      
      if(object.position.y + object.size.y/2 > this.position.y - this.size.y/2 && object.old_position.y + object.size.y/2 <= this.position.y - this.size.y/2) {
        object.position.y = this.position.y - this.size.y/2 - object.size.y/2;
        object.velocity.y = 0;
        // Jump
      }

      if(object.position.y - object.size.y/2 < this.position.y + this.size.y/2 && object.old_position.y - object.size.y/2 >= this.position.y + this.size.y/2) {
        object.position.y = this.position.y + this.size.y/2 + object.size.y/2;
        object.velocity.y = 0;
      }

      if(object.position.x + object.size.x/2 > this.position.x - this.size.x/2 && object.old_position.x + object.size.x/2 <= this.position.x - this.size.x/2) {
        object.position.x = this.position.x - this.size.x/2 - object.size.x/2;
        object.velocity.x = 0;
      }

      if(object.position.x - object.size.x/2 < this.position.x + this.size.x/2 && object.old_position.x - object.size.x/2 >= this.position.x + this.size.x/2) {
        object.position.x = this.position.x + this.size.x/2 + object.size.x/2;
        object.velocity.x = 0;
      }
    }
  }