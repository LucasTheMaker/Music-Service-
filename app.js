const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const volume = document.getElementById("volume");

const trackName = document.getElementById("trackName");
const subText = document.getElementById("subText");
const main = document.getElementById("main");

const searchInput = document.getElementById("search");
const themeToggle = document.getElementById("themeToggle");

let currentAlbum = null;
let currentIndex = 0;
let isPlaying = false;

/* DATA */
const albums = [
  {
    title: "ye",
    artist: "Kanye West",
    cover: "images/kanye.png",
    songs: [
      { title: "I Thought About Killing You", file: "music/song1.mp3" },
      { title: "Yikes", file: "music/song2.mp3" }
    ]
  }
];

const artists = [
  {
    name: "Kanye West",
    image: "images/kanye.png",
    songs: albums[0].songs
  }
];

/* PLAY SYSTEM */
function playSong(song, album = null, index = 0) {
  audio.src = song.file;
  audio.play();

  trackName.innerText = song.title;
  subText.innerText = album ? album.artist : "Kanye West";

  isPlaying = true;
  playBtn.innerText = "⏸";

  currentAlbum = album;
  currentIndex = index;
}

/* HOME */
function loadHome() {
  main.innerHTML = `
    <h1 class="home-title">Home</h1>

    <h2>Artists</h2>
    <div class="scroll" id="artistRow"></div>

    <h2>Albums</h2>
    <div class="scroll" id="albumRow"></div>

    <div id="trackView"></div>
  `;

  loadArtists();
  loadAlbums();
}

/* ARTISTS */
function loadArtists() {
  const row = document.getElementById("artistRow");
  row.innerHTML = "";

  artists.forEach((artist, i) => {
    const div = document.createElement("div");
    div.className = "artist-card";

    div.innerHTML = `
      <img src="${artist.image}">
      <div class="artist-name">${artist.name}</div>
    `;

    div.onclick = () => openArtist(i);
    row.appendChild(div);
  });
}

/* ALBUMS */
function loadAlbums() {
  const row = document.getElementById("albumRow");
  row.innerHTML = "";

  albums.forEach((album, i) => {
    const div = document.createElement("div");
    div.className = "album-card";

    div.innerHTML = `
      <img src="${album.cover}">
      <div>${album.title}</div>
    `;

    div.onclick = () => openAlbum(i);
    row.appendChild(div);
  });
}

/* OPEN ALBUM */
function openAlbum(i) {
  currentAlbum = albums[i];
  const trackView = document.getElementById("trackView");
  trackView.innerHTML = "";

  currentAlbum.songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.className = "track";
    div.innerText = song.title;

    div.onclick = () => playSong(song, currentAlbum, index);
    trackView.appendChild(div);
  });
}

/* OPEN ARTIST */
function openArtist(i) {
  const artist = artists[i];
  const trackView = document.getElementById("trackView");
  trackView.innerHTML = "";

  artist.songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.className = "track";
    div.innerText = song.title;

    div.onclick = () => playSong(song, null, index);
    trackView.appendChild(div);
  });
}

/* CONTROLS */
playBtn.onclick = () => {
  if (!audio.src) return;

  if (isPlaying) {
    audio.pause();
    playBtn.innerText = "▶";
    isPlaying = false;
  } else {
    audio.play();
    playBtn.innerText = "⏸";
    isPlaying = true;
  }
};

nextBtn.onclick = () => {
  if (!currentAlbum) return;
  currentIndex = (currentIndex + 1) % currentAlbum.songs.length;
  playSong(currentAlbum.songs[currentIndex], currentAlbum, currentIndex);
};

prevBtn.onclick = () => {
  if (!currentAlbum) return;
  currentIndex =
    (currentIndex - 1 + currentAlbum.songs.length) %
    currentAlbum.songs.length;

  playSong(currentAlbum.songs[currentIndex], currentAlbum, currentIndex);
};

/* VOLUME */
volume.oninput = () => {
  audio.volume = volume.value;
};

/* SEARCH */
searchInput.oninput = () => {
  const q = searchInput.value.toLowerCase();
  const trackView = document.getElementById("trackView");
  trackView.innerHTML = "";

  albums.forEach(album => {
    album.songs.forEach((song, index) => {
      if (song.title.toLowerCase().includes(q)) {
        const div = document.createElement("div");
        div.className = "track";
        div.innerText = song.title;

        div.onclick = () => playSong(song, album, index);
        trackView.appendChild(div);
      }
    });
  });
};

/* THEME */
themeToggle.onclick = () => {
  document.body.classList.toggle("light");
};

loadHome();
