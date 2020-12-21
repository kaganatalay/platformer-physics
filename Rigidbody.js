class Rigidbody {
    constructor(position, size, collide) {
      this.position = position;

      this.collide = collide;
      if(this.collide) {
        bodies.push(this);
      }

      this.old_position = createVector();
      this.velocity = createVector();
      this.acceleration = createVector();
      this.size = size;
      this.force = 0.15;
      this.friction = 0.985;
    }
    
    physics_update() {
      this.old_position = this.position.copy();
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
  
      this.velocity.mult(this.friction);
    }
    
    moveTo(position, force) {
      let destination = position.copy();
      destination.sub(this.position);
      destination.setMag(force);
      this.applyForce(destination.x, destination.y);
    }
     
    repel(other, max_force, range) {
      let effect_area;
      if(range) {
          effect_area = range;
      } else {
          effect_area = this.size.x / 2 + other.size.x / 2;
      }

      if(other != this) {
         let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
         if(distance < effect_area) {
            let force = map(distance, 0, effect_area, max_force, 0);
            this.moveTo(other.position, -force);
         }
         
      }
    }
    
    
    applyForce(fx, fy) {
      let force = createVector(fx, fy);
      this.acceleration.add(force);
    }
  }
  