// Playlist with your five MP3 files
const playlist = [
  {
    title: "Trąbka czasu",
    artist: "Unknown Artist",
    src: "Song 1.mp3"
  },
  {
    title: "Trąbka rewolucji",
    artist: "Unknown Artist",
    src: "Song 2.mp3"
  },
  {
    title: "Song 3",
    artist: "Unknown Artist",
    src: "Song 3.mp3"
  },
  {
    title: "Song 4",
    artist: "Unknown Artist",
    src: "Song 4.mp3"
  },
  {
    title: "Song 5",
    artist: "Unknown Artist",
    src: "Song 5.mp3"
  }
];

let currentIndex = 0;

// DOM elements
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const playPauseIcon = playPauseBtn.querySelector('i');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const titleEl = document.getElementById('song-title');
const artistEl = document.getElementById('song-artist');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const volumeSlider = document.getElementById('volume');
const record = document.getElementById('record');

// Format time as MM:SS
function formatTime(seconds) {
  if (isNaN(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Load song by index
function loadSong(index) {
  currentIndex = index;
  const song = playlist[index];
  audio.src = song.src;
  titleEl.textContent = song.title;
  artistEl.textContent = song.artist;
  currentTimeEl.textContent = "00:00";
  totalTimeEl.textContent = "00:00";
}

// Play / pause helpers
function playSong() {
  audio.play().catch(err => console.log('Playback failed:', err));
}

function pauseSong() {
  audio.pause();
}

function togglePlay() {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

// Update icon + record spin
function updatePlayPauseIcon() {
  if (audio.paused) {
    playPauseIcon.className = 'fas fa-play';
    record.classList.remove('playing');
  } else {
    playPauseIcon.className = 'fas fa-pause';
    record.classList.add('playing');
  }
}

// Next / previous
function nextSong() {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadSong(currentIndex);
  playSong();
}

function prevSong() {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentIndex);
  playSong();
}

// Event listeners
audio.addEventListener('loadedmetadata', () => {
  totalTimeEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener('play', updatePlayPauseIcon);
audio.addEventListener('pause', updatePlayPauseIcon);
audio.addEventListener('ended', nextSong);

playPauseBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

volumeSlider.addEventListener('input', (e) => {
  audio.volume = e.target.value;
});

// Initialise
loadSong(0);
audio.volume = volumeSlider.value;
updatePlayPauseIcon();
