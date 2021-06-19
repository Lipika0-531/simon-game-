alert("h1");
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
let randomChosenColour;
var counter = 0;
var gameLevel = 1;

function playSound(Name) {
  switch (Name) {
    case "blue":
      var audio = new Audio("sounds/blue.mp3");
      audio.play();
      break;
    case "green":
      var audio = new Audio("sounds/green.mp3");
      audio.play();
      break;
    case "yellow":
      var audio = new Audio("sounds/yellow.mp3");
      audio.play();
      break;
    case "red":
      var audio = new Audio("sounds/red.mp3");
      audio.play();
      break;
  }
}

function nextSequence() {
  var n = Math.random();
  n = n * 3;
  n = Math.floor(n) + 1;
  var randomChosenColour = buttonColours[n];
  playSound(randomChosenColour);
  gamePattern.push(randomChosenColour);
  const element = $("#" + randomChosenColour);
  $(document).ready(() => {
    element.fadeOut('fast');
    element.fadeIn('fast');
  });

}

function animatepress(currentcolour) {
  currentcolour.addClass("pressed");
  setTimeout(() => {
    currentcolour.removeClass("pressed");
  }, 300);
}


function Main() {
  $(".level-title").fadeOut();
  $(".restart").slideUp();
  var candy = 0;
  const runner = setInterval(() => {
    if (candy == gameLevel - 1) {
      nextSequence();
      clearInterval(runner);
    } else {
      const element = $(`#${gamePattern[candy]}`)
      element.fadeOut('fast');
      element.fadeIn('fast');
      playSound(gamePattern[candy]);
    }
    candy++;
  }, 2000)
  counter = 0;
  userClickedPattern = [];
};


$(".btn").click(function() {
  var userChosenColour = this.id;
  playSound(userChosenColour);
  var flag = false;
  if (gamePattern[counter++] != userChosenColour) {
    $(".restart").slideDown(); //ok ok apo codepen podalama antha buttonku oru style uh
    gameLevel = 1;
    $("#level").text("level " + gameLevel);
    flag = true;
  } else if (gameLevel == counter) {
    gameLevel++;
    $("#level").text("level " + gameLevel);
    if (!flag) Main();
  }
  animatepress($(this));
})
