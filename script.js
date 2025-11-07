//Variables
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const musicContainer = document.getElementById('music_modal_container');
const audio = document.getElementById('audio');
const currentTimeElement = document.getElementById('currentTime');
const durationElement = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress_bar');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const artist = document.querySelector('.artist');
let musicNo = document.querySelectorAll(".music_no");


// Songs, Artists and background color

const songs = ['comfortably numb','gravity','borderline','something','earfquake']
const artists = ['pink floyd','jonh mayer','tame impala','the beatles','tyler the creator']
const bgColor = ['#E1CAF1','#EFEEE8','#EAEC4C','#8FB7BE','#F5B2C6']

// Index song, artist and bg color

let songIndex = 2;
let artistIndex = 2;
let bgColorIndex = 2;


loadSong(songs[songIndex], artists[artistIndex], bgColor[bgColorIndex]);



function loadSong(song, artistName,bgColorName) {

    title.innerText = song;
    artist.innerText = artistName;
    audio.src = `./music/${song}.mp3`;
    cover.src = `./images/${artistName}.png`;

    musicNo.forEach(el => {
        el.innerText = "0" + (songIndex + 1);
    });


    audio.addEventListener('loadedmetadata', function(){
        updateDuration();
    });
    
    audio.addEventListener('timeupdate', function(){
        updateCurrentTime();
    });

    gsap.from(cover, {
        duration: 1,
        opacity: 0.8,
        scale: 1.25,
        ease: "EaseInOut"
    })
    gsap.from(title, {
        duration: 1,
        opacity: 0,
        y: 50,
        ease: "EaseInOut"
    })
    gsap.from(artist, {
        duration: 0.75,
        opacity: 0,
        y: 40,
        ease: "EaseInOut"
    })

    gsap.from(musicContainer, {
        duration: 1,
        backgroundColor: bgColorName,
        ease: "EaseInOut"
    })

    gsap.from(".music_no", {
        duration: 0.75,
        stagger: 0.1,
        opacity: 0,
        y: 30,
        ease: "EaseInOut"
    })

}

function playSong(){
    musicContainer.classList.add('play');
    document.getElementById('pause_btn').style.display = "block";
    document.getElementById('play_btn').style.display = "none";

    audio.play();
}

function pauseSong(){
    musicContainer.classList.remove('play');
    document.getElementById('pause_btn').style.display = "none";
    document.getElementById('play_btn').style.display = "block";

    audio.pause();
}

function prevSong() {

    songIndex--;
    artistIndex--;
    bgColorIndex--;

    if(songIndex < 0){
        songIndex = songs.length - 1;
    }

    if(artistIndex < 0){
        artistIndex = artists.length - 1;
    }

    if(bgColorIndex < 0){
        bgColorIndex = bgColor.length - 1;
    }

    artists.forEach(el => {
        if(el === artists[artistIndex]){
            let albumCover = el.replace(/\s/g,'');

            gsap.to(`#${albumCover}`,{
                duration: 0.75,
                y: -20,
                opacity: 1,
                ease: "EaseInOut"
            });
        }else{
            let albumCover = el.replace(/\s/g,'');

            gsap.to(`#${albumCover}`,{
                duration: 0.75,
                y: 0,
                opacity: 0.5,
                ease: "EaseInOut"
            });
        }
    });

    loadSong(songs[songIndex], artist[artistIndex], bgColor[bgColorIndex]);

    playSong();

}

function nextSong() {

    songIndex++;
    artistIndex++;
    bgColorIndex++;

    if(songIndex > songs.length - 1){
        songIndex = 0;
    }

    if(artistIndex > artists.length - 1){
        artistIndex = 0;
    }

    if(bgColorIndex > bgColor.length - 1){
        bgColorIndex = 0;
    }

    artists.forEach(el => {
        if(el === artists[artistIndex]){
            let albumCover = el.replace(/\s/g,'');

            gsap.to(`#${albumCover}`,{
                duration: 0.75,
                y: -20,
                opacity: 1,
                ease: "EaseInOut"
            });
        }else{
            let albumCover = el.replace(/\s/g,'');

            gsap.to(`#${albumCover}`,{
                duration: 0.75,
                y: 0,
                opacity: 0.5,
                ease: "EaseInOut"
            });
        }
    });

    loadSong(songs[songIndex], artists[artistIndex], bgColor[bgColorIndex]);

    playSong();
}



function updateProgress(e){
    const {duration,currentTime} = e.srcElement;
    const progressPercent = (currentTime/duration) * 100;
    progress.style.width = `${progressPercent}%`;
}


function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX /width) * duration;

}


playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);

function updateDuration() {
    const duration = formatTime(audio.duration);
    durationElement.textContent = duration;
}

function updateCurrentTime() {
    const currentTime = formatTime(audio.currentTime);
    currentTimeElement.textContent = currentTime;
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}
