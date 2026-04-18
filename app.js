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

/* ========================= DATA SYNCED WITH GITHUB ========================= */
const albums = [
  {
    title: "ye",
    artist: "Kanye West",
    cover: "images/ye.jpg",
    songs: [
      { title: "I Thought About Killing You", file: "music/ye/1. I Thought About Killing You.mp3" },
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
    cover: "images/late-registration.png", // Matches GitHub exactly
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
      { title: "Wanna Be Startin' Somethin'", file: "music/thriller/Wanna Be Startin Somethin.mp3" },
      { title: "Billie Jean", file: "music/thriller/Billie Jean.mp3" },
      { title: "Thriller", file: "music/thriller/Thriller.mp3" }
    ]
  },
  {
    title: "Watch The Throne",
    artist: "Jay-Z & Kanye West",
    cover: "images/blueprint.jpg", 
    songs: [
      { title: "No Church In The Wild", file: "music/wtt/No Church In The Wild.mp3" },
      { title: "Niggas In Paris", file: "music/wtt/Niggas In Paris.mp3" }
    ]
  }
];

const artists = [
  { 
    name: "Kanye West", 
    image: "images/kanye.png", // Matches GitHub .png
    bio: "Visionary rapper and designer.",
    albums: albums.filter(a => a.artist.includes("Kanye West")) 
  },
  { 
    name: "Michael Jackson", 
    image: "images/mj.jpg", // Matches GitHub .jpg
    bio: "The King of Pop.",
    albums: albums.filter(a => a.artist === "Michael Jackson") 
  },
  { 
    name: "Jay-Z", 
    image: "images/jayz.jpg", // Matches GitHub .jpg
    bio: "Brooklyn's finest business mogul.",
    albums: albums.filter(a => a.artist.includes("Jay-Z")) 
  }
];

/* ========================= INTERACTIVE PLAYER ========================= */

playerBar.addEventListener("click", (e) => {
    // Don't expand if clicking the play button or volume
    if (e.target.tagName !== "BUTTON" && e.target.type !== "range") {
        playerBar.classList.toggle("expanded");
    }
});

/* ========================= CORE LOGIC ========================= */

function loadHome() {
    main.innerHTML = `
        <h1 class="home-title">Home</h1>
        <div class="section-container">
            <h2>Artists</h2>
            <div class="artist-grid" id="artistRow"></div>
        </div>
        <div class="section-container">
            <h2>Albums</h2>
            <div class="album-grid" id="albumRow"></div>
        </div>
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

function openArtistPage(i) {
    const artist = artists[i];
    main.innerHTML = `
        <div class="detail-page">
            <button class="back-btn" onclick="loadHome()">← Back</button>
            <div class="header-hero">
                <img src="${artist.image}" class="hero-img">
                <div class="hero-text">
                    <h1>${artist.name}</h1>
                    <p class="bio">${artist.bio}</p>
                </div>
            </div>
            <h2>Discography</h2>
            <div class="album-grid" id="artistAlbums"></div>
        </div>
    `;
    const albumRow = document.getElementById("artistAlbums");
    artist.albums.forEach(album => {
        const div = document.createElement("div");
        div.className = "album-card";
        div.innerHTML = `<img src="${album.cover}"><div>${album.title}</div>`;
        div.onclick = () => openAlbumPage(albums.indexOf(album));
        albumRow.appendChild(div);
    });
}

function openAlbumPage(i) {
    currentAlbum = albums[i];
    main.innerHTML = `
        <div class="detail-page">
            <button class="back-btn" onclick="loadHome()">← Back</button>
            <div class="album-header" style="display:flex; gap:20px; align-items:center; margin-bottom:30px;">
                <img src="${currentAlbum.cover}" style="width:180px; border-radius:15px;">
                <div>
                    <h1>${currentAlbum.title}</h1>
                    <p>${currentAlbum.artist}</p>
                </div>
            </div>
            <div id="trackList"></div>
        </div>
    `;
    currentAlbum.songs.forEach((song, index) => {
        const div = document.createElement("div");
        div.className = "track";
        div.innerHTML = `<span class="track-num">${index + 1}</span> <span>${song.title}</span>`;
        div.onclick = () => playSong(song, currentAlbum, index);
        document.getElementById("trackList").appendChild(div);
    });
}

function playSong(song, album, index) {
    if (!song) return;
    currentIndex = index;
    currentAlbum = album;

    audio.src = encodeURI(song.file);
    audio.play().then(() => {
        trackName.innerText = song.title;
        subText.innerText = album.artist;
        
        // Update the Background Art for the Expanded Player
        if (!document.getElementById("playerArt")) {
            const art = document.createElement("img");
            art.id = "playerArt";
            playerBar.prepend(art);
        }
        document.getElementById("playerArt").src = album.cover;

        isPlaying = true;
        playBtn.innerText = "⏸";
    }).catch(err => console.error("Error playing song:", err));
}

// AUTO-PLAY LOGIC
audio.onended = () => {
    if (currentAlbum && currentIndex + 1 < currentAlbum.songs.length) {
        currentIndex++;
        playSong(currentAlbum.songs[currentIndex], currentAlbum, currentIndex);
    }
};

playBtn.onclick = () => {
    if (isPlaying) { audio.pause(); playBtn.innerText = "▶"; }
    else { audio.play(); playBtn.innerText = "⏸"; }
    isPlaying = !isPlaying;
};

volume.oninput = () => { audio.volume = volume.value; };

loadHome();
