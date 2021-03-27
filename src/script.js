/*
 *  Github   : https://github.com/computer-spectre
 */

var s = 0, m = 0, h = 0;
const margin = 50; /* aka. distance between two rings */
var inner_radius;

/* Unsigned modulo */
const mod = (n, k) => {
    var temp = n;
    while((temp += k)<0);
    return temp % k;
}

/* Modular distance */
const mod_dist = (x, y, modulo)=> {
    return min(mod((x - y),modulo),mod((y - x),modulo));
}

/* Draws a circle of numbers 
 *  radius : self explanatory
 *  n      : the highlighted number 
 */
const num_circle = (n, max, radius) => {
  if(n > max) return null; /* Unless you are not on earth */
  
  push();
  
  /* Rotate to the current number */
  rotate(2 * n * Math.PI / max);
  
  let i = -1;
  while(i++ < max - 1){ /* Print all numbers */
    
    /* Just for the styling */
    let distance = mod_dist(n,i, max);
    let mapped_d = map(distance,0,max/2,0,255);
    
    /* Playing with colors */
    fill(50, 156-pow(mapped_d, 2), 111, 255-mapped_d);
    
    /* Distant numbers are smaller */
    textSize(20-map(mapped_d,0,255,0,20));
    
    text(String(i).padStart(2, "0"),radius,0);
    rotate(-2*Math.PI/max);
  }
  
  pop();
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  inner_radius = width / 4;
  
  /* Initialization */
  let d = new Date();
  s = d.getSeconds();
  m = d.getMinutes();
  h = d.getHours();
  
  frameRate(60);
}

function draw() {
  background(255);
  
  /* Update */
  let d = new Date();
  s += (d.getSeconds() - s) * 0.5;
  m += (d.getMinutes() - m) * 0.5;
  h += (d.getHours()   - h) * 0.5;
  
  /* Center the current time */
  translate(inner_radius - margin, height/2);
  
  /* The 3 rings */
  num_circle(h, 24, inner_radius + margin * 0); /* Yes, I am weired */
  num_circle(m, 60, inner_radius + margin * 1); 
  num_circle(s, 60, inner_radius + margin * 2); 
  
  line(inner_radius-25,-5,inner_radius-5,-5);
  line(inner_radius+2*margin+25,-5,inner_radius+2*margin+25+20,-5);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
