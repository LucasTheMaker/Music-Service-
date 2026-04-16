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

/* 🔥 SAME IMAGE FOR ARTIST PAGE */
const artists = [
  {
    name: "Kanye West",
    image: "images/ye.jpg",
    bio: "American rapper, producer, and designer known for shaping modern hip-hop.",
    albums: [albums[0]]
  }
];

/* =========================
   AUDIO PLAYER (SAFE)
========================= */
function playSong(song, album = null, index = 0) {
  if (!song || !song.file) return;

  const safePath = encodeURI(song.file);

  console.log("Playing:", safePath);

  audio.src = safePath;
  audio.load();

  audio.play().catch(err => {
    console.log("Audio error:", err);
  });

  trackName.innerText = song.title;
  subText.innerText = album ? album.artist : "Kanye West";

  currentAlbum = album;
  currentIndex = index;

  isPlaying = true;
  playBtn.innerText = "⏸";
}

/* =========================
   HOME PAGE (FIXED CLICK)
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
      <img src="${artist.image}" draggable="false">
      <div class="artist-name">${artist.name}</div>
    `;

    // 🔥 STRONG CLICK HANDLER (NO INLINE ONCLICK)
    card.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      console.log("Artist clicked:", artist.name);

      showArtist(i);
    });

    row.appendChild(card);
  });
}

/* =========================
   🔥 ARTIST PAGE (FIXED CLICK)
========================= */
function showArtist(i) {
  const artist = artists[i];

  main.innerHTML = `
    <div style="padding:10px;">
      <img src="${artist.image}" style="width:220px;border-radius:20px;" draggable="false">
      <h1>${artist.name}</h1>
      <p style="opacity:0.8;">${artist.bio}</p>

      <h3>Albums</h3>
      <div id="albumRow" class="scroll"></div>

      <button id="backBtn">← Back</button>
    </div>
  `;

  document.getElementById("backBtn").onclick = showHome;

  const row = document.getElementById("albumRow");

  artist.albums.forEach((album) => {
    const card = document.createElement("div");
    card.className = "album-card";

    card.innerHTML = `
      <img src="${album.cover}" draggable="false">
      <div>${album.title}</div>
    `;

    card.addEventListener("click", (e) => {
      e.stopPropagation();
      showAlbum(album);
    });

    row.appendChild(card);
  });
}

/* =========================
   ALBUM PAGE
========================= */
function showAlbum(album) {
  main.innerHTML = `
    <div style="padding:10px;">
      <img src="${album.cover}" style="width:240px;border-radius:18px;" draggable="false">
      <h1>${album.title}</h1>
      <h3>${album.artist}</h3>

      <p style="opacity:0.8;">${album.description}</p>
      <p style="opacity:0.5;">${album.year} • ${album.label}</p>

      <h3>Tracklist</h3>
      <div id="trackList"></div>

      <button id="backArtist">← Back to Artist</button>
    </div>
  `;

  document.getElementById("backArtist").onclick = () => showArtist(0);

  const list = document.getElementById("trackList");

  album.songs.forEach((song, i) => {
    const div = document.createElement("div");
    div.className = "track";
    div.innerText = `${i + 1}. ${song.title}`;

    div.addEventListener("click", (e) => {
      e.stopPropagation();
      playSong(song, album, i);
    });

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

        div.addEventListener("click", () => {
          playSong(song, album, i);
        });

        main.appendChild(div);
      }
    });
  });
};

themeToggle.onclick = () => {
  document.body.classList.toggle("light");
};

/* START */
showHome();
