const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const main = document.getElementById("main");
const trackName = document.getElementById("trackName");
const subText = document.getElementById("subText");
const volume = document.getElementById("volume");
const playerBar = document.querySelector(".player");

let currentAlbum = null;
let currentIndex = 0;
let isPlaying = false;
let isRepeat = false;

/* ========================= UPDATED DATA ========================= */
const albums = [
  {
    title: "ye",
    artist: "Kanye West",
    cover: "images/ye.jpg",
    songs: [
      { title: "Ghost Town", file: "music/ye/6. Ghost Town.mp3" },
      { title: "Violent Crimes", file: "music/ye/7. Violent Crimes.mp3" }
    ]
  },
  {
    title: "The College Dropout",
    artist: "Kanye West",
    cover: "images/dropout.jpg",
    songs: [
      { title: "Intro", file: "music/dropout/Intro.mp3" },
      { title: "Jesus Walks", file: "music/dropout/Jesus Walks.mp3" }
    ]
  },
  {
    title: "Late Registration",
    artist: "Kanye West",
    cover: "images/late-registration.png",
    songs: [
      { title: "Touch The Sky", file: "music/late/Touch The Sky.mp3" },
      { title: "Gold Digger", file: "music/late/Gold Digger.mp3" }
    ]
  },
  {
    title: "Thriller",
    artist: "Michael Jackson",
    cover: "images/thriller.jpg",
    songs: [
      { title: "Billie Jean", file: "music/thriller/Billie Jean.mp3" },
      { title: "Thriller", file: "music/thriller/Thriller.mp3" }
    ]
  }
];

const artists = [
  { name: "Kanye West", image: "images/kanye.png", bio: "Visionary rapper and producer.", albums: albums.filter(a => a.artist.includes("Kanye West")) },
  { name: "Michael Jackson", image: "images/mj.jpg", bio: "The King of Pop.", albums: albums.filter(a => a.artist === "Michael Jackson") },
  { name: "Jay-Z", image: "images/jayz.jpg", bio: "Business mogul and rap legend.", albums: [] }
];

/* ========================= PLAYER EXPANSION ========================= */

// Clicking the bar (but not the buttons) expands the player
playerBar.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON" && e.target.tagName !== "INPUT") {
        playerBar.classList.toggle("expanded");
    }
});

/* ========================= CORE LOGIC ========================= */

function loadHome() {
    main.innerHTML = `
        <h1 class="home-title">Home</h1>
        <h2>Artists</h2>
        <div class="scroll" id="artistRow"></div>
        <h2>Albums</h2>
        <div class="album-grid" id="albumRow"></div>
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
        div.innerHTML = `<img src="${album.cover}"><div><strong>${album.title}</strong></div>`;
        div.onclick = () => openAlbumPage(i);
        row.appendChild(div);
    });
}

function playSong(song, album, index) {
    if (!song) return;
    currentIndex = index;
    currentAlbum = album;

    audio.src = encodeURI(song.file);
    audio.play().then(() => {
        trackName.innerText = song.title;
        subText.innerText = album ? album.artist : "Streaming";
        
        // Add art to the player bar for expansion
        if (!document.getElementById("playerArt")) {
            const art = document.createElement("img");
            art.id = "playerArt";
            playerBar.prepend(art);
        }
        document.getElementById("playerArt").src = album.cover;

        isPlaying = true;
        playBtn.innerText = "⏸";
    }).catch(err => console.error("Playback failed:", err));
}

function openArtistPage(i) {
    const artist = artists[i];
    main.innerHTML = `
        <button class="back-btn" onclick="loadHome()">← Back</button>
        <div class="header-hero">
            <img src="${artist.image}" class="hero-img" style="width:200px; border-radius:50%;">
            <h1>${artist.name}</h1>
        </div>
        <div class="album-grid" id="artistAlbums"></div>
    `;
    artist.albums.forEach(album => {
        const div = document.createElement("div");
        div.className = "album-card";
        div.innerHTML = `<img src="${album.cover}"><div>${album.title}</div>`;
        div.onclick = () => openAlbumPage(albums.indexOf(album));
        document.getElementById("artistAlbums").appendChild(div);
    });
}

function openAlbumPage(i) {
    currentAlbum = albums[i];
    main.innerHTML = `
        <button class="back-btn" onclick="loadHome()">← Back</button>
        <div style="display:flex; gap:20px; align-items:center;">
            <img src="${currentAlbum.cover}" style="width:150px; border-radius:10px;">
            <h1>${currentAlbum.title}</h1>
        </div>
        <div id="trackList"></div>
    `;
    currentAlbum.songs.forEach((song, index) => {
        const div = document.createElement("div");
        div.className = "track";
        div.innerText = `${index + 1}. ${song.title}`;
        div.onclick = () => playSong(song, currentAlbum, index);
        document.getElementById("trackList").appendChild(div);
    });
}

playBtn.onclick = () => {
    if (isPlaying) { audio.pause(); playBtn.innerText = "▶"; }
    else { audio.play(); playBtn.innerText = "⏸"; }
    isPlaying = !isPlaying;
};

audio.onended = () => {
    if (currentAlbum && currentIndex + 1 < currentAlbum.songs.length) {
        playSong(currentAlbum.songs[currentIndex + 1], currentAlbum, currentIndex + 1);
    }
};

loadHome();
