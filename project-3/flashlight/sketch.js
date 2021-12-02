let t;
let video;
let poseNet;
let pose;
let skeleton;


function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
  
}


function preload() {
  flashlight = loadImage('flashlight-2.png');
  bg = loadImage('bg.jpg');
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
  // image(video, 0, 0, width, height);
  pop();
  // background(255);
    clear();

  image(bg, 0, 0);
  bg.resize(700, 0);
  
   
  if (pose){
   
    
      image(flashlight, pose.rightWrist.x - 3000, pose.rightWrist.y - 3000);

  }
}

