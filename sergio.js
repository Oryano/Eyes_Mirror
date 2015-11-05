var balls = [];

var socket;
var mouseColSend; 
var mouseColRec; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  //background(255);
  colorMode(HSB, 100);
  mouseColSend = color(random(100), 100, 100);
  
  // Start a socket connection to the server
  socket = io.connect('http://104.236.48.182:3004/');
  //socket = io.connect('http://localhost:8080/');
  
  // We make a named event called 'mouse' and write an anonymous callback function
  socket.on('mouse', function(data) {
    // We are receiving!
    //console.log("Got: " + data.x + " " + data.y + " " + data.h + " " + data.s + " " + data.b );

    // Draw a circle
    mouseColRec = color(data.h, data.s, data.b);
    var b = new Ball(data.x, data.y, 10, mouseColRec); 
    balls.push(b);

    } );
}

function draw() {

  background(0,0,100);
   for (var i = 0; i < balls.length; i ++ ) { 
    balls[i].move();
    balls[i].display();
    if(balls[i].lifespan < 0){
    balls.splice(i, 1);
   }
  }

}

function mouseDragged() {

  // Draw a circle
  //ball(mouseX, mouseY, 10, mouseColSend);
  var b = new Ball(mouseX,mouseY, 10, mouseColSend); 
  balls.push(b);

  // Send the mouse coordinates
  sendmouse(mouseX,mouseY,hue(mouseColSend), saturation(mouseColSend), brightness(mouseColSend));

}

/////////////////// Function for sending to the socket

function sendmouse(xpos, ypos, colh, cols, colb) {
  
  // Make a data object
  var data = {
    x: xpos,
    y: ypos,
    h: colh,
    s: cols,
    b: colb
  };

  // Send that object to the socket
  socket.emit('mouse',data);

  // We are sending!
  //console.log("sendmouse: " + xpos + " " + ypos + " " + colh + " " + cols + " " + colb);
  
}





///////////////// Function for BALL class

function Ball(ballX, ballY, ballDiam, ballCol){
  this.lifespan = 255;

this.move = function() {
  if (ballDiam < 150){
ballDiam++;
this.lifespan = this.lifespan - 4;
}
}

this.display = function() {
  stroke(hue(ballCol), saturation(ballCol), brightness(ballCol), this.lifespan);
  strokeWeight(2);
  noFill();
  ellipse(ballX, ballY, ballDiam, ballDiam);
}
}