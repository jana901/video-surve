img="";
status="";
object=[];

function preload(){
audio=loadAudio("myalarm.mp3");
}
function setup(){

     canvas=createCanvas(380,380);
     canvas.center();

     video=createCapture(VIDEO);
     video.size(380,380);
     video.hide();
    
}

function start(){
    objectdetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting objects";
}

function draw(){
    
    image(video,0,0,380,380);
if(status !=""){
    objectdetector.detect(video,gotresults);
    r=random(255);
    g=random(255);
    b=random(255);
    if(object.length<=0){
        document.getElementById("status").innerHTML="Status:Object not Detected";
document.getElementById("baby").innerHTML="Baby is not found ";
audio.play();
    }
    else{
    for(i=0;i<object.length;i++){
        if(object[i].label=="person"){ 
           document.getElementById("status").innerHTML="Status:Object Detected";
           document.getElementById("baby").innerHTML="Baby is found ";
           audio.stop();
        }
    
        else{
           document.getElementById("status").innerHTML="Status:Object not Detected";
           document.getElementById("baby").innerHTML="Baby is not found ";
           audio.play();
            }
    }
    }
  }
   
}


function modelLoaded(){
    console.log("model loaded");
    status=true;
}

function gotresults(error,results){
    if(error){
        console.log(error)
    }
    console.log(results);
    object=results;
}


