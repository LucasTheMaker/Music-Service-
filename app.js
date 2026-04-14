const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const repeatBtn = document.getElementById("repeat");

const trackName = document.getElementById("trackName");
const albumGrid = document.getElementById("albumGrid");
const trackView = document.getElementById("trackView");
const pageTitle = document.getElementById("pageTitle");
const searchBar = document.getElementById("searchBar");

let currentAlbum = null;
let currentSongIndex = 0;
let isPlaying = false;

let likedSongs = [];
let repeatMode = "off";

/* 🎵 FULL ALBUM LIBRARY */
const albums = [
  {
    title: "ye",
    artist: "Kanye West",
    cover: "images/ye.jpg",
    songs: [
      { title: "I Thought About Killing You", file: "music/ye1.mp3" },
      { title: "Yikes", file: "music/ye2.mp3" },
      { title: "All Mine", file: "music/ye3.mp3" },
      { title: "Wouldn't Leave", file: "music/ye4.mp3" },
      { title: "No Mistakes", file: "music/ye5.mp3" },
      { title: "Ghost Town", file: "music/ye6.mp3" },
      { title: "Violent Crimes", file: "music/ye7.mp3" }
    ]
  }
];

/* 🏠 HOME */
function loadAlbums() {
  albumGrid.style.display = "grid";
  trackView.style.display = "none";

  albumGrid.innerHTML = "";
  pageTitle.innerText = "Home";

  albums.forEach((album, index) => {
    const div = document.createElement("div");
    div.className = "album";

    div.innerHTML = `
      <img src="${album.cover}">
      <div>${album.title}</div>
      <div style="opacity:0.6;font-size:12px;">${album.artist}</div>
    `;

    div.onclick = () => openAlbum(index);
    albumGrid.appendChild(div);
  });
}

/* 📀 OPEN ALBUM */
function openAlbum(index) {
  currentAlbum = albums[index];

  albumGrid.style.display = "none";
  trackView.style.display = "block";

  trackView.innerHTML = "";
  pageTitle.innerText = currentAlbum.title;

  currentAlbum.songs.forEach((song, i) => {
    const div = document.createElement("div");
    div.className = "track";

    div.innerText = song.title;
    div.onclick = () => playSong(i);

    trackView.appendChild(div);
  });
}

/* 🎧 PLAY SONG */
function playSong(index) {
  currentSongIndex = index;

  const song = currentAlbum.songs[index];

  audio.src = song.file;
  audio.play();

  trackName.innerText = song.title;

  isPlaying = true;
  playBtn.innerText = "⏸";

  addToLiked(song);
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

/* ⏭ NEXT */
nextBtn.onclick = () => {
  if (!currentAlbum) return;

  currentSongIndex++;
  if (currentSongIndex >= currentAlbum.songs.length) currentSongIndex = 0;

  playSong(currentSongIndex);
};

/* ⏮ PREVIOUS */
prevBtn.onclick = () => {
  if (!currentAlbum) return;

  currentSongIndex--;
  if (currentSongIndex < 0) currentSongIndex = currentAlbum.songs.length - 1;

  playSong(currentSongIndex);
};

/* 🔁 REPEAT MODES */
repeatBtn.onclick = () => {
  if (repeatMode === "off") {
    repeatMode = "song";
    repeatBtn.innerText = "🔂";
  } else if (repeatMode === "song") {
    repeatMode = "album";
    repeatBtn.innerText = "🔁";
  } else {
    repeatMode = "off";
    repeatBtn.innerText = "🔁";
  }
};

/* 🔁 AUTO NEXT + REPEAT */
audio.onended = () => {

  // repeat song
  if (repeatMode === "song") {
    audio.currentTime = 0;
    audio.play();
    return;
  }

  // repeat album
  if (repeatMode === "album") {
    currentSongIndex++;
    if (currentSongIndex >= currentAlbum.songs.length) {
      currentSongIndex = 0;
    }
    playSong(currentSongIndex);
    return;
  }

  // normal mode
  nextBtn.click();
};

/* ❤️ LIKED SONGS */
function addToLiked(song) {
  if (!likedSongs.find(s => s.file === song.file)) {
    likedSongs.push(song);
  }
}

function showLikedSongs() {
  albumGrid.style.display = "none";
  trackView.style.display = "block";

  pageTitle.innerText = "Liked Songs";

  trackView.innerHTML = "";

  likedSongs.forEach((song, i) => {
    const div = document.createElement("div");
    div.className = "track";

    div.innerText = song.title;

    div.onclick = () => {
      audio.src = song.file;
      audio.play();
      trackName.innerText = song.title;
      isPlaying = true;
      playBtn.innerText = "⏸";
    };

    trackView.appendChild(div);
  });
}

/* 🔍 SEARCH */
searchBar.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filtered = albums.filter(a =>
    a.title.toLowerCase().includes(value) ||
    a.artist.toLowerCase().includes(value)
  );

  albumGrid.innerHTML = "";

  filtered.forEach((album, index) => {
    const div = document.createElement("div");
    div.className = "album";

    div.innerHTML = `
      <img src="${album.cover}">
      <div>${album.title}</div>
      <div style="opacity:0.6;font-size:12px;">${album.artist}</div>
    `;

    div.onclick = () => openAlbum(index);
    albumGrid.appendChild(div);
  });
});

/* 🚀 START */
loadAlbums();
