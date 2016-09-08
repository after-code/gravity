/*========================*\
	#Canvas setup
\*========================*/
var canvas = document.getElementById("context");
var context = canvas.getContext("2d"),
width = 1000;
// width = window.innerWidth,
height = 400;
// height = window.innerHeight;
canvas.width = width;
canvas.height = height;
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";


// width = window.innerWidth - 100,
// height = window.innerHeight - 200;


/*========================*\
	#Variables
\*========================*/
var loop,
    gravity = 1,
    counter = 0,
    keys = [],
    gameIsOver = false,
    gameSpeed = 1,
    step = 1,
    currentFloor = 0,
    higherFloor = 0,
    previousFloor = 0,
    stepSpeed =3;
    currentStep = 0;


/*========================*\
	#Objects
\*========================*/
var steps = [0,0,0,0,0,0,1,1,2,0,1,1,1,2,2,3,3,4,2,2,2,2,3,3,3,4,4,4,5,5,5,2,2,2,3,3,3,3,4,4,2,2,2,2,1,1,2,3,4,5,6,0,0,0,0,1,1,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,0,1,2,3,4,5,5,6,7,7,8,8,8,8,0,0,0,1,2,2,2,0,0,0,0,1,1,2,2,3,3,4,4,3,3,2,2,2,2,1,1,2,2,2,2,3,3,3,4,4];
var stepObjs = [];
for (i in steps){
  stepObjs.push({
    x:i*30,
    y:height - steps[i] * 30
  });
}

var playerConst = function(){
  this.x = 90;
  this.y = 370;
  this.width = 30;
  this.height = 30;
  this.velocityY = 0;
  this.jumping = false;
  this.jump = 12.2;
}
var player = new playerConst();

/*========================*\
	#Keys
\*========================*/
// Add keys to array

window.addEventListener("keydown", function(e){
  keys[e.keyCode] = true;
  if (e.keyCode == 13 && gameStatus == 1){
    gameStatus = 2;
    splashMusic.pause();
    splashMusic.currentTime = 0;
  }
}, false);

// Remove keys from array

window.addEventListener("keyup", function(e){
  delete keys[e.keyCode];
}, false);


/*========================*\
	#Game
\*========================*/

function start(){
  loop = window.requestAnimationFrame(start)
  if (counter % gameSpeed === 0){
    game();
  }
  counter++;
  if (counter >= 1300){
    counter = 0;
    for (i in stepObjs){
      stepObjs[i].x += 1300 *stepSpeed;
    }
  }
}

function game(){
  update();
  render();
}

function update(){
  /* ---------------*\
     #Controls
  \* ---------------*/
  // if(keys[37] || keys[65] && !gameIsOver){player.x-=5;} // Left
  // if(keys[39] || keys[68] && !gameIsOver){player.x+=5;} // Right
  // if(keys[38] || keys[87] && !gameIsOver ){player.y-=5; } // Up
  // if(keys[40] || keys[83] && !gameIsOver ){player.y+=5; } // Down
  if(keys[32] && !gameIsOver && player.y >= higherFloor){player.velocityY-=player.jump; console.log(player.velocityY)} // space
  // if(keys[13] && gameIsOver){newGame();splashMusic.pause();splashMusic.currentTime = 0;}

  for (i in stepObjs){
    stepObjs[i].x-=stepSpeed;
  }

  currentFloor = height - steps[currentStep+1]*30 - 30;
  if (steps[currentStep+1] == undefined){
    currentFloor = height - 30;
  }
  previousFloor = height - steps[currentStep]*30 - 30;
  if (currentFloor > previousFloor){
    higherFloor = previousFloor
  } else {
    higherFloor = currentFloor
  }
  /*========================*\
  	#Boudaries
  \*========================*/
  player.velocityY += gravity;
  player.y += player.velocityY;

  if (player.y >= higherFloor){

    player.y = higherFloor;
    player.velocityY = 0;
  }

  if(counter*stepSpeed % 30 == 0){
    currentStep = 3 +counter*stepSpeed/30;
    console.log(currentStep+':'+steps[currentStep+1]);
  }

}
function render(){
  context.clearRect(0,0,width, height);
  for (i in stepObjs){
    context.fillStyle = '#25e2ba';
    context.fillRect(stepObjs[i].x, stepObjs[i].y, 30, 1010);
  }
  context.fillStyle = '#2d78f1';
  context.fillRect(player.x, player.y, player.width, player.height);
}
start();
function verticalColision(){
  if (player.y >= currentFloor){
    return true;
  }
}
