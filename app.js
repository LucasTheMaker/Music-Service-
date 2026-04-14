const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const repeatBtn = document.getElementById("repeat");
const shuffleBtn = document.getElementById("shuffle");
const volumeSlider = document.getElementById("volume");

const trackName = document.getElementById("trackName");
const albumGrid = document.getElementById("albumGrid");
const trackView = document.getElementById("trackView");
const pageTitle = document.getElementById("pageTitle");
const searchBar = document.getElementById("searchBar");

let currentAlbum = null;
let currentSongIndex = 0;
let isPlaying = false;

let repeatMode = "off";
let shuffleMode = false;
let queue = [];

/* 🎵 ALBUM */
const albums = [
  {
    title: "ye",
    artist: "Kanye West",
    cover: "images/ye.jpg",
    songs: [
      { title: "I Thought About Killing You", file: "music/1. I Thought About Killing You.mp3" },
      { title: "Yikes", file: "music/2. Yikes.mp3" },
      { title: "All Mine", file: "music/3. All Mine.mp3" },
      { title: "Wouldn't Leave", file: "music/4. Wouldn't Leave.mp3" },
      { title: "No Mistakes", file: "music/5. No Mistakes.mp3" },
      { title: "Ghost Town", file: "music/6. Ghost Town.mp3" },
      { title: "Violent Crimes", file: "music/7. Violent Crimes.mp3" }
    ]
  }
];

/* 🏠 HOME */
function loadAlbums() {
  albumGrid.innerHTML = "";
  trackView.style.display = "none";
  albumGrid.style.display = "grid";
  pageTitle.innerText = "Home";

  albums.forEach((album, i) => {
    const div = document.createElement("div");
    div.className = "album";
    div.innerHTML = `
      <img src="${album.cover}">
      <div>${album.title}</div>
      <div style="opacity:0.6;font-size:12px;">${album.artist}</div>
    `;
    div.onclick = () => openAlbum(i);
    albumGrid.appendChild(div);
  });
}

/* 📀 OPEN */
function openAlbum(i) {
  currentAlbum = albums[i];
  albumGrid.style.display = "none";
  trackView.style.display = "block";

  trackView.innerHTML = "";
  pageTitle.innerText = currentAlbum.title;

  currentAlbum.songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.className = "track";
    div.innerText = song.title;
    div.onclick = () => playSong(index);
    trackView.appendChild(div);
  });
}

/* 🎧 PLAY */
function playSong(index) {
  currentSongIndex = index;
  const song = currentAlbum.songs[index];

  audio.src = encodeURI(song.file);
  audio.play();

  trackName.innerText = song.title;
  isPlaying = true;
  playBtn.innerText = "⏸";

  queue = currentAlbum.songs.slice(index + 1);
}

/* ▶ PLAY/PAUSE */
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

/* ⏭ NEXT */
nextBtn.onclick = () => {
  if (shuffleMode) {
    currentSongIndex = Math.floor(Math.random() * currentAlbum.songs.length);
  } else {
    currentSongIndex++;
    if (currentSongIndex >= currentAlbum.songs.length) currentSongIndex = 0;
  }
  playSong(currentSongIndex);
};

/* ⏮ PREV */
prevBtn.onclick = () => {
  currentSongIndex--;
  if (currentSongIndex < 0) currentSongIndex = currentAlbum.songs.length - 1;
  playSong(currentSongIndex);
};

/* 🔁 REPEAT */
repeatBtn.onclick = () => {
  if (repeatMode === "off") repeatMode = "song";
  else if (repeatMode === "song") repeatMode = "album";
  else repeatMode = "off";
};

/* 🔀 SHUFFLE */
shuffleBtn.onclick = () => {
  shuffleMode = !shuffleMode;
  shuffleBtn.style.opacity = shuffleMode ? "1" : "0.5";
};

/* 🔊 VOLUME */
volumeSlider.oninput = () => {
  audio.volume = volumeSlider.value;
};

/* 🔁 AUTO NEXT */
audio.onended = () => {
  if (repeatMode === "song") {
    audio.currentTime = 0;
    audio.play();
    return;
  }
  nextBtn.click();
};

/* 🚀 START */
loadAlbums();
