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
   ALBUMS
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
    title: "The College Dropout",
    artist: "Kanye West",
    cover: "images/dropout.jpg",
    description: "Kanye West’s debut album released in 2004.",
    songs: [
      { title: "Intro", file: "music/dropout/01 Intro.mp3" },
      { title: "We Don't Care", file: "music/dropout/02 We Dont Care.mp3" },
      { title: "Graduation Day", file: "music/dropout/03 Graduation Day.mp3" },
      { title: "All Falls Down", file: "music/dropout/04 All Falls Down.mp3" },
      { title: "I'll Fly Away", file: "music/dropout/05 Ill Fly Away.mp3" },
      { title: "Spaceship", file: "music/dropout/06 Spaceship.mp3" },
      { title: "Jesus Walks", file: "music/dropout/07 Jesus Walks.mp3" },
      { title: "Never Let Me Down", file: "music/dropout/08 Never Let Me Down.mp3" },
      { title: "Get 'Em High", file: "music/dropout/09 Get Em High.mp3" },
      { title: "Workout Plan", file: "music/dropout/10 Workout Plan.mp3" },
      { title: "The New Workout Plan", file: "music/dropout/11 The New Workout Plan.mp3" },
      { title: "Slow Jamz", file: "music/dropout/12 Slow Jamz.mp3" },
      { title: "Breathe In Breathe Out", file: "music/dropout/13 Breathe In Breathe Out.mp3" },
      { title: "School Spirit Skit 1", file: "music/dropout/14 School Spirit Skit 1.mp3" },
      { title: "School Spirit", file: "music/dropout/15 School Spirit.mp3" },
      { title: "School Spirit Skit 2", file: "music/dropout/16 School Spirit Skit 2.mp3" },
      { title: "Lil Jimmy Skit", file: "music/dropout/17 Lil Jimmy Skit.mp3" },
      { title: "Two Words", file: "music/dropout/18 Two Words.mp3" },
      { title: "Through The Wire", file: "music/dropout/19 Through The Wire.mp3" },
      { title: "Family Business", file: "music/dropout/20 Family Business.mp3" },
      { title: "Last Call", file: "music/dropout/21 Last Call.mp3" }
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
    description: "Bruno Mars album.",
    songs: [
      { title: "24K Magic", file: "music/bruno/24K Magic.mp3" }
    ]
  },

  {
    title: "The Blueprint",
    artist: "Jay-Z",
    cover: "images/blueprint.jpg",
    description: "Jay-Z classic album.",
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

/* =========================
   ARTISTS
========================= */
const artists = [
  {
    name: "Kanye West",
    image: "images/kanye.png",
    bio: "One of the most influential artists ever.",
    albums: [albums[0], albums[1]]
  },
  {
    name: "Tyler, The Creator",
    image: "images/tyler.jpg",
    bio: "Creative visionary.",
    albums: [albums[2]]
  },
  {
    name: "Bruno Mars",
    image: "images/bruno.jpg",
    bio: "Pop superstar.",
    albums: [albums[3]]
  },
  {
    name: "Jay-Z",
    image: "images/jayz.jpg",
    bio: "Hip-hop icon.",
    albums: [albums[4]]
  },
  {
    name: "Michael Jackson",
    image: "images/mj.jpg",
    bio: "King of Pop.",
    albums: [albums[5]]
  }
];

/* =========================
   UI FUNCTIONS
========================= */
window.addEventListener("DOMContentLoaded", showHome);

function showHome() {
  main.innerHTML = `<h1>Artists</h1><div id="artistRow"></div>`;
  const row = document.getElementById("artistRow");

  artists.forEach((artist, i) => {
    const div = document.createElement("div");
    div.className = "artist-card";
    div.innerHTML = `<img src="${artist.image}"><h3>${artist.name}</h3>`;
    div.onclick = () => showArtist(i);
    row.appendChild(div);
  });
}

function showArtist(i) {
  const artist = artists[i];

  main.innerHTML = `
    <div class="artist-hero">
      <img src="${artist.image}">
      <div class="artist-overlay">
        <h1>${artist.name}</h1>
        <p>${artist.bio}</p>
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
    div.innerHTML = `<img src="${album.cover}"><p>${album.title}</p>`;
    div.onclick = () => showAlbum(album);
    row.appendChild(div);
  });
}

function showAlbum(album) {
  main.innerHTML = `
    <img src="${album.cover}" style="width:250px;border-radius:20px;">
    <h1>${album.title}</h1>
    <h3>${album.artist}</h3>
    <p>${album.description}</p>

    <button onclick="playSong(album.songs[0], album, 0)">▶ Play Album</button>
    <button onclick="showHome()">← Back</button>

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
