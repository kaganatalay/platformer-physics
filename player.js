class Player extends Rigidbody {
    constructor(x, y) {
      super(createVector(x, y), createVector(50, 50), true);

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
 