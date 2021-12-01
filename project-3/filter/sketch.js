//Annie Zheng
//IML 400
//September 30 2021
//Exercise 3
//I decided to create a camera filter that you can toggle on and off by moving your mouse around. The camera filter follows mouseY, meaning that you can control how much of your camera is obscured by the filter. There are no particular inspirations for this filter – I just thought it might be interesting to have some way to manipulate the height of the filter.

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
  
}

function gotPoses(poses) {
  console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log("poseNet ready");
}


function draw() {
  push();
  poseNet.flipHorizontal = true;
  image(cam, 0, 0, width, height);
  filter(GRAY);
  pop();
  
  // poseNet.flipHorizontal = false;

  cam.loadPixels();
  
  if(pose){
    //face
    for (col=pose.leftEar.x; col<=pose.rightEar.x; col+=20){
    for(row=pose.nose.y-100; row<=pose.rightWrist.y; row+=20){
      let colorFromVideo = cam.get(col, row);
      fill( colorFromVideo );
        noStroke();
        ellipse(col,row, 20, 20);
      
    }
  } 
    
  }
  
 
}
