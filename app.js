const audio = document.getElementById("audio");
const trackName = document.getElementById("trackName");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const albumGrid = document.getElementById("albumGrid");
const trackView = document.getElementById("trackView");
const pageTitle = document.getElementById("pageTitle");
const searchBar = document.getElementById("searchBar");

let currentAlbum = null;
let currentSongIndex = 0;
let isPlaying = false;

let likedSongs = [];

/* ALBUM DATA */
const albums = [
  {
    title: "Demo Album",
    artist: "Artist",
    cover: "images/cover1.jpg",
    songs: [
      { title: "Intro", file: "music/song1.mp3" },
      { title: "Song 2", file: "music/song2.mp3" }
    ]
  }
];

/* LOAD HOME */
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
    `;

    div.onclick = () => openAlbum(index);

    albumGrid.appendChild(div);
  });
}

/* OPEN ALBUM */
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

/* PLAY SONG */
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

/* CONTROLS */
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

nextBtn.onclick = () => {
  currentSongIndex++;
  if (currentSongIndex >= currentAlbum.songs.length) currentSongIndex = 0;
  playSong(currentSongIndex);
};

prevBtn.onclick = () => {
  currentSongIndex--;
  if (currentSongIndex < 0) currentSongIndex = currentAlbum.songs.length - 1;
  playSong(currentSongIndex);
};

/* LIKED SONGS */
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

/* SEARCH */
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

    div.innerHTML = `<img src="${album.cover}"><div>${album.title}</div>`;

    div.onclick = () => openAlbum(index);

    albumGrid.appendChild(div);
  });
});

/* START */
loadAlbums();
