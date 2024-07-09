var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var toggle = false;
var level = 1;
var start = false;






function nextSequence(){
    start = true;
    $("h1").text("Level "+level);

    var randomNumber = Math.floor( Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);

$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
var audio = new Audio("sounds/" + randomChosenColour+".mp3");
audio.play();
}




$(document).keydown(function(){
    if(toggle == false)
    {
        nextSequence();
        toggle = true;
    }
   
});


$(".btn").click(function()
{
    if(start==true)
    {
        handlerFunction(this.id);
        playSound(this.id);
        animatePress(this.id);
        checkAnswer(userClickedPattern.length-1);
    }
  

});
function handlerFunction(id)
{
    var userChosenColour = id;
    userClickedPattern.push(userChosenColour);
}

//play sound on button press
function playSound(id)
{
    var audio = new Audio("./sounds/" + id+".mp3");
    audio.play();
}

//animation on button press
function animatePress(id)
{
    $("#" + id).addClass("pressed");
    setTimeout(function(){
        $("#" + id).removeClass("pressed")
    }, 100);

}
$(".resetButton").click(function()
{
    level = 1;
    gamePattern=[];
    userClickedPattern=[];
    nextSequence();
});


//check if correct button was pressed
function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel])
    {
        
        if(currentLevel == gamePattern.length-1)
        {
            userClickedPattern = [];
            level++;
            setTimeout(nextSequence, 1000);
        }
    }
    else
    {
        var wrongAudio = new Audio("./sounds/wrong.mp3");
        wrongAudio.play();
       $("body").addClass("game-over");

       setTimeout(function(){
        $("body").removeClass("game-over");
       }, 200);
       $("h1").text("Game Over🥲, Press any key to continue!");
       toggle = false;
       gamePattern=[];
       userClickedPattern=[];
       level = 1;
       start = false;
      
    }
}


