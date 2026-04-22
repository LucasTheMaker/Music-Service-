const audio = new Audio();

let currentAlbum = null;
let currentIndex = 0;

/* =========================
   ARTISTS
========================= */
const artists = [
{ id: "kanye", name: "Kanye West", image: "images/kanye.jpg" },
{ id: "mj", name: "Michael Jackson", image: "images/mj.jpg" },
{ id: "bruno", name: "Bruno Mars", image: "images/bruno.jpg" }
];

/* =========================
   ALBUMS (ONLY COVER FIXES + LABEL ADDED)
========================= */
const albums = [

{
id: "dropout",
title: "The College Dropout",
artist: "Kanye West",
label: "Roc-A-Fella Records",
cover: "music/dropout/dropout.jpg",   // FIXED
tracks: window.albums?.find(a => a.id === "dropout")?.tracks || []
},

{
id: "late",
title: "Late Registration",
artist: "Kanye West",
label: "Roc-A-Fella Records",
cover: "music/late/late-registration.png",  // FIXED
tracks: window.albums?.find(a => a.id === "late")?.tracks || []
},

{
id: "ye",
title: "ye",
artist: "Kanye West",
label: "GOOD Music",
cover: "music/ye/ye.jpg",  // FIXED
tracks: window.albums?.find(a => a.id === "ye")?.tracks || []
},

{
id: "thriller",
title: "Thriller",
artist: "Michael Jackson",
label: "Epic Records",
cover: "music/thriller/cover.jpg",
tracks: window.albums?.find(a => a.id === "thriller")?.tracks || []
},

{
id: "romantic",
title: "The Romantic",
artist: "Bruno Mars",
label: "Atlantic Records",
cover: "music/romantic/cover.jpg",
tracks: window.albums?.find(a => a.id === "romantic")?.tracks || []
}

];

/* =========================
   HOME RENDER
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
<small>${a.label}</small>
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
<p><strong>${album.label}</strong></p>

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
   AUDIO PLAYER (UNCHANGED FIX)
========================= */
function playSong(albumId, index) {
const album = albums.find(a => a.id === albumId);
const song = album.tracks[index];

currentAlbum = album;
currentIndex = index;

audio.src = song.file;

audio.onerror = () => {
console.error("Missing:", song.file);
document.getElementById("player-track-title").innerText =
"Missing: " + song.title;
};

audio.oncanplay = () => {
audio.play();

document.getElementById("player-track-title").innerText = song.title;
document.getElementById("player-track-artist").innerText = album.artist;
};
}
