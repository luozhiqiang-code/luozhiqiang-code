let media = document.querySelector('video');
let controls = document.querySelector('.controls');

let play = document.querySelector('.play');
let stop = document.querySelector('.stop');
let rwd = document.querySelector('.rwd');
let fwd = document.querySelector('.fwd');

let timerWrapper = document.querySelector('.timer');
let timer = document.querySelector('.timer span');
let timerBar = document.querySelector('.timer div');

media.removeAttribute('controls');
controls.style.visibility = 'visible';

play.addEventListener('click',playPauseMedia);

stop.addEventListener('click',stopMeadia);
media.addEventListener('ended',stopMeadia);

rwd.addEventListener('click',mediaBackward);
fwd.addEventListener('click',mediaForward);

media.addEventListener('timeupdate',setTime);

let intervalFwd;
let intervalRwd;

function playPauseMedia(){
    rwd.classList.remove('active');
    fwd.classList.remove('active');
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);
    
    if(media.paused){
        play.setAttribute('data-icon','u');
        media.play();
    } else {
        play.setAttribute('data-icon','p');
        media.pause();
    }
}

function stopMeadia(){
    
    rwd.classList.remove('active');
    fwd.classList.remove('active');
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);

    media.pause();
    media.currentTime = 0;
    play.setAttribute('data-icon','p');
    
}

function mediaBackward(){
    clearInterval(intervalFwd);
    fwd.classList.remove('active');

    if(rwd.classList.contains('active')){
        rwd.classList.remove('active');
        clearInterval(intervalRwd);
        media.play();
    } else {
        rwd.classList.add('active');
        media.pause();
        intervalRwd = setInterval(windBackward, 200);
    }
}

function mediaForward(){
    if(intervalRwd){
    clearInterval(intervalRwd);
}
    clearInterval(intervalRwd);
    rwd.classList.remove('active');

    if(fwd.classList.contains('active')){
        fwd.classList.remove('active');
        clearInterval(intervalFwd);
        media.play();
    } else {
        fwd.classList.add('active');
        media.pause();
        intervalFwd = setInterval(windForward, 200);
    }
}

function windBackward(){
    if(media.currentTime <= 3){
        stopMeadia();
    } else {
        media.currentTime -= 1;
    }
}

function windForward(){
    if(media.currentTime >= media.duration -3){
        stopMeadia();
    } else {
        media.currentTime += 1;
    }
}

function setTime(){
    let minutes = Math.floor(media.currentTime/60);
    let seconds = Math.floor(media.currentTime - minutes*60);
    
    let minuteValue;
    let secondValue;

    if(minutes < 10){
        minuteValue = '0' + minutes;
    } else {
        minuteValue = minutes;
    }

    if(seconds < 10){
        secondValue = '0' + seconds;
    } else {
        secondValue = seconds;
    }

    let mediaTime = minuteValue + ':' + secondValue;
    timer.textContent = mediaTime;

    let barLength = timerWrapper.clientWidth*(media.currentTime/media.duration);
    timerBar.style.width = barLength +'px';
}

