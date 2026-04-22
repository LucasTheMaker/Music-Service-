const audio = new Audio();

let currentAlbum = null;
let currentIndex = 0;

/* =========================
   STARTUP SAFETY
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  if (!app) {
    document.body.innerHTML = "<h2 style='color:red;padding:20px'>Missing #app</h2>";
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
  kanye: {
    name: "Kanye West",
    bio: "Influential rapper, producer, and designer."
  },
  mj: {
    name: "Michael Jackson",
    bio: "The King of Pop and global music icon."
  },
  bruno: {
    name: "Bruno Mars",
    bio: "Pop and R&B artist known for funk-inspired hits."
  }
};

/* =========================
   ALBUM DATA
========================= */
const albums = window.albums || [];

/* =========================
   HOME PAGE (ARTISTS ONLY)
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
  `;
}

/* =========================
   ARTIST PAGE (FIXED FILTERING)
========================= */
function openArtist(id) {
  const app = document.getElementById("app");
  const artist = artistData[id];

  if (!artist) return;

  const artistName = artist.name.toLowerCase().trim();

  const artistAlbums = albums.filter(a => {
    if (!a.artist) return false;
    return a.artist.toLowerCase().trim().includes(artistName);
  });

  app.innerHTML = `
    <button onclick="renderHome()">← Back</button>

    <h1>${artist.name}</h1>
    <p>${artist.bio}</p>

    <h3>Albums</h3>

    <div class="album-grid">
      ${artistAlbums.length ? artistAlbums.map(a => `
        <div class="album-card" onclick="openAlbum('${a.id}')">
          <img src="${a.cover}">
          <p>${a.title}</p>
        </div>
      `).join("") : "<p style='color:white'>No albums found</p>"}
    </div>
  `;
}

/* =========================
   ALBUM PAGE
========================= */
function openAlbum(id) {
  const app = document.getElementById("app");
  const album = albums.find(a => a.id === id);

  if (!album) return;

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
   AUDIO ENGINE (UNCHANGED LOGIC)
========================= */
function playSong(albumId, index) {
  const album = albums.find(a => a.id === albumId);
  const song = album?.tracks?.[index];

  if (!album || !song) return;

  currentAlbum = album;
  currentIndex = index;

  audio.pause();
  audio.src = song.file;
  audio.load();

  audio.onerror = () => {
    console.error("Missing file:", song.file);
  };

  audio.oncanplay = () => {
    audio.play();
  };
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
