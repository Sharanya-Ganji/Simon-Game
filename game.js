var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
//to start and go to next level
var started=false;
var level=0;
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});
//user
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
      console.log("Success");
      if(userClickedPattern.length===gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
  }
  else{
    console.log("Wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  startOver();
   }
 }
//system
function nextSequence(){
    userClickedPattern=[]
    level++;
    $("#level-title").text("Level "+level);
    
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosencolor=buttonColors[randomNumber];
    gamePattern.push(randomChosencolor);
    $("#"+randomChosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosencolor);
}
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}
