let cam;
let poseNet;
let pose;
let skeleton;


function setup() {
  createCanvas(640, 480);
  cam = createCapture(VIDEO);
  poseNet = ml5.poseNet(cam, modelLoaded);
  poseNet.on("pose", gotPoses);
  pixelDensity(1);
  cam.hide();
  noStroke();
  
  poseNet.flipHorizontal = true;

  
}

function gotPoses(poses) {
  // console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  // console.log("poseNet ready");
}


function draw() {
  push();
  translate(width, 0);
  scale(-1, 1);
  image(cam, 0, 0, width, height);
  filter(GRAY);
  pop();
  
  cam.loadPixels();
  
  if(pose){
    //face
    for (col=pose.leftEar.x; col<=pose.rightEar.x; col+=20){
    for(row=pose.nose.y-100; row<=pose.rightWrist.y; row+=20){
      let colorFromVideo = cam.get(col, row);
      fill( colorFromVideo );
        noStroke();
        // push();
        // translate(width,0);
        // scale(-1,1);
      ellipse(col,row, 20, 20);
      // pop(); 
        
      
    }
  } 
    
  }
  
 
}
