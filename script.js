const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song Titles
const songs = [
  'Sunroof',
  'Never Go Wrong',
  `I Don't Like Your Friends`,
  'Stay',
  'You Belong With Me',
  '10-35',
  'CHARGER'
];

// Keep track of song
let songIndex = 1;

// Song Artists
const artists = [
  'Nicky Youre, Dazy',
  'Nicky Youre, David Hugo',
  'Halden Rule',
  'The Kid LAROI, Justin Bieber',
  'Taylor Swift',
  'Tiesto, Tate McRae',
  'JVKE, chillpill'
];

// Keep track of Artist
let artistsIndex = 1;

// Initially load song details into DOM
loadSong(songs[songIndex], artists[artistsIndex]);

// Update song details
function loadSong(song, artist) {
  title.innerText = `${song} by ${artist}`;
  audio.src = `Music/${song}.mp3`;
  cover.src = `Img/${song}.jpeg`;
}

// Play Song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause Song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous Song
function prevSong() {
  songIndex--;
  artistsIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
    artistIndex = artists.length - 1;
  }

  loadSong(songs[songIndex], artists[artistsIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  artistsIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
    artistsIndex = 0;
  }

  loadSong(songs[songIndex], artists[artistsIndex]);
  playSong();
}

// Update Progress Bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercentage = (currentTime / duration) * 100;
  progress.style.width = `${progressPercentage}%`;
}

// Set Progress Bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change Song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/Song Update
audio.addEventListener('timeupdate', updateProgress);

// Click On Progress Bar
progressContainer.addEventListener('click', setProgress);

// Song Ends
audio.addEventListener('ended', nextSong);
