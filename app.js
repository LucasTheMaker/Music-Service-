const audio = new Audio();

let currentAlbum = null;
let currentIndex = 0;

document.addEventListener("DOMContentLoaded", renderHome);

const albums = window.albums || [];

/* =========================
   HOME (APPLE MUSIC STYLE)
========================= */
function renderHome() {
  const app = document.getElementById("app");

  const artists = [...new Set(albums.map(a => a.artist))];

  app.innerHTML = `
    <h2>Artists</h2>

    <div class="scroll">
      ${artists.map(a => `
        <div class="chip" onclick="filterArtist('${a}')">${a}</div>
      `).join("")}
    </div>

    <h2>Albums</h2>

    <div class="grid">
      ${albums.map(a => `
        <div class="card" onclick="openAlbum('${a.id}')">
          <img src="${a.cover}">
          <p>${a.title}</p>
        </div>
      `).join("")}
    </div>
  `;
}

/* =========================
   FILTER ARTIST
========================= */
function filterArtist(name) {
  const app = document.getElementById("app");

  const filtered = albums.filter(a =>
    a.artist.toLowerCase().includes(name.toLowerCase())
  );

  app.innerHTML = `
    <button onclick="renderHome()">← Back</button>

    <h2>${name}</h2>

    <div class="grid">
      ${filtered.map(a => `
        <div class="card" onclick="openAlbum('${a.id}')">
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
  const app = document.getElementById("app");
  const album = albums.find(a => a.id === id);

  app.innerHTML = `
    <button onclick="renderHome()">← Back</button>

    <img src="${album.cover}" class="hero">

    <h2>${album.title}</h2>
    <p>${album.artist}</p>

    <div class="tracks">
      ${album.tracks.map((t,i) => `
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

  currentAlbum = album;
  currentIndex = index;

  audio.src = song.file;
  audio.play();

  document.getElementById("now").innerText =
    song.title + " • " + album.artist;
}

function togglePlay() {
  if (audio.paused) audio.play();
  else audio.pause();
}

function nextSong() {
  if (!currentAlbum) return;
  currentIndex++;
  if (currentIndex >= currentAlbum.tracks.length) currentIndex = 0;
  playSong(currentAlbum.id, currentIndex);
}

function prevSong() {
  if (!currentAlbum) return;
  currentIndex--;
  if (currentIndex < 0) currentIndex = currentAlbum.tracks.length - 1;
  playSong(currentAlbum.id, currentIndex);
}
