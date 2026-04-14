const audio = document.getElementById("audio");
const trackName = document.getElementById("trackName");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const albumGrid = document.getElementById("albumGrid");
const trackView = document.getElementById("trackView");
const pageTitle = document.getElementById("pageTitle");

let currentAlbum = null;
let currentSongIndex = 0;
let isPlaying = false;

/* 🎵 MUSIC LIBRARY (ADD YOUR MUSIC HERE) */
const albums = [
  {
    title: "Demo Album",
    artist: "Various Artists",
    cover: "images/cover1.jpg",
    songs: [
      { title: "Intro", file: "music/song1.mp3" },
      { title: "Second Track", file: "music/song2.mp3" }
    ]
  },
  {
    title: "Chill Pack",
    artist: "Unknown Artist",
    cover: "images/cover2.jpg",
    songs: [
      { title: "Vibe 1", file: "music/song3.mp3" }
    ]
  }
];

/* 🏠 LOAD HOME (ALBUM GRID) */
function loadAlbums() {
  albumGrid.innerHTML = "";
  trackView.innerHTML = "";

  albumGrid.style.display = "grid";
  trackView.style.display = "none";

  pageTitle.innerText = "Home";

  albums.forEach((album, index) => {
    const div = document.createElement("div");
    div.className = "album";

    div.innerHTML = `
      <img src="${album.cover}" class="album-cover">
      <div class="album-title">${album.title}</div>
      <div class="album-artist">${album.artist}</div>
    `;

    div.onclick = () => openAlbum(index);

    albumGrid.appendChild(div);
  });
}

/* 📀 OPEN ALBUM (TRACK LIST VIEW) */
function openAlbum(index) {
  currentAlbum = albums[index];

  albumGrid.style.display = "none";
  trackView.style.display = "block";

  pageTitle.innerText = currentAlbum.title;

  trackView.innerHTML = "";

  currentAlbum.songs.forEach((song, i) => {
    const div = document.createElement("div");
    div.className = "track";

    div.innerHTML = `
      <span>${i + 1}. ${song.title}</span>
    `;

    div.onclick = () => playSong(i);

    trackView.appendChild(div);
  });
}

/* 🎵 PLAY SONG */
function playSong(index) {
  if (!currentAlbum) return;

  currentSongIndex = index;

  const song = currentAlbum.songs[index];

  audio.src = song.file;
  audio.play();

  trackName.innerText = song.title;

  isPlaying = true;
  playBtn.innerText = "⏸";
}

/* ⏯ PLAY / PAUSE */
playBtn.onclick = () => {
  if (!audio.src) return;

  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    playBtn.innerText = "▶";
  } else {
    audio.play();
    isPlaying = true;
    playBtn.innerText = "⏸";
  }
};

/* ⏭ NEXT SONG */
nextBtn.onclick = () => {
  if (!currentAlbum) return;

  currentSongIndex++;

  if (currentSongIndex >= currentAlbum.songs.length) {
    currentSongIndex = 0;
  }

  playSong(currentSongIndex);
};

/* ⏮ PREVIOUS SONG */
prevBtn.onclick = () => {
  if (!currentAlbum) return;

  currentSongIndex--;

  if (currentSongIndex < 0) {
    currentSongIndex = currentAlbum.songs.length - 1;
  }

  playSong(currentSongIndex);
};

/* 🔁 AUTO NEXT SONG WHEN FINISHED */
audio.onended = () => {
  nextBtn.click();
};

/* 🚀 START APP */
loadAlbums();
