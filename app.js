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
   ALBUMS DATABASE
========================= */
const albums = [

/* YE */
{
  title: "ye",
  artist: "Kanye West",
  cover: "images/ye.jpg",
  description: "2018 introspective album.",
  songs: [
    { title: "I Thought About Killing You", file: "music/ye/I Thought About Killing You.mp3" },
    { title: "Yikes", file: "music/ye/Yikes.mp3" },
    { title: "All Mine", file: "music/ye/All Mine.mp3" },
    { title: "Wouldn't Leave", file: "music/ye/Wouldnt Leave.mp3" },
    { title: "No Mistakes", file: "music/ye/No Mistakes.mp3" },
    { title: "Ghost Town", file: "music/ye/Ghost Town.mp3" },
    { title: "Violent Crimes", file: "music/ye/Violent Crimes.mp3" }
  ]
},

/* COLLEGE DROPOUT */
{
  title: "The College Dropout",
  artist: "Kanye West",
  cover: "images/dropout.jpg",
  description: "Debut album.",
  songs: [
    { title: "We Dont Care", file: "music/dropout/We Dont Care.mp3" },
    { title: "Spaceship", file: "music/dropout/Spaceship.mp3" },
    { title: "Jesus Walks", file: "music/dropout/Jesus Walks.mp3" },
    { title: "Through The Wire", file: "music/dropout/Through The Wire.mp3" },
    { title: "Family Business", file: "music/dropout/Family Business.mp3" }
  ]
},

/* LATE REGISTRATION */
{
  title: "Late Registration",
  artist: "Kanye West",
  cover: "images/late-registration.jpg",
  description: "2005 orchestral hip-hop album.",
  songs: [
    { title: "Heard Em Say", file: "music/latereg/Heard Em Say.mp3" },
    { title: "Touch The Sky", file: "music/latereg/Touch The Sky.mp3" },
    { title: "Gold Digger", file: "music/latereg/Gold Digger.mp3" },
    { title: "Drive Slow", file: "music/latereg/Drive Slow.mp3" },
    { title: "Hey Mama", file: "music/latereg/Hey Mama.mp3" },
    { title: "Gone", file: "music/latereg/Gone.mp3" },
    { title: "Late", file: "music/latereg/Late.mp3" }
  ]
},

/* THRILLER */
{
  title: "Thriller",
  artist: "Michael Jackson",
  cover: "images/thriller.jpg",
  description: "Best-selling album of all time.",
  songs: [
    { title: "Wanna Be Startin Somethin", file: "music/thriller/Wanna Be Startin Somethin.mp3" },
    { title: "Baby Be Mine", file: "music/thriller/Baby Be Mine.mp3" },
    { title: "The Girl Is Mine", file: "music/thriller/The Girl Is Mine.mp3" },
    { title: "Thriller", file: "music/thriller/Thriller.mp3" },
    { title: "Beat It", file: "music/thriller/Beat It.mp3" },
    { title: "Billie Jean", file: "music/thriller/Billie Jean.mp3" },
    { title: "Human Nature", file: "music/thriller/Human Nature.mp3" },
    { title: "P Y T Pretty Young Thing", file: "music/thriller/P Y T Pretty Young Thing.mp3" },
    { title: "The Lady In My Life", file: "music/thriller/The Lady In My Life.mp3" }
  ]
}

];

/* =========================
   ARTISTS DATABASE
========================= */
const artists = [
{
  name: "Kanye West",
  image: "images/kanye.png",
  bio: "Influential rapper, producer, and designer.",
  albums: [albums[0], albums[1], albums[2]]
},

{
  name: "Michael Jackson",
  image: "images/mj.jpg",
  bio: "King of Pop.",
  albums: [albums[3]]
},

{
  name: "Bruno Mars",
  image: "images/bruno.jpg",
  bio: "Funk-pop and R&B superstar known for hits and live performances.",
  albums: []
},

{
  name: "Jay-Z",
  image: "images/jayz.jpg",
  bio: "Hip-hop mogul and one of the greatest rappers of all time.",
  albums: []
},

{
  name: "Tyler, The Creator",
  image: "images/tyler.jpg",
  bio: "Alternative hip-hop artist known for experimental sound and storytelling.",
  albums: []
}
];

/* =========================
   INIT
========================= */
window.onload = showHome;

/* =========================
   HOME
========================= */
function showHome() {
  main.innerHTML = "<h1>Artists</h1><div id='list'></div>";
  const list = document.getElementById("list");

  artists.forEach((a, i) => {
    const div = document.createElement("div");
    div.className = "artist-card";
    div.innerHTML = `<img src="${a.image}"><h3>${a.name}</h3>`;
    div.onclick = () => showArtist(i);
    list.appendChild(div);
  });
}

/* =========================
   ARTIST PAGE
========================= */
function showArtist(i) {
  const artist = artists[i];

  main.innerHTML = `
    <div class="artist-hero">
      <img src="${artist.image}">
      <div class="artist-overlay">
        <h1>${artist.name}</h1>
        <p>${artist.bio}</p>
        <button onclick="showHome()">Back</button>
      </div>
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
   ALBUM PAGE
========================= */
function showAlbum(album) {
  main.innerHTML = `
    <img src="${album.cover}" width="220">
    <h1>${album.title}</h1>
    <h3>${album.artist}</h3>
    <p>${album.description}</p>

    <button onclick="playSong(album.songs[0], album, 0)">Play Album</button>
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

/* SEARCH */
searchInput.oninput = () => {
  const q = searchInput.value.toLowerCase();
  main.innerHTML = "<h2>Search</h2>";

  albums.forEach(album => {
    album.songs.forEach(song => {
      if (song.title.toLowerCase().includes(q)) {
        const div = document.createElement("div");
        div.className = "track";
        div.innerText = song.title;
        div.onclick = () => playSong(song, album, 0);
        main.appendChild(div);
      }
    });
  });
};
