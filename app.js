const audio = new Audio();

let currentAlbum = null;
let currentIndex = 0;
let isPlaying = false;

/* =========================
   ARTISTS
========================= */
const artists = [
{ id: "kanye", name: "Kanye West", image: "images/kanye.jpg" },
{ id: "mj", name: "Michael Jackson", image: "images/mj.jpg" },
{ id: "bruno", name: "Bruno Mars", image: "images/bruno.jpg" }
];

/* =========================
   ALBUMS (DO NOT TOUCH TRACKLISTS)
========================= */
const albums = window.albums || [];

/* =========================
   RENDER HOME
========================= */
document.addEventListener("DOMContentLoaded", renderHome);

function renderHome() {
const app = document.getElementById("app");

app.innerHTML = `
<h2>Albums</h2>

<div class="album-grid">
${albums.map(a => `
<div class="album-card" onclick="openAlbum('${a.id}')">
<img src="${a.cover}">
<p>${a.title}</p>
</div>
`).join("")}
</div>

<h2>Artists</h2>

<div class="artist-grid">
${artists.map(a => `
<div class="artist-card">
<img src="${a.image}">
<p>${a.name}</p>
</div>
`).join("")}
</div>
`;
}

/* =========================
   OPEN ALBUM
========================= */
function openAlbum(id) {
const album = albums.find(a => a.id === id);
const app = document.getElementById("app");

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
   🔥 PLAYER (FIXED, NO DATA TOUCH)
========================= */
function playSong(albumId, index) {
const album = albums.find(a => a.id === albumId);
const song = album.tracks[index];

currentAlbum = album;
currentIndex = index;

audio.src = song.file;

/* ERROR HANDLING */
audio.onerror = () => {
console.error("Missing file:", song.file);
};

/* PLAY */
audio.oncanplay = () => {
audio.play();
isPlaying = true;

document.getElementById("player-cover").src = album.cover;
document.getElementById("player-track-title").innerText = song.title;
document.getElementById("player-track-artist").innerText = album.artist;
};
}

/* =========================
   CONTROLS
========================= */
function togglePlay() {
if (audio.paused) {
audio.play();
} else {
audio.pause();
}
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
