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

/* ========================= RESTORED DATA ========================= */
const albums = [
  {
    title: "ye",
    artist: "Kanye West",
    cover: "images/ye.jpg",
    songs: [
      { title: "I Thought About Killing You", file: "music/1. I Thought About Killing You.mp3" },
      { title: "Yikes", file: "music/2. Yikes.mp3" },
      { title: "All Mine", file: "music/3. All Mine.mp3" },
      { title: "Wouldn't Leave", file: "music/4. Wouldn’t Leave.mp3" },
      { title: "No Mistakes", file: "music/5. No Mistakes.mp3" },
      { title: "Ghost Town", file: "music/6. Ghost Town.mp3" },
      { title: "Violent Crimes", file: "music/7. Violent Crimes.mp3" }
    ]
  },
  {
    title: "The College Dropout",
    artist: "Kanye West",
    cover: "images/dropout.jpg",
    songs: [
      { title: "We Don't Care", file: "music/dropout/We Dont Care.mp3" },
      { title: "All Falls Down", file: "music/dropout/All Falls Down.mp3" },
      { title: "Spaceship", file: "music/dropout/Spaceship.mp3" },
      { title: "Jesus Walks", file: "music/dropout/Jesus Walks.mp3" },
      { title: "Through The Wire", file: "music/dropout/Through The Wire.mp3" },
      { title: "Family Business", file: "music/dropout/Family Business.mp3" }
    ]
  },
  {
    title: "Late Registration",
    artist: "Kanye West",
    cover: "images/late.jpg",
    songs: [
      { title: "Heard 'Em Say", file: "music/late/Heard Em Say.mp3" },
      { title: "Touch The Sky", file: "music/late/Touch The Sky.mp3" },
      { title: "Gold Digger", file: "music/late/Gold Digger.mp3" },
      { title: "Hey Mama", file: "music/late/Hey Mama.mp3" }
    ]
  },
  {
    title: "Thriller",
    artist: "Michael Jackson",
    cover: "images/thriller.jpg",
    songs: [
      { title: "Wanna Be Startin' Somethin'", file: "music/mj/Wanna Be Startin Somethin.mp3" },
      { title: "Thriller", file: "music/mj/Thriller.mp3" },
      { title: "Beat It", file: "music/mj/Beat It.mp3" },
      { title: "Billie Jean", file: "music/mj/Billie Jean.mp3" }
    ]
  }
];

const artists = [
  { name: "Kanye West", image: "images/kanye_cover.jpg", albums: albums.filter(a => a.artist === "Kanye West") },
  { name: "Michael Jackson", image: "images/mj.png", albums: albums.filter(a => a.artist === "Michael Jackson") },
  { name: "Bruno Mars", image: "images/bruno.png", albums: [] },
  { name: "Tyler, The Creator", image: "images/tyler.png", albums: [] },
  { name: "Jay-Z", image: "images/jayz.png", albums: [] }
];

/* ========================= CORE LOGIC ========================= */

function loadHome() {
    main.innerHTML = `
        <h1 class="home-title">Home</h1>
        <h2>Artists</h2>
        <div class="scroll" id="artistRow"></div>
        <h2>Albums</h2>
        <div class="scroll" id="albumRow"></div>
        <div id="trackView"></div>
    `;
    loadArtistRow();
    loadAlbumRow();
}

function loadArtistRow() {
    const row = document.getElementById("artistRow");
    artists.forEach((artist, i) => {
        const div = document.createElement("div");
        div.className = "artist-card";
        div.innerHTML = `<img src="${artist.image}"><div class="artist-name">${artist.name}</div>`;
        div.onclick = () => openArtist(i);
        row.appendChild(div);
    });
}

function loadAlbumRow() {
    const row = document.getElementById("albumRow");
    albums.forEach((album, i) => {
        const div = document.createElement("div");
        div.className = "album-card";
        div.innerHTML = `<img src="${album.cover}"><div>${album.title}</div>`;
        div.onclick = () => openAlbum(i);
        row.appendChild(div);
    });
}

function openAlbum(i) {
    currentAlbum = albums[i];
    renderTracklist(currentAlbum.songs, currentAlbum.title);
}

function openArtist(i) {
    const artist = artists[i];
    const artistSongs = artist.albums.flatMap(a => a.songs);
    renderTracklist(artistSongs, artist.name);
}

function renderTracklist(songs, title) {
    const trackView = document.getElementById("trackView");
    trackView.innerHTML = `<h2>${title}</h2>`;
    songs.forEach((song, index) => {
        const div = document.createElement("div");
        div.className = "track";
        div.innerText = song.title;
        div.onclick = () => playSong(song, currentAlbum, index);
        trackView.appendChild(div);
    });
}

function playSong(song, album, index) {
    if (!song) return;
    // encodeURI handles the spaces in filenames like "1. I Thought About Killing You.mp3"
    const safeFile = encodeURI(song.file);
    audio.src = safeFile;
    audio.play().then(() => {
        trackName.innerText = song.title;
        subText.innerText = album ? album.artist : "Streaming";
        currentIndex = index;
        isPlaying = true;
        playBtn.innerText = "⏸";
    }).catch(err => {
        console.error("Playback failed:", err);
    });
}

/* Controls */
playBtn.onclick = () => {
    if (isPlaying) { audio.pause(); playBtn.innerText = "▶"; }
    else { audio.play(); playBtn.innerText = "⏸"; }
    isPlaying = !isPlaying;
};

volume.oninput = () => { audio.volume = volume.value; };
themeToggle.onclick = () => { document.body.classList.toggle("light"); };

loadHome();
