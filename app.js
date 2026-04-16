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

/* DATA */
const albums = [
  {
    title: "ye",
    artist: "Kanye West",
    cover: "images/ye.jpg",
    songs: [
      { title: "I Thought About Killing You", file: "music/1. I Thought About Killing You.mp3" },
      { title: "Yikes", file: "music/2. Yikes.mp3" },
      { title: "All Mine", file: "music/3. All Mine.mp3" },
      { title: "Ghost Town", file: "music/6. Ghost Town.mp3" }
    ]
  }
];

const artists = [
  {
    name: "Kanye West",
    image: "images/kanye.jpg",
    songs: albums[0].songs
  }
];

/* HOME */
function loadHome() {
  main.innerHTML = `
    <h1 class="home-title">Home</h1>

    <h2>Artist</h2>
    <div class="scroll" id="artistRow"></div>

    <h2>Albums</h2>
    <div class="scroll" id="albumRow"></div>

    <div id="trackView"></div>
  `;

  loadArtistRow();
  loadAlbumRow();
}

/* ARTIST ROW */
function loadArtistRow() {
  const row = document.getElementById("artistRow");
  row.innerHTML = "";

  const artist = artists[0];

  const div = document.createElement("div");
  div.className = "artist-card";

  div.innerHTML = `
    <img src="${artist.image}">
    <div class="artist-name">${artist.name}</div>
  `;

  div.onclick = () => openArtist(0);

  row.appendChild(div);
}

/* ALBUM ROW */
function loadAlbumRow() {
  const row = document.getElementById("albumRow");
  row.innerHTML = "";

  albums.forEach((album, i) => {
    const div = document.createElement("div");
    div.className = "album-card";

    div.innerHTML = `
      <img src="${album.cover}">
      <div>${album.title}</div>
    `;

    div.onclick = () => openAlbum(i);
    row.appendChild(div);
  });
}

/* OPEN ALBUM */
function openAlbum(i) {
  currentAlbum = albums[i];
  const trackView = document.getElementById("trackView");
  trackView.innerHTML = "";

  currentAlbum.songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.className = "track";
    div.innerText = song.title;

    div.onclick = () => play(index);
    trackView.appendChild(div);
  });
}

/* OPEN ARTIST */
function openArtist(i) {
  const artist = artists[i];
  const trackView = document.getElementById("trackView");
  trackView.innerHTML = `<h2>${artist.name}</h2>`;

  artist.songs.forEach((song) => {
    const div = document.createElement("div");
    div.className = "track";
    div.innerText = song.title;

    div.onclick = () => playDirect(song);
    trackView.appendChild(div);
  });
}

/* PLAY */
function play(i) {
  currentIndex = i;
  const song = currentAlbum.songs[i];

  audio.src = encodeURI(song.file);
  audio.play();

  trackName.innerText = song.title;
  subText.innerText = currentAlbum.artist;

  isPlaying = true;
  playBtn.innerText = "⏸";
}

/* DIRECT PLAY */
function playDirect(song) {
  audio.src = encodeURI(song.file);
  audio.play();

  trackName.innerText = song.title;
  subText.innerText = "Kanye West";
}

/* CONTROLS */
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
  play(currentIndex);
};

prevBtn.onclick = () => {
  if (!currentAlbum) return;
  currentIndex = (currentIndex - 1 + currentAlbum.songs.length) % currentAlbum.songs.length;
  play(currentIndex);
};

volume.oninput = () => {
  audio.volume = volume.value;
};

/* SEARCH */
searchInput.oninput = () => {
  const q = searchInput.value.toLowerCase();
  const trackView = document.getElementById("trackView");
  trackView.innerHTML = "";

  albums.forEach(album => {
    album.songs.forEach(song => {
      if (song.title.toLowerCase().includes(q)) {
        const div = document.createElement("div");
        div.className = "track";
        div.innerText = song.title;

        div.onclick = () => playDirect(song);
        trackView.appendChild(div);
      }
    });
  });
};

/* THEME */
themeToggle.onclick = () => {
  document.body.classList.toggle("light");
};

/* START */
loadHome();
