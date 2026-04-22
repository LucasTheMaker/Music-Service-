const audio = new Audio();

let currentAlbum = null;
let currentIndex = 0;

/* =========================
   START
========================= */
document.addEventListener("DOMContentLoaded", () => {
  renderHome();
});

/* =========================
   SAFE LOAD
========================= */
const albums = window.albums || [];

console.log("ALBUMS LOADED:", albums);

/* =========================
   ARTISTS
========================= */
const artists = [
  { id: "kanye", name: "Kanye West" },
  { id: "mj", name: "Michael Jackson" }
];

/* =========================
   HOME PAGE
========================= */
function renderHome() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <h2>Artists</h2>

    <div class="artist-grid">
      ${artists.map(a => `
        <div class="artist-card" onclick="openArtist('${a.name}')">
          <p>${a.name}</p>
        </div>
      `).join("")}
    </div>
  `;
}

/* =========================
   ARTIST PAGE (FIXED FILTER)
========================= */
function openArtist(name) {
  const app = document.getElementById("app");

  const artistAlbums = albums.filter(a =>
    a.artist.toLowerCase().includes(name.toLowerCase())
  );

  app.innerHTML = `
    <button onclick="renderHome()">← Back</button>

    <h1>${name}</h1>

    <div class="album-grid">
      ${artistAlbums.length
        ? artistAlbums.map(a => `
            <div class="album-card" onclick="openAlbum('${a.id}')">
              <img src="${a.cover}" width="150">
              <p>${a.title}</p>
            </div>
          `).join("")
        : "<p>No albums found</p>"
      }
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

    <h1>${album.title}</h1>
    <p>${album.artist}</p>

    <div class="tracklist">
      ${album.tracks.map((t,i) => `
        <div onclick="playSong('${album.id}', ${i})">
          ${t.number}. ${t.title}
        </div>
      `).join("")}
    </div>
  `;
}

/* =========================
   AUDIO
========================= */
function playSong(albumId, index) {
  const album = albums.find(a => a.id === albumId);
  const song = album.tracks[index];

  currentAlbum = album;
  currentIndex = index;

  audio.src = song.file;
  audio.play();
}

/* =========================
   CONTROLS
========================= */
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
