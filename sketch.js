var ctracker;
var ripples = [];


function setup() {
  // setup camera capture
   var videoInput = createCapture(VIDEO);
   videoInput.size(600, 400);
   videoInput.position(0, 0);
   videoInput.style('transform: rotateY(180deg)'); //wont be needed when video.hide()
   //videoInput.hide(); 

  // setup canvas
  var cnv = createCanvas(600, 400);
  cnv.position(0, 0);
  //flip to be like a mirror
  cnv.style('transform: rotateY(180deg)');
  // setup tracker
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(videoInput.elt);

  noStroke();  //needed?
}



function draw() {
  background(0,0,0);
  //clear();
  // get array of face marker positions [x, y] format
  var positions = ctracker.getCurrentPosition();
  
  for (var i = 0; i < positions.length; i++) {  //if(positions){ ALSO WORKS BUT WHY?
    // draw ellipse at eyes position point [27], [32]
    var leftEyeX = positions[27][0];  //array index 27 y
    var leftEyeY = positions[27][1];  //array index 27 x
    ellipseMode(CENTER);
    ellipse(leftEyeX, leftEyeY, 10, 10);
    
    var rightEyeX = positions[32][0];
    var rightEyeY = positions[32][1];
    ellipse(rightEyeX, rightEyeY, 10, 10);
  }  

  //loop thru whats in ripples[], display and changeDiam each
  for (var i = 0; i < ripples.length; i ++ ) { 
    ripples[i].changeDiam();
    ripples[i].display();
    //remove the first one (oldest)
    if(ripples[i].lifespan < 0){
    ripples.splice(i, 1);    //splice = remove
   }
  }
  
  var leftEyeRipple = new rippelFromEye(leftEyeX,leftEyeY);
  ripples.push(leftEyeRipple);
  var rightEyeRipple = new rippelFromEye(rightEyeX,rightEyeY);
  ripples.push(rightEyeRipple);

}


//------------------------------------------function to make ripples from ONE source
function rippelFromEye(eyePosX, eyePosY, diam){
  diam = 50;
  this.lifespan = 255;

  this.changeDiam = function() {
    //if (diam < 150){
    diam++;
    this.lifespan = this.lifespan - 4;
   // }
  }

  this.display = function() {
  //stroke(hue(ballCol), saturation(ballCol), brightness(ballCol), this.lifespan);
  stroke(180, 20 , 80, this.lifespan);
  strokeWeight(2);
  noFill();
  ellipse(eyePosX, eyePosY, diam, diam);
  }

}



















