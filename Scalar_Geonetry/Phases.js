let stage = 0;
let progress = 0;
const transitionSpeed = 0.01; // Slowed for visibility
const radius = 100;

function setup() {
  createCanvas(600, 600);
  background(20); // Dark background
  frameRate(30);
}

function draw() {
  background(20); // Refresh background
  translate(width / 2, height / 2); // Center canvas

  // Progress the stage
  progress += transitionSpeed;
  if (progress >= 1) {
    progress = 0;
    stage = (stage + 1) % 7; // 0 to 6 stages
  }

  console.log(`Stage: ${stage}, Progress: ${progress.toFixed(2)}`); // Debug log

  // Draw based on stage and progress
  switch (stage) {
    case 0: // 0D to 1D
      draw0D1D(progress);
      break;
    case 1: // 1D to 2D
      draw1D2D(progress);
      break;
    case 2: // 2D to 3D
      draw2D3D(progress);
      break;
    case 3: // 3D to 4D
      draw3D4D(progress);
      break;
    case 4: // 4D to 5D
      draw4D5D(progress);
      break;
    case 5: // 5D to 6D
      draw5D6D(progress);
      break;
    case 6: // 6D to 0D (loop back)
      draw6D0D(progress);
      break;
  }

  // Labels
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(20);
  text(`Stage: ${['0D', '1D', '2D', '3D', '4D', '5D', '6D'][stage]}`, 0, -250);
}

function draw0D1D(p) {
  // 0D: Yellow dot fading out, centered and larger
  fill(255, 255, 0, 255 * (1 - p)); // Fade out
  noStroke();
  ellipse(0, 0, 20 * (1 - p)); // Larger, centered

  // 1D: White cross fading in
  stroke(255, 255 * p); // Fade in
  strokeWeight(2);
  let crossSize = radius * p;
  if (crossSize > 0) {
    line(-crossSize, 0, crossSize, 0);
    line(0, -crossSize, 0, crossSize);
  }
}

function draw1D2D(p) {
  // 1D: White cross fading out
  stroke(255, 255 * (1 - p)); // Fade out
  strokeWeight(2);
  let crossSize = radius;
  if (crossSize > 0) {
    line(-crossSize, 0, crossSize, 0);
    line(0, -crossSize, 0, crossSize);
  }

  // 2D: Gray circle fading in, centered
  noFill();
  stroke(150, 150 * p); // Fade in
  strokeWeight(2);
  let circleSize = radius * 2 * p; // Scale with progress
  if (!isNaN(circleSize) && circleSize > 0) {
    ellipse(0, 0, circleSize);
  }
}

function draw2D3D(p) {
  // 2D: Fading circle
  noFill();
  stroke(150, 150 * (1 - p));
  strokeWeight(2);
  ellipse(0, 0, radius * 2);

  // 3D: Green wireframe sphere
  push();
  rotateY(frameCount * 0.01);
  stroke(0, 255, 0, 255 * p);
  strokeWeight(1);
  for (let i = 0; i < 10; i++) {
    let phi = map(i, 0, 10, 0, PI);
    for (let j = 0; j < 10; j++) {
      let theta = map(j, 0, 10, 0, TWO_PI);
      let x = radius * sin(phi) * cos(theta) * p;
      let y = radius * sin(phi) * sin(theta) * p;
      let z = radius * cos(phi) * p;
      point(x, y, z);
    }
  }
  pop();
}

// Remaining functions unchanged (draw3D4D, draw4D5D, draw5D6D, draw6D0D, pentagram)

function draw3D4D(p) {
  // 3D: Fading sphere
  push();
  rotateY(frameCount * 0.01);
  stroke(0, 255, 0, 255 * (1 - p));
  strokeWeight(1);
  for (let i = 0; i < 10; i++) {
    let phi = map(i, 0, 10, 0, PI);
    for (let j = 0; j < 10; j++) {
      let theta = map(j, 0, 10, 0, TWO_PI);
      let x = radius * sin(phi) * cos(theta);
      let y = radius * sin(phi) * sin(theta);
      let z = radius * cos(phi);
      point(x * (1 - p), y * (1 - p), z * (1 - p));
    }
  }
  pop();

  // 4D: Pink torus (counter-spinning)
  push();
  rotateZ(frameCount * 0.01 * p);
  stroke(255, 105, 180);
  strokeWeight(2);
  let r1 = radius * 0.5;
  let r2 = radius * 0.2;
  for (let i = 0; i < 20; i++) {
    let theta = map(i, 0, 20, 0, TWO_PI) * p;
    for (let j = 0; j < 20; j++) {
      let phi = map(j, 0, 20, 0, TWO_PI);
      let x = (r1 + r2 * cos(phi)) * cos(theta);
      let y = (r1 + r2 * cos(phi)) * sin(theta);
      let z = r2 * sin(phi);
      point(x, y, z);
    }
  }
  pop();
}

