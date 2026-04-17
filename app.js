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
    description: "Kanye West’s 2018 album.",
    songs: [
      { title: "I Thought About Killing You", file: "music/1. I Thought About Killing You.mp3" },
      { title: "Yikes", file: "music/2. Yikes.mp3" }
    ]
  },

  {
    title: "IGOR",
    artist: "Tyler, The Creator",
    cover: "images/igor.jpg",
    description: "Tyler’s concept album.",
    songs: [
      { title: "EARFQUAKE", file: "music/igor/EARFQUAKE.mp3" }
    ]
  },

  {
    title: "24K Magic",
    artist: "Bruno Mars",
    cover: "images/24k.jpg",
    description: "Bruno Mars hit album.",
    songs: [
      { title: "24K Magic", file: "music/bruno/24K Magic.mp3" }
    ]
  },

  {
    title: "The Blueprint",
    artist: "Jay-Z",
    cover: "images/blueprint.jpg",
    description: "Classic Jay-Z album.",
    songs: [
      { title: "Izzo", file: "music/jayz/Izzo.mp3" }
    ]
  },

  {
    title: "Thriller",
    artist: "Michael Jackson",
    cover: "images/thriller.jpg",
    description: "Best-selling album ever.",
    songs: [
      { title: "Billie Jean", file: "music/mj/Billie Jean.mp3" }
    ]
  }
];

const artists = [
  { name: "Kanye West", image: "images/kanye.png", bio: "Legendary artist.", albums: [albums[0]] },
  { name: "Tyler, The Creator", image: "images/tyler.jpg", bio: "Creative visionary.", albums: [albums[1]] },
  { name: "Bruno Mars", image: "images/bruno.jpg", bio: "Pop superstar.", albums: [albums[2]] },
  { name: "Jay-Z", image: "images/jayz.jpg", bio: "Hip-hop icon.", albums: [albums[3]] },
  { name: "Michael Jackson", image: "images/mj.jpg", bio: "King of Pop.", albums: [albums[4]] }
];

/* INIT */
window.addEventListener("DOMContentLoaded", showHome);

/* HOME */
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

/* ARTIST */
function showArtist(i) {
  const artist = artists[i];

  main.innerHTML = `
    <div class="artist-hero">
      <img src="${artist.image}">
      <div class="artist-overlay">
        <h1>${artist.name}</h1>
        <p class="bio-text">${artist.bio}</p>
        <button onclick="showHome()">← Back</button>
      </div>
    </div>

    <h2>Albums</h2>
    <div id="albumRow"></div>
  `;

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

/* ALBUM */
function showAlbum(album) {
  main.innerHTML = `
    <img src="${album.cover}" style="width:250px;border-radius:20px;">
    <h1>${album.title}</h1>
    <h3>${album.artist}</h3>

    <p>${album.description}</p>

    <button onclick="playSong(album.songs[0], album, 0)">▶ Play Album</button>
    <button onclick="showHome()">← Back</button>

    <h3>Tracklist</h3>
    <div id="trackList"></div>
  `;

  const list = document.getElementById("trackList");

  album.songs.forEach((song, i) => {
    const div = document.createElement("div");
    div.className = "track";
    div.innerText = `${i + 1}. ${song.title}`;
    div.onclick = () => playSong(song, album, i);
    list.appendChild(div);
  });
}

/* PLAYER */
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

audio.addEventListener("ended", () => {
  if (!currentAlbum) return;
  currentIndex = (currentIndex + 1) % currentAlbum.songs.length;
  playSong(currentAlbum.songs[currentIndex], currentAlbum, currentIndex);
});

playBtn.onclick = () => {
  if (!audio.src) return;
  isPlaying ? audio.pause() : audio.play();
  playBtn.innerText = isPlaying ? "▶" : "⏸";
  isPlaying = !isPlaying;
};

nextBtn.onclick = () => {
  if (!currentAlbum) return;
  currentIndex = (currentIndex + 1) % currentAlbum.songs.length;
  playSong(currentAlbum.songs[currentIndex], currentAlbum, currentIndex);
};

prevBtn.onclick = () => {
  if (!currentAlbum) return;
  currentIndex = (currentIndex - 1 + currentAlbum.songs.length) % currentAlbum.songs.length;
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
