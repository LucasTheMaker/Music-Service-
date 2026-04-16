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
    description:
      "A deeply personal 7-track album where Kanye explores identity, mental health, fame, relationships, and self-destruction.",
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
    bio:
      "Kanye Omari West (now known as Ye) is a highly influential American rapper, producer, and fashion designer born in 1977. Rising to fame in the early 2000s, he revolutionized hip-hop by breaking away from gangster rap conventions, integrating soul samples, and exploring introspective themes. Known for his eclectic sound, critical acclaim, and controversial public persona, he has sold over 135 million records and won 24 Grammy Awards.\n\nKey Aspects of His Artistry:\n• Musical Evolution: From soul-sampling to experimental hip-hop and industrial sounds.\n• Production Pioneer: Early Roc-A-Fella producer including Jay-Z’s The Blueprint.\n• Fashion: Founder of YEEZY brand.\n• Controversy: One of music’s most polarizing public figures.\n• Critical Acclaim: Widely regarded as one of the most influential artists of the 21st century.",
    albums: [albums[0]]
  }
];

/* =========================
   PLAY SONG
========================= */
function playSong(song, album, index) {
  audio.src = encodeURI(song.file);
  audio.load();
  audio.play().catch(console.log);

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
   HOME PAGE
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
   🔥 ARTIST PAGE + BIO MORE SYSTEM
========================= */
function showArtist(i) {
  const artist = artists[i];

  let expanded = false;

  const shortBio = artist.bio.slice(0, 220) + "...";

  main.innerHTML = `
    <div class="artist-hero">
      <img src="${artist.image}">
      <div class="artist-overlay">

        <h1>${artist.name}</h1>

        <p id="bioText" class="bio-text">
          ${shortBio}
          <span id="moreBtn" style="color:#1DB954;cursor:pointer;"> More</span>
        </p>

        <button id="backBtn">← Back</button>
      </div>
    </div>

    <h2>Albums</h2>
    <div id="albumRow"></div>
  `;

  document.getElementById("backBtn").onclick = showHome;

  /* BIO TOGGLE (SAFE FIX) */
  const bioText = document.getElementById("bioText");
  const moreBtn = document.getElementById("moreBtn");

  moreBtn.onclick = () => {
    expanded = !expanded;

    if (expanded) {
      bioText.innerHTML = `
        ${artist.bio}
        <span id="moreBtn" style="color:#1DB954;cursor:pointer;"> Show less</span>
      `;
    } else {
      bioText.innerHTML = `
        ${shortBio}
        <span id="moreBtn" style="color:#1DB954;cursor:pointer;"> More</span>
      `;
    }

    // rebind click after rewrite
    document.getElementById("moreBtn").onclick = moreBtn.onclick;
  };

  /* ALBUMS */
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
    <img src="${album.cover}" style="width:260px;border-radius:20px;">
    <h1>${album.title}</h1>
    <p>${album.description}</p>

    <button id="playAlbum">▶ Play Album</button>
    <button id="backHome">← Back</button>

    <h3>Tracklist</h3>
    <div id="trackList"></div>
  `;

  document.getElementById("playAlbum").onclick = () => playAlbum(album);
  document.getElementById("backHome").onclick = showHome;

  const list = document.getElementById("trackList");

  album.songs.forEach((song, i) => {
    const div = document.createElement("div");
    div.className = "track";
    div.innerText = `${i + 1}. ${song.title}`;

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
