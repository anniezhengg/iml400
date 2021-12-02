//referenced from angela's sketch bc she is a coding god: https://editor.p5js.org/togekisse/sketches/yowOeEkJJ
//got help from Jay!

//erase text with your wrist! the text never goes in front of your head! 

let video;
let poseNet;
let pose;
let skeleton;
let words = [];
var textArray = ["why am i so fucking ugly?", "why are my eyes so small?", "why is my face so chubby?", "why can't i be prettier?", "is this why no one likes me?", "what is it like to be pretty?", "why is my nose so flat?", "why is my face so wide?", "why is my face asymmetrical?", "why do i look like that?", "i hate myself"];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
  textFont('Space Mono');
  brush = createGraphics(windowWidth, windowHeight);


  //Generate random initial word
  for (var i = 0; i < 30; i++) {
    let d = random(width);
    let h = random(height);

    words[i] = new Word(d, h);
  }
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
  image(video, 0, 0, width, height);
  filter(GRAY);
  pop();
  
 
  poseNet.flipHorizontal = false;
  for (var i = 0; i < words.length; i++) {
    if (pose) {
      //to see if i successfully flipped the video but not posenet points
       fill(0, 0, 255);
      circle(pose.leftWrist.x, pose.leftWrist.y, 50);
      circle(pose.rightWrist.x, pose.rightWrist.y, 50);
    
      //try to figure out how to load words around/behind head
      if(
        (words[i].x > pose.leftEar.x ||
        words[i].x < pose.rightEar.x ||
        words[i].y > pose.nose.y + 100)
    ) {
        words[i].display();
        
      }
      
      //delete text from array when xy values match wrist area
      if (
        (words[i].x > pose.leftWrist.x - 20 &&
          words[i].x < pose.leftWrist.x + 20 &&
          words[i].y > pose.leftWrist.y - 20 &&
          words[i].y < pose.leftWrist.y + 20) ||
        (words[i].x > pose.rightWrist.x - 20 &&
          words[i].x < pose.rightWrist.x + 20 &&
          words[i].y > pose.rightWrist.y - 20 &&
          words[i].y < pose.rightWrist.y + 20)
      ) {
        words.splice(i, 1);
        for(k = 0; k<10; k++){
          let rWidth = random(width);
          let rHeight = random(height);
          words.push(new Word(rWidth, rHeight));
          
        }
        
      }
    }
  }
}

class Word {
  constructor(tempX, tempY) {
    this.x = tempX;
    this.y = tempY;
    this.text = random(textArray);
  }
  display() {
    push();
    noStroke();
    fill(255, 0, 0);
    
    text(this.text, this.x, this.y);
    pop();
  }
 
}
