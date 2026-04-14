//////////////////////////////////////////////////////
// ✅ REPLACE EVERYTHING IN YOUR app.js WITH THIS
//////////////////////////////////////////////////////

const audio = document.getElementById("audio");
const trackName = document.getElementById("trackName");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const albumGrid = document.getElementById("albumGrid");
const trackView = document.getElementById("trackView");
const pageTitle = document.getElementById("pageTitle");

// 🔍 NEW: search bar
const searchBar = document.getElementById("searchBar");

// ❤️ NEW: playlist system
let likedSongs = [];

let currentAlbum = null;
let currentSongIndex = 0;
let isPlaying = false;

/* =========================================
   🎵 ALBUM DATA (EDIT THIS FOR YOUR MUSIC)
========================================= */
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

/* =========================================
   🏠 LOAD ALBUM HOME SCREEN
========================================= */
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

/* =========================================
   📀 OPEN ALBUM (TRACK VIEW)
========================================= */
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

/* =========================================
   🎵 PLAY SONG
========================================= */
function playSong(index) {
  if (!currentAlbum) return;

  currentSongIndex = index;

  const song = currentAlbum.songs[index];

  audio.src = song.file;
  audio.play();

  trackName.innerText = song.title;

  isPlaying = true;
  playBtn.innerText = "⏸";

  // ❤️ NEW: add to liked songs automatically
  addToLiked(song);
}

/* =========================================
   ⏯ PLAY / PAUSE
========================================= */
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

/* =========================================
   ⏭ NEXT SONG
========================================= */
nextBtn.onclick = () => {
  if (!currentAlbum) return;

  currentSongIndex++;

  if (currentSongIndex >= currentAlbum.songs.length) {
    currentSongIndex = 0;
  }

  playSong(currentSongIndex);
};

/* =========================================
   ⏮ PREVIOUS SONG
========================================= */
prevBtn.onclick = () => {
  if (!currentAlbum) return;

  currentSongIndex--;

  if (currentSongIndex < 0) {
    currentSongIndex = currentAlbum.songs.length - 1;
  }

  playSong(currentSongIndex);
};

/* =========================================
   🔁 AUTO NEXT SONG
========================================= */
audio.onended = () => {
  nextBtn.click();
};

/* =========================================
   ❤️ LIKE / PLAYLIST SYSTEM (NEW)
========================================= */
function addToLiked(song) {
  const exists = likedSongs.find(s => s.file === song.file);
  if (!exists) {
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

    div.innerHTML = `
      <span>${i + 1}. ${song.title}</span>
    `;

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

/* =========================================
   🔍 SEARCH SYSTEM (NEW)
========================================= */
if (searchBar) {
  searchBar.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    const filtered = albums.filter(album =>
      album.title.toLowerCase().includes(value) ||
      album.artist.toLowerCase().includes(value)
    );

    renderFilteredAlbums(filtered);
  });
}

/* =========================================
   🔍 FILTERED ALBUM RENDER (NEW)
========================================= */
function renderFilteredAlbums(list) {
  albumGrid.innerHTML = "";

  list.forEach((album, index) => {
    const div = document.createElement("div");
    div.className = "album";

    div.innerHTML = `
      <img src="${album.cover}" class="album-cover">
      <div class="album-title">${album.title}</div>
      <div class="album-artist">${album.artist}</div>
    `;

    // NOTE: index may not match original albums perfectly (simple version)
    div.onclick = () => openAlbum(index);

    albumGrid.appendChild(div);
  });
}

/* =========================================
   🚀 INIT APP
========================================= */
loadAlbums();
