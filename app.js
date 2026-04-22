const audio = new Audio();

let currentAlbum = null;
let currentIndex = 0;

/* =========================
   ARTISTS (RESTORED)
========================= */
const artists = [
{
  id: "kanye",
  name: "Kanye West",
  image: "images/kanye.jpg",
  bio: "American rapper and producer."
},
{
  id: "mj",
  name: "Michael Jackson",
  image: "images/mj.jpg",
  bio: "King of Pop."
},
{
  id: "bruno",
  name: "Bruno Mars",
  image: "images/bruno.jpg",
  bio: "Singer and performer."
}
];

/* =========================
   ALBUMS (FULL RESTORED)
========================= */
const albums = [

/* KANYE */
{
id: "dropout",
title: "The College Dropout",
artist: "Kanye West",
cover: "music/dropout/cover.jpg",
tracks: [
{ number: 1, title: "We Don't Care", file: "music/dropout/We Dont Care.mp3" },
{ number: 2, title: "Spaceship", file: "music/dropout/Spaceship.mp3" },
{ number: 3, title: "Jesus Walks", file: "music/dropout/Jesus Walks.mp3" },
{ number: 4, title: "Through The Wire", file: "music/dropout/Through The Wire.mp3" }
]
},

{
id: "late",
title: "Late Registration",
artist: "Kanye West",
cover: "music/late/cover.jpg",
tracks: [
{ number: 1, title: "Gold Digger", file: "music/late/Gold Digger.mp3" },
{ number: 2, title: "Touch The Sky", file: "music/late/Touch The Sky.mp3" },
{ number: 3, title: "Heard 'Em Say", file: "music/late/Heard Em Say.mp3" },
{ number: 4, title: "We Major", file: "music/late/We Major.mp3" }
]
},

{
id: "ye",
title: "ye",
artist: "Kanye West",
cover: "music/ye/cover.jpg",
tracks: [
{ number: 1, title: "I Thought About Killing You", file: "music/ye/1. I Thought About Killing You.mp3" },
{ number: 2, title: "Yikes", file: "music/ye/2. Yikes.mp3" },
{ number: 3, title: "All Mine", file: "music/ye/3. All Mine.mp3" },
{ number: 4, title: "Wouldn't Leave", file: "music/ye/4. Wouldn't Leave.mp3" },
{ number: 5, title: "No Mistakes", file: "music/ye/5. No Mistakes.mp3" },
{ number: 6, title: "Ghost Town", file: "music/ye/6. Ghost Town.mp3" },
{ number: 7, title: "Violent Crimes", file: "music/ye/7. Violent Crimes.mp3" }
]
},

/* MICHAEL JACKSON */
{
id: "thriller",
title: "Thriller",
artist: "Michael Jackson",
cover: "music/thriller/cover.jpg",
tracks: [
{ number: 1, title: "Wanna Be Startin' Somethin'", file: "music/thriller/Wanna Be Startin Somethin.mp3" },
{ number: 2, title: "Thriller", file: "music/thriller/Thriller.mp3" },
{ number: 3, title: "Beat It", file: "music/thriller/Beat It.mp3" },
{ number: 4, title: "Billie Jean", file: "music/thriller/Billie Jean.mp3" }
]
},

/* BRUNO MARS */
{
id: "romantic",
title: "The Romantic",
artist: "Bruno Mars",
cover: "music/romantic/cover.jpg",
tracks: [
{ number: 1, title: "Risk It All", file: "music/romantic/Risk It All.mp3" },
{ number: 2, title: "Cha Cha Cha", file: "music/romantic/Cha Cha Cha.mp3" },
{ number: 3, title: "I Just Might", file: "music/romantic/I Just Might.mp3" }
]
}

];

/* =========================
   BOOT (PREVENTS BLACK SCREEN)
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  if (!app) {
    console.error("Missing #app");
    return;
  }

  renderHome();
});

/* =========================
   HOME (ALL ALBUMS GUARANTEED)
========================= */
function renderHome() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <h2>Albums</h2>

    <div class="album-grid">
      ${albums.map(a => `
        <div class="album-card" onclick="openAlbum('${a.id}')">
          <img src="${a.cover}" onerror="this.style.display='none'">
          <p>${a.title}</p>
        </div>
      `).join("")}
    </div>

    <h2>Artists</h2>

    <div class="artist-grid">
      ${artists.map(a => `
        <div class="artist-card" onclick="openArtist('${a.id}')">
          <img src="${a.image}" onerror="this.style.display='none'">
          <p>${a.name}</p>
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
    <button onclick="renderHome()">← Back</button>

    <div class="album-header">
      <img src="${album.cover}">
      <h1>${album.title}</h1>
      <p>${album.artist}</p>
    </div>

    <div class="tracklist">
      ${album.tracks.map((t,i) => `
        <div class="track" onclick="playSong('${album.id}', ${i})">
          ${t.number}. ${t.title}
        </div>
      `).join("")}
    </div>
  `;
}

/* =========================
   PLAYER (UNCHANGED — SAFE)
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
