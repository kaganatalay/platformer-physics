class Player extends Rigidbody {
    constructor(x, y) {
      super(createVector(x, y), createVector(30, 30), true);

    }
  
    start() {
      this.render();
      this.update();
      this.physics_update();
    }
  
    render() {
      push();
      fill(255);
      rect(this.position.x, this.position.y, this.size.x, this.size.y);
      pop();
    }
  
    update() {
      if(keyIsDown(65)) {
        this.applyForce(-this.force, 0);
      }
  
      if(keyIsDown(68)) {
        this.applyForce(this.force, 0);
      }
  
      if(keyIsDown(87)) {
        this.applyForce(0, -this.force);
      }
  
      if(keyIsDown(83)) {
        this.applyForce(0, this.force);
      }
    }
}

class Npc extends Rigidbody {
  constructor(x, y) {
    super(createVector(x, y), createVector(40, 40), true);

  }

  start() {
    this.render();
    this.update();
    this.physics_update();
  }

  render() {
    push();
    fill(255, 150, 0);
    rect(this.position.x, this.position.y, this.size.x, this.size.y);
    pop();
  }

  update() {
    this.applyForce(0, 0.1);
  }
}