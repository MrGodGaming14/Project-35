var balloon;
var database, position;

var balloonImage;

function preload(){
balloonImage = loadImage("images/Hot Air Ballon-02.png")

backgroundImage = loadImage("images/Hot Air Ballon-01.png");

}

function setup() {
  database = firebase.database();
  
  createCanvas(600,600);
  balloon = createSprite(250,250,50,50);
  balloon.addImage(balloonImage);
  balloon.scale = 0.5;

  var balloonPosition = database.ref("balloon/position");
  balloonPosition.on("value", readPosition, showError);

}

function draw() {
//if(position !== undefined){

  background(backgroundImage);
  if(keyDown(LEFT_ARROW)){
    changePosition(-1,0);
}
else if(keyDown(RIGHT_ARROW)){
    changePosition(1,0);
}
else if(keyDown(UP_ARROW)){
    changePosition(0,-1);
}
else if(keyDown(DOWN_ARROW)){
    changePosition(0,+1);
}
  drawSprites();
//}
}

function changePosition(x,y){
  database.ref("balloon/position").set(
      {
          x:position.x+x,
          y:position.y+y
      }
  )
}

function readPosition(data){
 position = data.val();
 balloon.x = position.x
 balloon.y = position.y
}
function showError(){
  console.log("errrrrroooooorrrrr !!!")
}
