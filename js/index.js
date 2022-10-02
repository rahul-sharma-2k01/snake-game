//Game Constants and Variables
let direction={x:0 , y:0};
const foodSound=new Audio("../music/food.mp3");
const gameOverSound=new Audio("../music/gameover.mp3");
const moveSound=new Audio("../music/move.mp3");
const musicSound=new Audio("../music/music.mp3");
let speed=5;
let lastPaintTime=0;

// let board=document.querySelector("#board");
let snakeArr=[
    {x:13, y:15}
]
let food={x:6, y:7};
let score=0;

//Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snake){
    //If snake bump into yourself
    for(let i=1;i<snake.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    return false;
}

function gameEngine(){
    //Part 1: Updating Snake Array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        direction={x:0, y:0};
        alert("Game Over. Press any key to play again!");
        snakeArr.length=0;
        snakeArr.push({x:13, y:15});
        // musicSound.play();
        score=0;
        scoreId.innerHTML="Score : "+score;
        window.requestAnimationFrame(main);
    }

    //If snake eaten the food, increment score and regenerate food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodSound.play();
        score++;
        if(score>highscoreval){
            // console.log("hj");
            highscoreval=score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            highScoreId.innerHTML="HiScore : "+highscoreval;
        }
        scoreId.innerHTML="Score : "+score;
        let temp1=snakeArr[0].x+direction.x;
        if(temp1==0) temp1=18;
        else if(temp1==19) temp1=1;

        let temp2=snakeArr[0].y+direction.y;
        if(temp2==0) temp2=18;
        else if(temp2==19) temp2=1;

        snakeArr.unshift({x:temp1, y:temp2});
        let a=1;
        let b=18;
        food={x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())};
    }

     //Moving the snake
    for (let i=snakeArr.length-2;i>=0; i--){
        let temp = snakeArr[i];  
        snakeArr[i+1]={...snakeArr[i]};    
    }
    snakeArr[0].x+=direction.x;
    snakeArr[0].y+=direction.y;
    if(snakeArr[0].x==0) snakeArr[0].x=18;
    else if(snakeArr[0].x==19) snakeArr[0].x=1;
    if(snakeArr[0].y==0) snakeArr[0].y=18;
    else if(snakeArr[0].y==19) snakeArr[0].y=1;

    //Part 2: Display the Snake and food
    board.innerHTML="";
    snakeArr.forEach((e, index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    //Display Food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//Main Logic Starts here
let highscore=localStorage.getItem("highscore");
console.log(highscore);
highscoreval=JSON.parse(highscore);
if(highscore==null){
    highscoreval=0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval));
}
else{
    highScoreId.innerHTML="HiScore : "+highscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    direction={x: 0, y:1} //Start the Game
    moveSound.play();
    switch (e.key){
        case "ArrowUp":
            musicSound.play();
            // console.log("ArrowUp");
            direction.x=0;
            direction.y=-1;
            break;

        case "ArrowDown":
            musicSound.play();
            // console.log("ArrowDown");
            direction.x=0;
            direction.y=1;
            break;

        case "ArrowLeft":
            musicSound.play();
            // console.log("ArrowLeft");
            direction.x=-1;
            direction.y=0;
            break;

        case "ArrowRight":
            musicSound.play();
            // console.log("ArrowRight");
            direction.x=1;
            direction.y=0;
            break;

        default:
            break;
    }
})

