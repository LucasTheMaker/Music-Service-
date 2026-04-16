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
   DATA
========================= */
const albums = [
  {
    title: "ye",
    artist: "Kanye West",
    cover: "images/ye.jpg",
    description:
      "Ye is Kanye West’s eighth studio album, released on June 1, 2018. It is a highly personal, introspective seven-track project recorded in Wyoming, focused on mental health, bipolar disorder, family, and recent controversies.",

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
    image: "images/kanye.png",
    bio:
      "Kanye Omari West (Ye) is a highly influential rapper, producer, and designer.\n\nKnown for:\n• Musical innovation\n• Production legacy\n• Fashion influence\n• Cultural impact",
    albums: [albums[0]]
  }
];

/* =========================
   INIT (IMPORTANT FIX)
========================= */
window.addEventListener("DOMContentLoaded", () => {
  showHome();
});

/* =========================
   HOME
========================= */
function showHome() {
  main.innerHTML = `<h1>Artists</h1><div id="artistRow"></div>`;

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
   ARTIST PAGE
========================= */
function showArtist(i) {
  const artist = artists[i];

  const fullBio = artist.bio;
  const shortBio = fullBio.slice(0, 180) + "...";
  let expanded = false;

  main.innerHTML = `
    <div class="artist-hero">
      <img src="${artist.image}">
      <div class="artist-overlay">

        <h1>${artist.name}</h1>

        <p id="bioText"></p>
        <span id="toggleBio" style="color:#1DB954;cursor:pointer;">More</span>

        <br><br>
        <button id="backBtn">← Back</button>
      </div>
    </div>

    <h2>Albums</h2>
    <div id="albumRow"></div>
  `;

  document.getElementById("backBtn").onclick = showHome;

  const bioText = document.getElementById("bioText");
  const toggle = document.getElementById("toggleBio");

  function renderBio() {
    bioText.innerText = expanded ? fullBio : shortBio;
    toggle.innerText = expanded ? "Show less" : "More";
  }

  renderBio();

  toggle.onclick = () => {
    expanded = !expanded;
    renderBio();
  };

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
    <h3>${album.artist}</h3>

    <p>${album.description}</p>

    <button id="playAlbum">▶ Play Album</button>
    <button id="backHome">← Back</button>

    <h3>Tracklist</h3>
    <div id="trackList"></div>
  `;

  document.getElementById("backHome").onclick = showHome;

  document.getElementById("playAlbum").onclick = () => {
    playSong(album.songs[0], album, 0);
  };

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
   PLAYER
========================= */
function playSong(song, album, index) {
  audio.src = encodeURI(song.file);
  audio.play();

  trackName.innerText = song.title;
  subText.innerText = album.artist;

  currentAlbum = album;
  currentIndex = index;

  isPlaying = true;
  playBtn.innerText = "⏸";
}

/* AUTO NEXT */
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

/* CONTROLS */
playBtn.onclick = () => {
  if (!audio.src) return;

  if (isPlaying) {
    audio.pause();
    playBtn.innerText = "▶";
  } else {
    audio.play();
    playBtn.innerText = "⏸";
  }

  isPlaying = !isPlaying;
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

/* SEARCH */
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
