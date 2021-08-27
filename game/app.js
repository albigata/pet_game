const startBtn=document.querySelector('#start');
const screens=document.querySelectorAll('.screen');
const timeList=document.querySelector('.screen__time-list');
const timeEl=document.querySelector('#time');
const board=document.querySelector('.screen__board');
const bscore=document.querySelector('.screen__board_score');
const scoreEl=document.querySelector('#score');

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

let time=0;
let score=0;
let timerId=0;
let timerIdGodMode=0;

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-list__button')) {
        time=parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

function startGame() {
    createRandomCircle();
    timerId = setInterval(decreaseTime, 1000);
    setTime(time);
}

function decreaseTime() {
    if (time===0) {
        finishGame();
    }
    else {
        let current=--time;
        if (current<10) {
            current=`0${current}`;
        }
        setTime(current);
    }
}

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score +=1;
        event.target.remove();
        createRandomCircle();
        console.log(score);
    }
});

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    const circle=document.querySelector('.circle');
    circle.classList.add('hide');
    bscore.classList.add('score');
    scoreEl.innerHTML=`${score}`;
    clearInterval(timerId);
    clearInterval(timerIdGodMode);
}

function setTime(value) {
    timeEl.innerHTML=`00:${value}`;
}

function createRandomCircle() {
    const circle=document.createElement('div');
    circle.classList.add('circle');
    const size=getRandomNumber(10, 60);
    circle.style.width=`${size}px`;
    circle.style.height=`${size}px`;
    const {width, height}=board.getBoundingClientRect();
    const x=getRandomNumber(0, width-size);
    const y=getRandomNumber(0, height-size);
    circle.style.top=`${y}px`;
    circle.style.left=`${x}px`;
    circle.style.background='#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
    board.append(circle);
}

function getRandomNumber (min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function winTheGame() {
    function killAll() {
        const circle=document.querySelector('.circle');
        circle.click();
    }
    timerIdGodMode=setInterval(killAll, 50);
}