const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

//Music
const songs = [
    {
        name: 'Reflections.mp3',
        img: 'Reflections',
        displayName: 'Reflections',
        artist: 'Elyssa Wilde',
    },
    {
        name: 'Heartbeat.m4a',
        img: 'Heartbeat',
        displayName: 'Heart-Beat',
        artist: 'Elyssa Wilde',
    },
    {
        name: 'Glittering-man.m4a',
        img: 'Glittering-man',
        displayName: 'Glittering Man',
        artist: 'Elyssa Wilde',
    },
    {
        name: 'In-my-mind.m4a',
        img: 'In-my-mind',
        displayName: 'In My Mind (cover)',
        artist: 'Amanda Palmer - Elyssa Wilde(cover)',
    },
];

//Check if music is playing
let isPlaying = false;

//Play
function playSong() {
    isPlaying = true;
    music.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
}

//Pause
function pauseSong() {
    isPlaying = false;
    music.pause();
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
   
}

//Play/Pause event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}`;
    image.src = `images/${song.img}.jpg`;
}

//Current song
let songIndex = 0;

//On load select first song
loadSong(songs[songIndex]);

//Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    // console.log(songIndex);
    loadSong(songs[songIndex])
    playSong();
}

//Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    // console.log(songIndex);
    loadSong(songs[songIndex])
    playSong();
}

//Update Progress Bar and Time
function updateProgressBar(event) {
    if (isPlaying) {
        const { duration, currentTime } = event.srcElement;
        //Update progress bar width in percent
        const progressPercent = (currentTime / duration) * 100;
        //Convert to template string for CSS
        progress.style.width = `${progressPercent}%`;
        //Calculate display for duration in minutes to the nearest integer
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        //Delay switching duration element to avoid NAN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        //Calculate display for currentTime in minutes to the nearest integer
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

//Set progress bar

function setProgressBar(event) {
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const { duration } = music; //destructuring to avoid NAN
    music.currentTime = (clickX / width) * duration;
}


//Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);