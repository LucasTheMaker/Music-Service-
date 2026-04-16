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

/* =========================
   YE ALBUM (FULL TRACKLIST)
========================= */
const albums = [
  {
    title: "ye",
    artist: "Kanye West",
    cover: "images/ye.jpg",
    songs: [
      { title: "I Thought About Killing You", file: "music/1.mp3" },
      { title: "Yikes", file: "music/2.mp3" },
      { title: "All Mine", file: "music/3.mp3" },
      { title: "Wouldn't Leave", file: "music/4.mp3" },
      { title: "No Mistakes", file: "music/5.mp3" },
      { title: "Ghost Town", file: "music/6.mp3" },
      { title: "Violent Crimes", file: "music/7.mp3" }
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

/* PLAY */
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
    <h1>Home</h1>

    <h2>Artists</h2>
    <div class="artist-grid" id="artistRow"></div>

    <h2>Albums</h2>
    <div class="album-grid" id="albumRow"></div>

    <div id="detailView"></div>
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
      <div class="album-title">${album.title}</div>
    `;

    div.onclick = () => openAlbum(i);
    row.appendChild(div);
  });
}

/* ALBUM PAGE */
function openAlbum(i) {
  const album = albums[i];

  const view = document.getElementById("detailView");
  view.innerHTML = `
    <h2>${album.title}</h2>
    <p>${album.artist}</p>
    <img src="${album.cover}" style="width:200px;border-radius:12px;">
    <h3>Tracklist</h3>
  `;

  album.songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.className = "track";
    div.innerText = `${index + 1}. ${song.title}`;

    div.onclick = () => playSong(song, album, index);
    view.appendChild(div);
  });
}

/* ARTIST PAGE */
function openArtist(i) {
  const artist = artists[i];

  const view = document.getElementById("detailView");
  view.innerHTML = `
    <h2>${artist.name}</h2>
    <h3>Songs</h3>
  `;

  artist.songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.className = "track";
    div.innerText = song.title;

    div.onclick = () => playSong(song, null, index);
    view.appendChild(div);
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

volume.oninput = () => {
  audio.volume = volume.value;
};

searchInput.oninput = () => {
  const q = searchInput.value.toLowerCase();
  const view = document.getElementById("detailView");
  view.innerHTML = "<h3>Search Results</h3>";

  albums.forEach(album => {
    album.songs.forEach((song, index) => {
      if (song.title.toLowerCase().includes(q)) {
        const div = document.createElement("div");
        div.className = "track";
        div.innerText = song.title;

        div.onclick = () => playSong(song, album, index);
        view.appendChild(div);
      }
    });
  });
};

themeToggle.onclick = () => {
  document.body.classList.toggle("light");
};

loadHome();
