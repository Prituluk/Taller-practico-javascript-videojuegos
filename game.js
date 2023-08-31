const canvas = document.getElementById('game');
const game = canvas.getContext('2d');
const btnUp = document.getElementById('up');
const btnLeft = document.getElementById('left');
const btnRight = document.getElementById('right');
const btnDown = document.getElementById('down');
const spanLive = document.getElementById('lives');
const spanTime = document.getElementById('time');
const spanRecod = document.getElementById('recod');
const pResult = document.getElementById('result');
const btnreload = document.getElementById('reload');

let canvasSize;
let elementSize ;
let level = 0;
let lives = 3;


let timeStart;
let timePlayer;
let timeInterval;


const playerPosition = {
    x : undefined,
    y : undefined,
} ;

const giftPosition = {
    x: undefined,
    y: undefined,
};

let enemyPositions = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);


function startGame(){
  
  console.log({canvasSize, elementSize});

  game.font = elementSize + 'px Roboto';

  const map = maps[level];

  if(!map) {
    gameWIn();
  }

  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100);
    showRecord();
  }
  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map( rows => rows.trim().split(''));

  showLive();

  enemyPositions = [];

  game.clearRect(0,0, canvasSize, canvasSize);

  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
        const emoji = emojis[col];  
        const posX = elementSize * (colI);
        const posY = elementSize * (rowI + 1);

        if(col == 'O'){
            if(!playerPosition.x && !playerPosition.y) {
                playerPosition.x = posX - 5;
                playerPosition.y = posY ;
             
            }
        }else if(col == 'I') {
            giftPosition.x = posX - 5;
            giftPosition.y = posY;
        }else if (col == 'X') {
            enemyPositions.push({
                    x : posX,
                    y : posY,
            });
        }

        game.fillText(emoji, posX, posY);

    });
  });
  movePlayer();
}

function movePlayer() {

    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;

    if(giftCollision) {
        setTimeout(function() {
            levelWin();
          }, 300,);
          
    }

    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX =  enemy.x.toFixed(3) == (playerPosition.x + 5).toFixed(3);
        const enemyCollisionY =  enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
        return enemyCollisionX && enemyCollisionY; 
    });

    if(enemyCollision) {
        setTimeout(function() {
            enemyPositions = game.fillText(emojis['BOMB_COLLISION'], playerPosition.x, playerPosition.y);
          }, 100);

          setTimeout(function() {
            levelFail();
          },400,);
          
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);

}

function setCanvasSize() {
  if(window.innerHeight > window.innerWidth){
    canvasSize = window.innerWidth * 0.8;
  }else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);

  

  elementSize = (canvasSize / 10 ) - 1;

  
 
  startGame(); 
}

function levelWin() {
    
    level++;
    
    startGame();
}

function levelFail() {
    lives--;    


    if(lives <= 0) {
        level = 0;
        lives = 3;
        timeStart = undefined;
    }

    playerPosition.x = 0;
    playerPosition.y = 0;
    startGame();
   
}

function gameWIn(){
    console.log('you win');
    clearInterval(timeInterval);        
    
    const recordTime = localStorage.getItem('record_time');
    const playerTime = Date.now() - timeStart;

    if(recordTime){
        if(recordTime >= playerTime){
            localStorage.setItem('record_time', playerTime);
            pResult.innerHTML = 'nuevo record';
        }else {
            pResult.innerHTML = 'lo siento no superaste el record';
        }
        
    }else {
        localStorage.setItem('record_time', playerTime);
        pResult.innerHTML = 'Te reto a superar ese record';
    }
    console.log({recordTime, playerTime});  



    
}

function showLive() {
    const heartArray = Array(lives).fill(emojis['HEART']);

    spanLive.innerHTML = heartArray.join('');

}

function showTime (){
    spanTime.innerHTML = Date.now() - timeStart;
}

function showRecord (){
    spanRecod.innerHTML = localStorage.getItem('record_time');
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);
btnreload.addEventListener('click', fReload);
function moveByKeys(event){
    if ( event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowDown') moveDown(); 
}

function moveUp(){
    console.log('arriba'); 
    if((playerPosition.y - elementSize) < elementSize -1 )  {
        console.log('a');
    }else {
       playerPosition.y -= elementSize;
        startGame(); 
    }
    
}
function moveLeft(){
    console.log('izquierda');
    if((playerPosition.x - elementSize) < (elementSize - elementSize - elementSize) )  {
        console.log('a');
    }else {
       playerPosition.x -= elementSize;
        startGame();
    }
}
function moveRight(){
    console.log('derecha');
    if((playerPosition.x + elementSize) > (canvasSize - elementSize))  {
        console.log('a');
    }else {
       playerPosition.x += elementSize;
        startGame();        
    }
}
function moveDown(){
    console.log('abajo');
    if((playerPosition.y + elementSize) > canvasSize)  {
        console.log('a');
    }else {
       playerPosition.y += elementSize;
        startGame(); 
    }
}
function fReload(){
    location.reload();
}