function draw4D5D(p) {
  // 4D: Fading torus
  push();
  rotateZ(frameCount * 0.01 * (1 - p));
  stroke(255, 105, 180, 255 * (1 - p));
  strokeWeight(2);
  let r1 = radius * 0.5;
  let r2 = radius * 0.2;
  for (let i = 0; i < 20; i++) {
    let theta = map(i, 0, 20, 0, TWO_PI);
    for (let j = 0; j < 20; j++) {
      let phi = map(j, 0, 20, 0, TWO_PI);
      let x = (r1 + r2 * cos(phi)) * cos(theta);
      let y = (r1 + r2 * cos(phi)) * sin(theta);
      let z = r2 * sin(phi);
      point(x * (1 - p), y * (1 - p), z * (1 - p));
    }
  }
  pop();

  // 5D: Multicolored star
  push();
  rotateZ(frameCount * 0.01 * p);
  strokeWeight(2);
  for (let i = 0; i < 5; i++) {
    let angle = TWO_PI * i / 5;
    stroke(lerpColor(color(255, 0, 0), color(0, 255, 0), i / 5));
    line(0, 0, radius * cos(angle) * p, radius * sin(angle) * p);
    stroke(lerpColor(color(0, 255, 0), color(255, 255, 0), i / 5));
    line(0, 0, -radius * cos(angle) * p, -radius * sin(angle) * p);
  }
  fill(0, 0, 255, 100 * p);
  noStroke();
  pentagram(0, 0, radius * 0.3 * p);
  pop();
}

function draw5D6D(p) {
  // 5D: Fading star
  push();
  rotateZ(frameCount * 0.01 * (1 - p));
  strokeWeight(2);
  for (let i = 0; i < 5; i++) {
    let angle = TWO_PI * i / 5;
    stroke(lerpColor(color(255, 0, 0), color(0, 255, 0), i / 5), 255 * (1 - p));
    line(0, 0, radius * cos(angle), radius * sin(angle));
    stroke(lerpColor(color(0, 255, 0), color(255, 255, 0), i / 5), 255 * (1 - p));
    line(0, 0, -radius * cos(angle), -radius * sin(angle));
  }
  fill(0, 0, 255, 100 * (1 - p));
  noStroke();
  pentagram(0, 0, radius * 0.3);
  pop();

  // 6D: Multicolored net
  push();
  rotateY(frameCount * 0.01 * p);
  strokeWeight(1);
  for (let i = 0; i < 6; i++) {
    let angle = TWO_PI * i / 6;
    stroke(lerpColor(color(0, 255, 0), color(255, 0, 255), i / 6));
    for (let j = 0; j < 6; j++) {
      let phi = TWO_PI * j / 6;
      let x = radius * cos(angle) * cos(phi) * p;
      let y = radius * sin(angle) * cos(phi) * p;
      let z = radius * sin(phi) * p;
      point(x, y, z);
    }
  }
  pop();
}

function draw6D0D(p) {
  // 6D: Fading net
  push();
  rotateY(frameCount * 0.01 * (1 - p));
  strokeWeight(1);
  for (let i = 0; i < 6; i++) {
    let angle = TWO_PI * i / 6;
    stroke(lerpColor(color(0, 255, 0), color(255, 0, 255), i / 6), 255 * (1 - p));
    for (let j = 0; j < 6; j++) {
      let phi = TWO_PI * j / 6;
      let x = radius * cos(angle) * cos(phi);
      let y = radius * sin(angle) * cos(phi);
      let z = radius * sin(phi);
      point(x * (1 - p), y * (1 - p), z * (1 - p));
    }
  }
  pop();

  // 0D: Fading back to dot, centered and larger
  fill(255, 255, 0, 255 * p);
  noStroke();
  ellipse(0, 0, 20 * p);
}

function pentagram(x, y, r) {
  beginShape();
  for (let i = 0; i < 5; i++) {
    let angle = TWO_PI * i / 5 - PI / 2;
    vertex(x + r * cos(angle), y + r * sin(angle));
    let angle2 = TWO_PI * (i + 0.4) / 5 - PI / 2;
    vertex(x + r * 0.5 * cos(angle2), y + r * 0.5 * sin(angle2));
  }
  endShape(CLOSE);
}
