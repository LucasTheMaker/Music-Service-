const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const repeatBtn = document.getElementById("repeat");
const shuffleBtn = document.getElementById("shuffle");
const volumeSlider = document.getElementById("volume");

const trackName = document.getElementById("trackName");
const albumGrid = document.getElementById("albumGrid");
const artistGrid = document.getElementById("artistGrid");
const trackView = document.getElementById("trackView");
const pageTitle = document.getElementById("pageTitle");

let currentAlbum = null;
let currentSongIndex = 0;
let isPlaying = false;

let repeatMode = "off";
let shuffleMode = false;

/* 🎵 ALBUMS */
const albums = [
  {
    title: "ye",
    artist: "Kanye West",
    cover: "images/ye.jpg",
    songs: [
      { title: "I Thought About Killing You", file: "music/1. I Thought About Killing You.mp3" },
      { title: "Yikes", file: "music/2. Yikes.mp3" },
      { title: "All Mine", file: "music/3. All Mine.mp3" },
      { title: "Ghost Town", file: "music/6. Ghost Town.mp3" }
    ]
  }
];

/* 👤 ARTISTS */
const artists = [
  {
    name: "Kanye West",
    image: "images/kanye.jpg",
    songs: [
      { title: "I Thought About Killing You", file: "music/1. I Thought About Killing You.mp3" },
      { title: "Yikes", file: "music/2. Yikes.mp3" },
      { title: "Ghost Town", file: "music/6. Ghost Town.mp3" }
    ]
  }
];

/* 🏠 HOME */
function loadAlbums() {
  albumGrid.style.display = "grid";
  artistGrid.style.display = "none";
  trackView.style.display = "none";

  pageTitle.innerText = "Home";
  albumGrid.innerHTML = "";

  albums.forEach((album, i) => {
    const div = document.createElement("div");
    div.className = "album";

    div.innerHTML = `
      <img src="${album.cover}">
      <div>${album.title}</div>
      <div style="opacity:0.6;">${album.artist}</div>
    `;

    div.onclick = () => openAlbum(i);
    albumGrid.appendChild(div);
  });
}

/* 📀 OPEN ALBUM */
function openAlbum(i) {
  currentAlbum = albums[i];

  albumGrid.style.display = "none";
  artistGrid.style.display = "none";
  trackView.style.display = "block";

  pageTitle.innerText = currentAlbum.title;
  trackView.innerHTML = "";

  currentAlbum.songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.className = "track";
    div.innerText = song.title;
    div.onclick = () => playSong(index);
    trackView.appendChild(div);
  });
}

/* 👤 LOAD ARTISTS */
function loadArtists() {
  albumGrid.style.display = "none";
  trackView.style.display = "none";
  artistGrid.style.display = "grid";

  pageTitle.innerText = "Artists";
  artistGrid.innerHTML = "";

  artists.forEach((artist, i) => {
    const div = document.createElement("div");
    div.className = "artist";

    div.innerHTML = `
      <img src="${artist.image}">
      <div>${artist.name}</div>
    `;

    div.onclick = () => openArtist(i);
    artistGrid.appendChild(div);
  });
}

/* 🎤 OPEN ARTIST PAGE */
function openArtist(i) {
  const artist = artists[i];

  albumGrid.style.display = "none";
  artistGrid.style.display = "none";
  trackView.style.display = "block";

  pageTitle.innerText = artist.name;
  trackView.innerHTML = "";

  artist.songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.className = "track";
    div.innerText = song.title;

    div.onclick = () => {
      playDirect(song);
    };

    trackView.appendChild(div);
  });
}

/* 🎧 PLAY FROM ARTIST */
function playDirect(song) {
  audio.src = encodeURI(song.file);
  audio.load();
  audio.play();

  trackName.innerText = song.title;
  isPlaying = true;
  playBtn.innerText = "⏸";
}

/* 🎧 PLAY FROM ALBUM */
function playSong(index) {
  currentSongIndex = index;

  const song = currentAlbum.songs[index];

  audio.src = encodeURI(song.file);
  audio.load();
  audio.play();

  trackName.innerText = song.title;
  isPlaying = true;
  playBtn.innerText = "⏸";
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
  if (!currentAlbum) return;

  currentSongIndex++;
  if (currentSongIndex >= currentAlbum.songs.length) currentSongIndex = 0;

  playSong(currentSongIndex);
};

/* ⏮ PREV */
prevBtn.onclick = () => {
  if (!currentAlbum) return;

  currentSongIndex--;
  if (currentSongIndex < 0) currentSongIndex = currentAlbum.songs.length - 1;

  playSong(currentSongIndex);
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
  nextBtn.click();
};

/* 🚀 START */
loadAlbums();
