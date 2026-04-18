const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const main = document.getElementById("main");
const trackName = document.getElementById("trackName");
const subText = document.getElementById("subText");
const volume = document.getElementById("volume");

let currentAlbum = null;
let currentIndex = 0;
let isPlaying = false;

/* ========================= DATA ========================= */
const albums = [
  {
    title: "ye",
    artist: "Kanye West",
    cover: "images/ye.jpg",
    songs: [
      { title: "I Thought About Killing You", file: "music/1. I Thought About Killing You.mp3" },
      { title: "Yikes", file: "music/2. Yikes.mp3" },
      { title: "All Mine", file: "music/3. All Mine.mp3" },
      { title: "Wouldn't Leave", file: "music/4. Wouldn't Leave.mp3" },
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
      { title: "Intro", file: "music/Intro.mp3" },
      { title: "We Don't Care", file: "music/We Dont Care.mp3" },
      { title: "Graduation Day", file: "music/Graduation Day.mp3" },
      { title: "All Falls Down", file: "music/All Falls Down.mp3" },
      { title: "Spaceship", file: "music/Spaceship.mp3" },
      { title: "Jesus Walks", file: "music/Jesus Walks.mp3" },
      { title: "Through The Wire", file: "music/Through The Wire.mp3" },
      { title: "Family Business", file: "music/Family Business.mp3" }
    ]
  }
];

const artists = [
  { name: "Kanye West", image: "images/kanye_cover.jpg", albums: albums },
  { name: "Michael Jackson", image: "images/mj.png", albums: [] },
  { name: "Jay-Z", image: "images/jayz.png", albums: [] }
];

/* ========================= LOGIC ========================= */

function loadHome() {
    main.innerHTML = `
        <h1>Home</h1>
        <h2>Artists</h2>
        <div class="artist-grid" id="artistRow"></div>
        <h2>Albums</h2>
        <div class="album-grid" id="albumRow"></div>
        <div id="detailView" style="margin-top:30px;"></div>
    `;
    renderArtists();
    renderAlbums();
}

function renderArtists() {
    const row = document.getElementById("artistRow");
    artists.forEach((artist, i) => {
        const div = document.createElement("div");
        div.className = "artist-card";
        div.innerHTML = `<img src="${artist.image}"><div class="artist-name">${artist.name}</div>`;
        div.onclick = () => openArtistPage(i);
        row.appendChild(div);
    });
}

function renderAlbums() {
    const row = document.getElementById("albumRow");
    albums.forEach((album, i) => {
        const div = document.createElement("div");
        div.className = "album-card";
        div.innerHTML = `<img src="${album.cover}"><div>${album.title}</div>`;
        div.onclick = () => openAlbumPage(i);
        row.appendChild(div);
    });
}

function openAlbumPage(i) {
    currentAlbum = albums[i];
    const view = document.getElementById("detailView");
    view.innerHTML = `<h3>${currentAlbum.title}</h3>`;
    currentAlbum.songs.forEach((song, index) => {
        const div = document.createElement("div");
        div.className = "track";
        div.innerText = song.title;
        div.onclick = () => playSong(song, currentAlbum, index);
        view.appendChild(div);
    });
    view.scrollIntoView({ behavior: 'smooth' });
}

function openArtistPage(i) {
    const artist = artists[i];
    const view = document.getElementById("detailView");
    view.innerHTML = `<h3>${artist.name} - All Songs</h3>`;
    const allSongs = artist.albums.flatMap(a => a.songs);
    allSongs.forEach((song, index) => {
        const div = document.createElement("div");
        div.className = "track";
        div.innerText = song.title;
        div.onclick = () => playSong(song, null, index);
        view.appendChild(div);
    });
    view.scrollIntoView({ behavior: 'smooth' });
}

function playSong(song, album, index) {
    if (!song) return;
    audio.src = encodeURI(song.file);
    audio.play().then(() => {
        trackName.innerText = song.title;
        subText.innerText = album ? album.artist : "Streaming";
        isPlaying = true;
        playBtn.innerText = "⏸";
    }).catch(err => {
        console.error("Playback failed:", err);
        alert("File not found! Check your 'music' folder on GitHub.");
    });
}

playBtn.onclick = () => {
    if (isPlaying) { audio.pause(); playBtn.innerText = "▶"; }
    else { audio.play(); playBtn.innerText = "⏸"; }
    isPlaying = !isPlaying;
};

volume.oninput = () => { audio.volume = volume.value; };

loadHome();
