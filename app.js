const audio = new Audio();

let currentAlbum = null;
let currentIndex = 0;

/* =========================
   DATA
========================= */
const artists = [
{
  id: "kanye",
  name: "Kanye West",
  image: "images/kanye.png",
  bio: "Highly influential rapper and producer."
}
];

const albums = [
{
  id: "ye",
  title: "ye",
  artist: "Kanye West",
  cover: "music/ye/cover.jpg",
  tracks: [
    { number: 1, title: "I Thought About Killing You", file: "music/ye/1. I Thought About Killing You.mp3" },
    { number: 6, title: "Ghost Town", file: "music/ye/6. Ghost Town.mp3" }
  ]
},
{
  id: "dropout",
  title: "The College Dropout",
  artist: "Kanye West",
  cover: "music/dropout/cover.jpg",
  tracks: [
    { number: 1, title: "We Don't Care", file: "music/dropout/We Dont Care.mp3" },
    { number: 2, title: "Spaceship", file: "music/dropout/Spaceship.mp3" }
  ]
}
];

/* =========================
   BOOT SAFE (FIX BLACK SCREEN)
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  if (!app) {
    console.error("❌ Missing #app container");
    return;
  }

  renderHome();
  setupPlayer();
});

/* =========================
   HOME PAGE (APPLE STYLE)
========================= */
function renderHome() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <h2>Artists</h2>
    <div class="artist-grid">
      ${artists.map(a => `
        <div class="artist-card" onclick="openArtist('${a.id}')">
          <img src="${a.image}" onerror="this.style.display='none'">
          <p>${a.name}</p>
        </div>
      `).join("")}
    </div>

    <h2>Albums</h2>
    <div class="album-grid">
      ${albums.map(a => `
        <div class="album-card" onclick="openAlbum('${a.id}')">
          <img src="${a.cover}" onerror="this.style.display='none'">
          <p>${a.title}</p>
        </div>
      `).join("")}
    </div>
  `;
}

/* =========================
   ARTIST PAGE
========================= */
function openArtist(id) {
  const artist = artists.find(a => a.id === id);
  const app = document.getElementById("app");

  app.innerHTML = `
    <button onclick="renderHome()">← Back</button>

    <div class="artist-header">
      <img src="${artist.image}">
      <h1>${artist.name}</h1>
      <p>${artist.bio}</p>
    </div>

    <h2>Albums</h2>

    <div class="album-grid">
      ${albums.filter(a => a.artist === artist.name).map(a => `
        <div class="album-card" onclick="openAlbum('${a.id}')">
          <img src="${a.cover}">
          <p>${a.title}</p>
        </div>
      `).join("")}
    </div>
  `;
}

/* =========================
   ALBUM PAGE
========================= */
function openAlbum(id) {
  const album = albums.find(a => a.id === id);
  const app = document.getElementById("app");

  app.innerHTML = `
    <button onclick="renderHome()">← Home</button>

    <div class="album-header">
      <img src="${album.cover}">
      <h1>${album.title}</h1>
      <p>${album.artist}</p>
    </div>

    <div class="tracklist">
      ${album.tracks.map((t, i) => `
        <div class="track" onclick="playSong('${album.id}', ${i})">
          ${t.number}. ${t.title}
        </div>
      `).join("")}
    </div>
  `;
}

/* =========================
   PLAYER LOGIC
========================= */
function playSong(albumId, index) {
  const album = albums.find(a => a.id === albumId);
  const song = album.tracks[index];

  currentAlbum = album;
  currentIndex = index;

  audio.src = song.file;
  audio.play();

  document.getElementById("player-track-title").innerText = song.title;
  document.getElementById("player-track-artist").innerText = album.artist;
}

/* =========================
   CONTROLS
========================= */
function setupPlayer() {
  document.getElementById("play-btn").onclick = () => {
    if (!audio.src) return;
    audio.paused ? audio.play() : audio.pause();
  };

  document.getElementById("next-btn").onclick = () => {
    if (!currentAlbum) return;
    currentIndex = (currentIndex + 1) % currentAlbum.tracks.length;
    playSong(currentAlbum.id, currentIndex);
  };

  document.getElementById("prev-btn").onclick = () => {
    if (!currentAlbum) return;
    currentIndex = (currentIndex - 1 + currentAlbum.tracks.length) % currentAlbum.tracks.length;
    playSong(currentAlbum.id, currentIndex);
  };
}
