class CelestialBody {
  constructor({ pos, vel, immovable }) {
    this.pos = pos;
    this.vel = vel;
    this.immovable = immovable;
    this.history = [this.pos];
  }

  update(otherBodies) {
    if (this.immovable) {
      return;
    }

    const { mult, add } = p5.Vector;
    const { pos, vel } = this;

    const acc = this.calcAcc(otherBodies);

    // Update velocity and position using Euler's method
    this.vel = add(vel, mult(acc, dt));
    this.pos = add(pos, mult(vel, dt));

    this.history.push(this.pos);
  }

  calcAcc(otherBodies) {
    const acc = createVector(0, 0);

    // Add together all accelerations to get a final heading
    otherBodies.forEach((other) => acc.add(this.calcGrav(other)));

    return acc;
  }

  calcGrav(other) {
    const { mult } = p5.Vector;
    
    const r = this.pos.dist(other.pos);
    const forceStrength = GM / r ** 2;

    const xDist = other.pos.x - this.pos.x;
    const yDist = other.pos.y - this.pos.y;
    const dir = createVector(xDist, yDist).normalize();
    const force = mult(dir, forceStrength);

    return force;
  }
}