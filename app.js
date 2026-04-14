const audio = document.getElementById("audio");
const content = document.getElementById("content");
const trackName = document.getElementById("trackName");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let currentIndex = 0;

const songs = [
  {
    title: "Track 1",
    artist: "Unknown Artist",
    file: "music/song1.mp3"
  },
  {
    title: "Track 2",
    artist: "Unknown Artist",
    file: "music/song2.mp3"
  }
];

// render library
function loadSongs() {
  content.innerHTML = "";

  songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <strong>${song.title}</strong><br>
      <small>${song.artist}</small>
    `;

    div.onclick = () => playSong(index);

    content.appendChild(div);
  });
}

// play system
function playSong(index) {
  currentIndex = index;
  const song = songs[index];

  audio.src = song.file;
  audio.play();

  trackName.innerText = song.title;
  playBtn.innerText = "⏸";
}

// controls
playBtn.onclick = () => {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = "⏸";
  } else {
    audio.pause();
    playBtn.innerText = "▶";
  }
};

nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % songs.length;
  playSong(currentIndex);
};

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  playSong(currentIndex);
};

loadSongs();
