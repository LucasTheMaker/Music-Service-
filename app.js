const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const repeatBtn = document.getElementById("repeat");
const shuffleBtn = document.getElementById("shuffle");
const volumeSlider = document.getElementById("volume");

const trackName = document.getElementById("trackName");
const subText = document.getElementById("subText");
const bgBlur = document.getElementById("bgBlur");

const albumGrid = document.getElementById("albumGrid");
const artistGrid = document.getElementById("artistGrid");
const trackView = document.getElementById("trackView");
const pageTitle = document.getElementById("pageTitle");

let currentAlbum = null;
let currentSongIndex = 0;
let isPlaying = false;

let shuffleMode = false;
let repeatMode = "off";

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

/* 🌫 UPDATE BACKGROUND */
function updateBackground(img) {
  bgBlur.style.backgroundImage = `url(${img})`;
}

/* 🏠 HOME */
function loadAlbums() {
  artistGrid.style.display = "none";
  trackView.style.display = "none";
  albumGrid.style.display = "grid";

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

  updateBackground(currentAlbum.cover);

  currentAlbum.songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.className = "track";
    div.innerText = song.title;
    div.onclick = () => playSong(index);
    trackView.appendChild(div);
  });
}

/* 👤 ARTISTS */
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

/* 🎤 ARTIST PAGE */
function openArtist(i) {
  const artist = artists[i];

  albumGrid.style.display = "none";
  artistGrid.style.display = "none";
  trackView.style.display = "block";

  pageTitle.innerText = artist.name;
  trackView.innerHTML = "";

  updateBackground(artist.image);

  artist.songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.className = "track";
    div.innerText = song.title;

    div.onclick = () => playDirect(song);
    trackView.appendChild(div);
  });
}

/* 🎧 PLAY */
function playSong(index) {
  currentSongIndex = index;
  const song = currentAlbum.songs[index];

  audio.src = encodeURI(song.file);
  audio.load();
  audio.play();

  trackName.innerText = song.title;
  subText.innerText = currentAlbum.artist;

  isPlaying = true;
  playBtn.innerText = "⏸";
}

/* 🎧 DIRECT PLAY */
function playDirect(song) {
  audio.src = encodeURI(song.file);
  audio.load();
  audio.play();

  trackName.innerText = song.title;
  subText.innerText = "Artist";
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
  currentSongIndex++;
  if (currentSongIndex >= currentAlbum.songs.length) currentSongIndex = 0;
  playSong(currentSongIndex);
};

/* ⏮ PREV */
prevBtn.onclick = () => {
  currentSongIndex--;
  if (currentSongIndex < 0) currentSongIndex = currentAlbum.songs.length - 1;
  playSong(currentSongIndex);
};

/* 🔊 VOLUME */
volumeSlider.oninput = () => {
  audio.volume = volumeSlider.value;
};

/* 🔁 END */
audio.onended = () => {
  nextBtn.click();
};

/* 🚀 START */
loadAlbums();
