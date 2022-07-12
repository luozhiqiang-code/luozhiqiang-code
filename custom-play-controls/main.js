const playpauseBtn = document.querySelector('.playpause');
const stopBtn = document.querySelector('.stop');
const rwdBtn = document.querySelector('.rwd');
const fwdBtn = document.querySelector('.fwd');
const timeLabel = document.querySelector('.time');

const player = document.querySelector('video');
player.removeAttribute('controls');

playpauseBtn.onclick = function(){
    if(player.paused){
        player.play();
        playpauseBtn.textContent = 'Pause';
    } else {
        player.pause();
        playpauseBtn.textContent = 'Play';
    }
};

stopBtn.onclick = function(){
    player.pause();
    player.currentTime = 0;
    playpauseBtn.textContent = 'Play';
}

rwdBtn.onclick = function(){
    player.currentTime -=3;
}

fwdBtn.onclick = function(){
    player.currentTime +=3;
    if(player.currentTime >= player.duration || player.paused){
        player.pause();
        player.currentTime = 0;
        playpauseBtn.textContent = 'Play';
    }
}

player.ontimeupdate = function(){
    let minutes = Math.floor(player.currentTime/60);
    let seconds = Math.floor(player.currentTime - minutes*60);

    let minutesValue;
    let secondsValue;

    if(minutes<10){
        minutesValue = "0" + minutes;
    }else{
        minutesValue = minutes;
    }

    if(seconds<10){
        secondsValue = "0" + seconds;
    }else{
        secondsValue = seconds;
    }

    mediaTime = minutesValue + ":" + secondsValue;
    timeLabel.textContent = mediaTime;
}

