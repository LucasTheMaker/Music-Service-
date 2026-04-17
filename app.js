
const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const volume = document.getElementById("volume");

const trackName = document.getElementById("trackName");
const subText = document.getElementById("subText");
const main = document.getElementById("main");
const searchInput = document.getElementById("search");

let currentAlbum = null;
let currentIndex = 0;
let isPlaying = false;

/* =========================
   DEBUG (IMPORTANT)
========================= */
window.onerror = (msg, src, line) => {
  console.log("JS ERROR:", msg, "Line:", line);
};

audio.addEventListener("error", () => {
  console.log("AUDIO FAILED:", audio.src);
});

/* =========================
   ALBUMS
========================= */
const albums = [

{
  title: "ye",
  artist: "Kanye West",
  cover: "images/ye.jpg",
  description: "2018 album.",
  songs: [
    { title: "I Thought About Killing You", file: "music/ye/I Thought About Killing You.mp3" },
    { title: "Yikes", file: "music/ye/Yikes.mp3" },
    { title: "All Mine", file: "music/ye/All Mine.mp3" },
    { title: "Wouldnt Leave", file: "music/ye/Wouldnt Leave.mp3" },
    { title: "No Mistakes", file: "music/ye/No Mistakes.mp3" },
    { title: "6. Ghost Town", file: "music/ye/6. Ghost Town.mp3" },
    { title: "Violent Crimes", file: "music/ye/Violent Crimes.mp3" }
  ]
},

{
  title: "The College Dropout",
  artist: "Kanye West",
  cover: "images/dropout.jpg",
  description: "Debut album.",
  songs: [
    { title: "We Dont Care", file: "music/dropout/We Dont Care.mp3" },
    { title: "Spaceship", file: "music/dropout/Spaceship.mp3" },
    { title: "Jesus Walks", file: "music/dropout/Jesus Walks.mp3" }
  ]
}

];

/* =========================
   ARTISTS
========================= */
const artists = [
{
  name: "Kanye West",
  image: "images/kanye.png",
  bio: "Artist and producer.",
  albums: albums
}
];

/* =========================
   START
========================= */
window.onload = showHome;

/* =========================
   HOME
========================= */
function showHome() {
  try {
    main.innerHTML = "<h1>Artists</h1><div id='list'></div>";
    const list = document.getElementById("list");

    artists.forEach((a, i) => {
      const div = document.createElement("div");
      div.className = "artist-card";
      div.innerHTML = `<img src="${a.image}"><h3>${a.name}</h3>`;
      div.onclick = () => showArtist(i);
      list.appendChild(div);
    });

  } catch (e) {
    console.log("HOME ERROR:", e);
  }
}

/* =========================
   ARTIST PAGE
========================= */
function showArtist(i) {
  const artist = artists[i];

  main.innerHTML = `
    <div>
      <img src="${artist.image}" width="100%">
      <h1>${artist.name}</h1>
      <p>${artist.bio}</p>
      <button onclick="showHome()">Back</button>
    </div>
    <div id="albums"></div>
  `;

  const container = document.getElementById("albums");

  artist.albums.forEach(album => {
    const div = document.createElement("div");
    div.className = "album-card";
    div.innerHTML = `<img src="${album.cover}"><p>${album.title}</p>`;
    div.onclick = () => showAlbum(album);
    container.appendChild(div);
  });
}

/* =========================
   ALBUM PAGE (SAFE)
========================= */
function showAlbum(album) {
  try {
    main.innerHTML = `
      <img src="${album.cover}" width="200">
      <h1>${album.title}</h1>
      <h3>${album.artist}</h3>
      <p>${album.description}</p>

      <button id="playAlbum">Play Album</button>
      <button onclick="showHome()">Back</button>

      <div id="tracks"></div>
    `;

    const tracks = document.getElementById("tracks");

    album.songs.forEach((song, i) => {
      const div = document.createElement("div");
      div.className = "track";
      div.innerText = song.title;
      div.onclick = () => playSong(song, album, i);
      tracks.appendChild(div);
    });

    document.getElementById("playAlbum").onclick = () => {
      playSong(album.songs[0], album, 0);
    };

  } catch (e) {
    console.log("ALBUM ERROR:", e);
  }
}

/* =========================
   PLAYER (SAFE)
========================= */
function playSong(song, album, index) {
  if (!song || !song.file) {
    console.log("BAD SONG:", song);
    return;
  }

  console.log("PLAY:", song.file);

  audio.pause();
  audio.src = song.file;

  audio.play().catch(err => {
    console.log("PLAY ERROR:", song.file, err);
  });

  trackName.innerText = song.title;
  subText.innerText = album.artist;

  currentAlbum = album;
  currentIndex = index;

  isPlaying = true;
  playBtn.innerText = "⏸";
}

/* AUTO NEXT */
audio.onended = () => {
  if (!currentAlbum) return;

  currentIndex++;
  if (currentIndex >= currentAlbum.songs.length) currentIndex = 0;

  playSong(currentAlbum.songs[currentIndex], currentAlbum, currentIndex);
};

/* CONTROLS */
playBtn.onclick = () => {
  if (!audio.src) return;

  if (isPlaying) audio.pause();
  else audio.play();

  isPlaying = !isPlaying;
  playBtn.innerText = isPlaying ? "⏸" : "▶";
};

nextBtn.onclick = () => {
  if (!currentAlbum) return;

  currentIndex++;
  if (currentIndex >= currentAlbum.songs.length) currentIndex = 0;

  playSong(currentAlbum.songs[currentIndex], currentAlbum, currentIndex);
};

prevBtn.onclick = () => {
  if (!currentAlbum) return;

  currentIndex--;
  if (currentIndex < 0) currentIndex = currentAlbum.songs.length - 1;

  playSong(currentAlbum.songs[currentIndex], currentAlbum, currentIndex);
};

volume.oninput = () => audio.volume = volume.value;
