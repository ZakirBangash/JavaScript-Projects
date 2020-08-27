const vedio = document.querySelector('#vedio');
const play = document.querySelector("#play");
const stop = document.querySelector("#stop");
const progress = document.querySelector("#progress");
const timeStamp = document.querySelector("#timeStamp");


const toggleVedio = ()=>{
    if(vedio.paused){
        vedio.play();
    }else {
        vedio.pause();
    }
}

const updateIcon = () => {
     if(vedio.paused){
        play.innerHTML = '<i class="fas fa-play fa-2x"></i>';
     }else {
        play.innerHTML = '<i class="fas fa-pause fa-2x"></i>';

     }
}


const setProgress = () => {
    vedio.currentTime = progress.value * vedio.duration / 100;
}

const updateProgress = () => {
     progress.value = vedio.currentTime/vedio.duration*100;

     let minutes = Math.floor (vedio.currentTime / 60);
     if(minutes < 10)
        minutes = `0${minutes}`;

     let seconds = Math.floor (vedio.currentTime % 60);
     if(seconds < 10)
        seconds = `0${seconds}`;

    timestamp.innerHTML = `${minutes}:${seconds}`;

}

const sotpVideo = () => {
    vedio.pause();
    vedio.currentTime = 0;
}


vedio.addEventListener('click',toggleVedio);
vedio.addEventListener('play',updateIcon);
vedio.addEventListener('pause',updateIcon);
vedio.addEventListener('timeupdate',updateProgress);




play.addEventListener('click',toggleVedio);

stop.addEventListener('click',sotpVideo)

progress.addEventListener('change',setProgress);


