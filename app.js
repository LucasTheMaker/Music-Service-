const audio = new Audio();

let currentAlbum = null;
let currentIndex = 0;

/* =========================
   SAFE START
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  if (!app) {
    document.body.innerHTML = "<h2 style='color:white;padding:20px'>Missing #app div</h2>";
    return;
  }

  renderHome();
});

/* =========================
   ARTISTS
========================= */
const artists = [
  { id: "kanye", name: "Kanye West", image: "images/kanye.jpg" },
  { id: "mj", name: "Michael Jackson", image: "images/mj.jpg" },
  { id: "bruno", name: "Bruno Mars", image: "images/bruno.jpg" }
];

/* =========================
   ARTIST BIOS
========================= */
const artistData = {
  kanye: { name: "Kanye West", bio: "Rap artist and producer." },
  mj: { name: "Michael Jackson", bio: "King of Pop." },
  bruno: { name: "Bruno Mars", bio: "Pop and R&B artist." }
};

/* =========================
   ALBUMS (SAFE FALLBACK)
========================= */
const albums = window.albums || [];

/* =========================
   HOME PAGE
========================= */
function renderHome() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <h2>Artists</h2>

    <div class="artist-grid">
      ${artists.map(a => `
        <div class="artist-card" onclick="openArtist('${a.id}')">
          <img src="${a.image}" style="width:120px;border-radius:50%">
          <p>${a.name}</p>
        </div>
      `).join("")}
    </div>

    <h2>Albums</h2>

    <div class="album-grid">
      ${albums.map(a => `
        <div class="album-card" onclick="openAlbum('${a.id}')">
          <img src="${a.cover}">
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
  const app = document.getElementById("app");
  const artist = artistData[id];

  const artistAlbums = albums.filter(a =>
    a.artist?.toLowerCase().includes(artist.name.toLowerCase())
  );

  app.innerHTML = `
    <button onclick="renderHome()">← Back</button>

    <h1>${artist.name}</h1>
    <p>${artist.bio}</p>

    <h3>Albums</h3>

    <div class="album-grid">
      ${artistAlbums.map(a => `
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
  const app = document.getElementById("app");
  const album = albums.find(a => a.id === id);

  app.innerHTML = `
    <button onclick="renderHome()">← Back</button>

    <img src="${album.cover}" style="width:200px;border-radius:10px">

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
   AUDIO (SAFE)
========================= */
function playSong(albumId, index) {
  const album = albums.find(a => a.id === albumId);
  const song = album.tracks[index];

  currentAlbum = album;
  currentIndex = index;

  audio.src = song.file;
  audio.play();

  if (document.getElementById("player-track-title")) {
    document.getElementById("player-track-title").innerText = song.title;
    document.getElementById("player-track-artist").innerText = album.artist;
  }
}
