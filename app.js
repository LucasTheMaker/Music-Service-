console.log("🚀 app.js loaded");

const audio = new Audio();

let currentAlbum = null;
let currentIndex = 0;

/* =========================
   DATA SAFETY WRAP
========================= */
const artists = window.artists || [
{
  id: "kanye",
  name: "Kanye West",
  image: "images/kanye.png",
  bio: "Artist"
}
];

const albums = window.albums || [
{
  id: "ye",
  title: "ye",
  artist: "Kanye West",
  cover: "music/ye/cover.jpg",
  tracks: [
    { number: 1, title: "Ghost Town", file: "music/ye/6. Ghost Town.mp3" }
  ]
}
];

/* =========================
   BOOT SYSTEM (FAIL SAFE)
========================= */
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM READY");

  const app = document.getElementById("app");

  if (!app) {
    console.error("❌ #app not found in HTML");
    return;
  }

  try {
    renderHome();
    setupPlayer();
    console.log("✅ App rendered successfully");
  } catch (err) {
    console.error("❌ RENDER ERROR:", err);

    app.innerHTML = `
      <h2 style="color:red">App crashed</h2>
      <p>Check console for error</p>
    `;
  }
});

/* =========================
   HOME
========================= */
function renderHome() {
  const app = document.getElementById("app");

  console.log("Rendering home...");

  app.innerHTML = `
    <h2>Artists</h2>
    <div class="artist-grid">
      ${artists.map(a => `
        <div onclick="openArtist('${a.id}')">
          <img src="${a.image}">
          <p>${a.name}</p>
        </div>
      `).join("")}
    </div>

    <h2>Albums</h2>
    <div class="album-grid">
      ${albums.map(a => `
        <div onclick="openAlbum('${a.id}')">
          <img src="${a.cover}">
          <p>${a.title}</p>
        </div>
      `).join("")}
    </div>
  `;
}

/* =========================
   ALBUM
========================= */
function openAlbum(id) {
  const album = albums.find(a => a.id === id);
  const app = document.getElementById("app");

  if (!album) {
    console.error("Album not found:", id);
    return;
  }

  app.innerHTML = `
    <button onclick="renderHome()">← Back</button>

    <h1>${album.title}</h1>
    <p>${album.artist}</p>

    <div>
      ${album.tracks.map((t, i) => `
        <div onclick="playSong('${album.id}', ${i})">
          ${t.number}. ${t.title}
        </div>
      `).join("")}
    </div>
  `;
}

/* =========================
   PLAYER
========================= */
function playSong(albumId, index) {
  const album = albums.find(a => a.id === albumId);
  const song = album.tracks[index];

  if (!song) {
    console.error("Song missing:", index);
    return;
  }

  currentAlbum = album;
  currentIndex = index;

  console.log("Playing:", song.file);

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
}
