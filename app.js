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
   ALBUM DATA (UNCHANGED TRACKLISTS)
========================= */
const albums = window.albums;

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
   AUDIO ENGINE (ALL FIXES)
========================= */
function playSong(albumId, index) {
  const album = albums.find(a => a.id === albumId);
  const song = album.tracks[index];

  currentAlbum = album;
  currentIndex = index;

  let file = song.file;

  /* =========================
     YE FIX
  ========================= */
  if (album.id === "ye") {
    const yeMap = {
      "1. I Thought About Killing You.mp3": "1. I Thought About Killing You.mp3",
      "2. Yikes.mp3": "2. Yikes.mp3",
      "3. All Mine.mp3": "3. All Mine.mp3",
      "4. Wouldn't Leave.mp3": "4. Wouldn't Leave.mp3",
      "5. No Mistakes.mp3": "5. No Mistakes.mp3",
      "6. Ghost Town.mp3": "6. Ghost Town.mp3",
      "7. Violent Crimes.mp3": "7. Violent Crimes.mp3"
    };
    file = yeMap[file] || file;
  }

  /* =========================
     LATE REG FIX
  ========================= */
  if (album.id === "late") {
    const lateMap = {
      "Skits 1.mp3": "Skits 1.mp3",
      "Skits 2.mp3": "Skits 2.mp3",
      "Skits 3.mp3": "Skits 3.mp3",
      "Skits 4.mp3": "Skits 4.mp3",
      "Diamonds From Sierra Leone.mp3": "Diamonds From Sierra Leone.mp3",
      "Diamonds From Sierra Leone Remix.mp3": "Diamonds From Sierra Leone Remix.mp3"
    };
    file = lateMap[file] || file;
  }

  /* =========================
     THRILLER FIX
  ========================= */
  if (album.id === "thriller") {
    const thrillerMap = {
      "Wanna Be Startin Somethin.mp3": "Wanna Be Startin Somethin.mp3",
      "Baby Be Mine.mp3": "Baby Be Mine.mp3",
      "The Girl Is Mine.mp3": "The Girl Is Mine.mp3",
      "Thriller.mp3": "Thriller.mp3",
      "Beat It.mp3": "Beat It.mp3",
      "Billie Jean.mp3": "Billie Jean.mp3",
      "Human Nature.mp3": "Human Nature.mp3",
      "P Y T Pretty Young Thing.mp3": "P Y T Pretty Young Thing.mp3",
      "The Lady In My Life.mp3": "The Lady In My Life.mp3"
    };
    file = thrillerMap[file] || file;
  }

  /* =========================
     ROMANTIC FIX
  ========================= */
  if (album.id === "romantic") {
    const romanticMap = {
      "01 Risk It All.mp3": "01 Risk It All.mp3",
      "02 Cha Cha Cha.mp3": "02 Cha Cha Cha.mp3",
      "03 I Just Might.mp3": "03 I Just Might.mp3",
      "04 God Was Showing Off.mp3": "04 God Was Showing Off.mp3",
      "05 Why You Wanna Fight-.mp3": "05 Why You Wanna Fight-.mp3",
      "06 On My Soul.mp3": "06 On My Soul.mp3",
      "07 Something Serious.mp3": "07 Something Serious.mp3",
      "08 Nothing Left.mp3": "08 Nothing Left.mp3",
      "09 Dance With Me.mp3": "09 Dance With Me.mp3"
    };
    file = romanticMap[file] || file;
  }

  /* =========================
     PLAYBACK SAFETY
  ========================= */
  audio.pause();
  audio.src = file;
  audio.load();

  audio.onerror = () => {
    console.error("❌ Missing file:", file);
    document.getElementById("player-track-title").innerText =
      "Missing: " + song.title;
  };

  audio.oncanplay = () => {
    audio.play();

    document.getElementById("player-cover").src = album.cover;
    document.getElementById("player-track-title").innerText = song.title;
    document.getElementById("player-track-artist").innerText = album.artist;
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
