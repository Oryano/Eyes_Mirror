var ctracker;
var ripple = 0;


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
  //do like a mirror
  cnv.style('transform: rotateY(180deg)');
  // setup tracker
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(videoInput.elt);

  noStroke();  //needed?
}



function draw() {
  clear();  //like backround in draw
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
    ellipseMode(CENTER);
    ellipse(rightEyeX, rightEyeY, 10, 10);
  }

  // ripple++;
  // stroke(255,0,0);
  // noFill();
  // ellipse(leftEyeX, leftEyeY, ripple, ripple);
  // ellipse(rightEyeX, rightEyeY, ripple, ripple);

  // if (ripple > 100) ripple = 0;
  
}




















