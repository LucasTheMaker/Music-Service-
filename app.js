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
    year: "2018",
    label: "GOOD Music / Def Jam Recordings",
    description:
      "A raw 7-track album exploring mental health, fame, relationships, and identity.",
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

const artists = [
  {
    name: "Kanye West",
    image: "images/ye.jpg",
    bio: "American rapper, producer, and designer.",
    albums: [albums[0]]
  }
];

/* =========================
   PLAY SONG
========================= */
function playSong(song, album = null, index = 0) {
  const safePath = encodeURI(song.file);

  audio.src = safePath;
  audio.load();
  audio.play().catch(err => console.log(err));

  trackName.innerText = song.title;
  subText.innerText = album ? album.artist : "Kanye West";

  currentAlbum = album;
  currentIndex = index;

  isPlaying = true;
  playBtn.innerText = "⏸";
}

/* =========================
   PLAY FULL ALBUM
========================= */
function playAlbum(album) {
  currentAlbum = album;
  currentIndex = 0;
  playSong(album.songs[0], album, 0);
}

/* =========================
   AUTO NEXT SONG
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
    <h1>Home</h1>

    <h2>Artists</h2>
    <div id="artistRow" class="scroll"></div>
  `;

  const row = document.getElementById("artistRow");

  artists.forEach((artist, i) => {
    const card = document.createElement("div");
    card.className = "artist-card";

    card.innerHTML = `
      <img src="${artist.image}">
      <div class="artist-name">${artist.name}</div>
    `;

    card.onclick = () => showArtist(i);
    row.appendChild(card);
  });
}

/* =========================
   ARTIST PAGE
========================= */
function showArtist(i) {
  const artist = artists[i];

  main.innerHTML = `
    <div style="padding:10px;">
      <img src="${artist.image}" style="width:220px;border-radius:20px;">
      <h1>${artist.name}</h1>
      <p>${artist.bio}</p>

      <h3>Albums</h3>
      <div id="albumRow" class="scroll"></div>
    </div>
  `;

  const row = document.getElementById("albumRow");

  artist.albums.forEach((album) => {
    const card = document.createElement("div");
    card.className = "album-card";

    card.innerHTML = `
      <img src="${album.cover}">
      <div>${album.title}</div>
    `;

    card.onclick = () => showAlbum(album);
    row.appendChild(card);
  });
}

/* =========================
   ALBUM PAGE (FIXED + PLAY BUTTON)
========================= */
function showAlbum(album) {
  main.innerHTML = `
    <div style="padding:10px;">
      <img src="${album.cover}" style="width:240px;border-radius:18px;">
      <h1>${album.title}</h1>
      <h3>${album.artist}</h3>

      <p>${album.description}</p>

      <button id="playAlbumBtn">▶ Play Album</button>

      <h3>Tracklist</h3>
      <div id="trackList"></div>
    </div>
  `;

  document.getElementById("playAlbumBtn").onclick = () => playAlbum(album);

  const list = document.getElementById("trackList");

  album.songs.forEach((song, i) => {
    const div = document.createElement("div");
    div.className = "track";

    div.innerHTML = `
      <span>${i + 1}. ${song.title}</span>
    `;

    div.onclick = () => playSong(song, album, i);

    list.appendChild(div);
  });
}

/* =========================
   CONTROLS
========================= */
playBtn.onclick = () => {
  if (!audio.src) return;

  if (isPlaying) {
    audio.pause();
    playBtn.innerText = "▶";
    isPlaying = false;
  } else {
    audio.play();
    playBtn.innerText = "⏸";
    isPlaying = true;
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

/* =========================
   SEARCH
========================= */
searchInput.oninput = () => {
  const q = searchInput.value.toLowerCase();
  main.innerHTML = "<h2>Search Results</h2>";

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

themeToggle.onclick = () => {
  document.body.classList.toggle("light");
};

showHome();
