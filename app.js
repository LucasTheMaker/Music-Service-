const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const volume = document.getElementById("volume");

const trackName = document.getElementById("trackName");
const subText = document.getElementById("subText");
const main = document.getElementById("main");

const searchInput = document.getElementById("search");
const themeToggle = document.getElementById("themeToggle");

let currentAlbum = null;
let currentIndex = 0;
let isPlaying = false;

/* =========================
   DATA
========================= */
const albums = [
  {
    title: "ye",
    artist: "Kanye West",
    cover: "images/ye.jpg",
    description: "A deeply personal 7-track album.",
    songs: [
      { title: "I Thought About Killing You", file: "music/1. I Thought About Killing You.mp3" },
      { title: "Yikes", file: "music/2. Yikes.mp3" },
      { title: "All Mine", file: "music/3. All Mine.mp3" },
      { title: "Wouldn't Leave", file: "music/4. Wouldn't Leave.mp3" },
      { title: "No Mistakes", file: "music/5. No Mistakes.mp3" },
      { title: "Ghost Town", file: "music/6. Ghost Town.mp3" },
      { title: "Violent Crimes", file: "music/7. Violent Crimes.mp3" }
    ]
  }
];

/* 👤 ARTIST IMAGE = kanye.png */
const artists = [
  {
    name: "Kanye West",
    image: "images/kanye.png",
    bio: `Kanye West is an influential rapper, producer, and designer known for reshaping hip-hop.`,
    albums: [albums[0]]
  }
];

/* =========================
   PLAY SONG
========================= */
function playSong(song, album, index) {
  audio.src = encodeURI(song.file);
  audio.load();
  audio.play();

  trackName.innerText = song.title;
  subText.innerText = album.artist;

  currentAlbum = album;
  currentIndex = index;

  isPlaying = true;
  playBtn.innerText = "⏸";
}

/* =========================
   PLAY ALBUM
========================= */
function playAlbum(album) {
  playSong(album.songs[0], album, 0);
}

/* =========================
   AUTO NEXT
========================= */
audio.addEventListener("ended", () => {
  if (!currentAlbum) return;

  currentIndex++;

  if (currentIndex < currentAlbum.songs.length) {
    playSong(currentAlbum.songs[currentIndex], currentAlbum, currentIndex);
  } else {
    isPlaying = false;
    playBtn.innerText = "▶";
  }
});

/* =========================
   HOME
========================= */
function showHome() {
  main.innerHTML = `
    <h1>Artists</h1>
    <div id="artistRow"></div>
  `;

  const row = document.getElementById("artistRow");

  artists.forEach((artist, i) => {
    const div = document.createElement("div");
    div.className = "artist-card";

    div.innerHTML = `
      <img src="${artist.image}">
      <h3>${artist.name}</h3>
    `;

    div.onclick = () => showArtist(i);
    row.appendChild(div);
  });
}

/* =========================
   ARTIST PAGE (APPLE STYLE)
========================= */
function showArtist(i) {
  const artist = artists[i];

  main.innerHTML = `
    <div class="artist-hero">
      <img src="${artist.image}">
      <div class="artist-overlay">
        <h1>${artist.name}</h1>
        <p>${artist.bio}</p>
        <button id="back">← Back</button>
      </div>
    </div>

    <h2>Albums</h2>
    <div id="albumRow"></div>
  `;

  document.getElementById("back").onclick = showHome;

  const row = document.getElementById("albumRow");

  artist.albums.forEach(album => {
    const div = document.createElement("div");
    div.className = "album-card";

    div.innerHTML = `
      <img src="${album.cover}">
      <p>${album.title}</p>
    `;

    div.onclick = () => showAlbum(album);
    row.appendChild(div);
  });
}

/* =========================
   ALBUM PAGE
========================= */
function showAlbum(album) {
  main.innerHTML = `
    <img src="${album.cover}" style="width:250px;border-radius:20px;">
    <h1>${album.title}</h1>
    <p>${album.description}</p>

    <button id="playAlbum">▶ Play Album</button>
    <button id="backArtist">← Back</button>

    <h3>Tracks</h3>
    <div id="trackList"></div>
  `;

  document.getElementById("playAlbum").onclick = () => playAlbum(album);
  document.getElementById("backArtist").onclick = showHome;

  const list = document.getElementById("trackList");

  album.songs.forEach((song, i) => {
    const div = document.createElement("div");
    div.className = "track";
    div.innerText = `${i + 1}. ${song.title}`;

    div.onclick = () => playSong(song, album, i);
    list.appendChild(div);
  });
}

/* CONTROLS */
playBtn.onclick = () => {
  if (!audio.src) return;

  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    playBtn.innerText = "▶";
  } else {
    audio.play();
    isPlaying = true;
    playBtn.innerText = "⏸";
  }
};

nextBtn.onclick = () => {
  if (!currentAlbum) return;
  currentIndex = (currentIndex + 1) % currentAlbum.songs.length;
  playSong(currentAlbum.songs[currentIndex], currentAlbum, currentIndex);
};

prevBtn.onclick = () => {
  if (!currentAlbum) return;
  currentIndex =
    (currentIndex - 1 + currentAlbum.songs.length) %
    currentAlbum.songs.length;

  playSong(currentAlbum.songs[currentIndex], currentAlbum, currentIndex);
};

volume.oninput = () => {
  audio.volume = volume.value;
};

themeToggle.onclick = () => {
  document.body.classList.toggle("light");
};

searchInput.oninput = () => {
  const q = searchInput.value.toLowerCase();
  main.innerHTML = "<h2>Search</h2>";

  albums.forEach(album => {
    album.songs.forEach((song, i) => {
      if (song.title.toLowerCase().includes(q)) {
        const div = document.createElement("div");
        div.className = "track";
        div.innerText = song.title;
        div.onclick = () => playSong(song, album, i);
        main.appendChild(div);
      }
    });
  });
};

showHome();
