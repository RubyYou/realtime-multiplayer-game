let canvas;
let canvasContext;
let ballX = 50;
let ballY = 50;
let ballSpeedX = 10;
let ballSpeedY = 4;

let paddle1Y = 250;
let paddle2Y = 250;
let player1Score = 0;
let player2Score = 0;

const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

Meteor.startup(function () {
    //init();
});

function calcMousePos(event){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = event.clientX - rect.left - root.scrollLeft;
    var mouseY = event.clientY - rect.top - root.scrollTop;

    return {

        x: mouseX, y: mouseY
    };
}

function init(){
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framePerSecond = 30;
    setInterval(function(){
        move();
        drawObjs();
    }, 1000/framePerSecond);

    canvas.addEventListener('mousemove', function(event){
        var mousePos = calcMousePos(event);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);

    });
}

function ballReset(){
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

function move(){
    computerMove();

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // left side bouncing
    if(ballX < 5){
        // if ball is inside the paddle1 Y area.
        if(ballY > paddle1Y && ballY < paddle1Y*PADDLE_HEIGHT){
            ballSpeedX = - ballSpeedX;
            var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
            console.log(ballSpeedY);
            // if ball is outside the padd1 Y area
        }else{
            ballReset();
            player2Score +=1;

        }
    }

    // right side bouncing
    if(ballX > canvas.width-5 ){
        // if ball is inside the paddle1 Y area.
        if(ballY > paddle2Y && ballY < paddle2Y*PADDLE_HEIGHT){
            ballSpeedX = - ballSpeedX;
            var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
            console.log(ballSpeedY);
            // if ball is outside the padd1 Y area
        }else{
            ballReset();
            player1Score +=1;
        }
    }

    if(ballY > canvas.height || ballY < 0){
        ballSpeedY = - ballSpeedY;
    }



    // Game.insert({player1: player1Score, player2: player1Score});
    // console.log(Game);
}

function computerMove(){
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
    if(paddle2YCenter < ballY){
        paddle2Y +=6;
    }else if( paddle2YCenter > ballY-35){
        paddle2Y -=6;
    }
}

function drawObjs(){
    drawRect( 0, 0, canvas.width, canvas.height,'black');
    drawRect( 0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
    drawRect( canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
    drawCircle(ballX, ballY, 10, 'red');
    canvasContext.fillStyle = 'white';
    canvasContext.fillText("player1: " + player1Score, 100, 100);
    canvasContext.fillStyle = 'white';
    canvasContext.fillText("player2: " + player2Score, canvas.width-100, 100);

    drawNet();
}

function drawNet(){
    for (var i =0; i < canvas.height; i +=40){
        drawRect(canvas.width/2-1, i, 2, 20, 'white');
    }
}

function drawCircle(centerX, centerY, radius, color){
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();

}

function drawRect (leftX, topY, width, height, Color){
    canvasContext.fillStyle = Color;
    canvasContext.fillRect(leftX, topY, width, height);
}