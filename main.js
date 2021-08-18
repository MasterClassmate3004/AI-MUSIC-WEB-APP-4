HarryPotterSong = "";
PeterPanSong = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
peterPanScore = 0;
peterPanStatus = "";

function preload() 
{
    HarryPotterSong = loadSound("HarryPotter.mp3");
    PeterPanSong = loadSound("PeterPan.mp3")
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center;

    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet Is Initialized");
}

function gotPoses(results)
{
     if(results.length > 0)
    {
        console.log(results);
        peterPanScore = results[0].pose.keypoints[9].score;
        console.log("peterPanScore = " + peterPanScore);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY );

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY );
    }

}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("FF0000");
   
    peterPanStatus = PeterPanSong.isPlaying();

    if(peterPanScore > 0.2)
    {
        circle(leftWristX , leftWristY , 20);
        HarryPotterSong.stop();
         
        if(peterPanStatus = true)
        {
            PeterPanSong.play();
            document.getElementById("song_name").innerHTML = "Peter Pan Song";
        }
    }
}