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

/* ========================= GITHUB DATA SYNC ========================= */
const albums = [
  { title: "ye", artist: "Kanye West", cover: "images/ye.jpg", folder: "ye" },
  { title: "The College Dropout", artist: "Kanye West", cover: "images/dropout.jpg", folder: "dropout" },
  { title: "Late Registration", artist: "Kanye West", cover: "images/late-registration.png", folder: "late" },
  { title: "Thriller", artist: "Michael Jackson", cover: "images/thriller.jpg", folder: "thriller" },
  { title: "Watch The Throne", artist: "Jay-Z & Kanye West", cover: "images/blueprint.jpg", folder: "wtt" }
];

const artists = [
  { name: "Kanye West", image: "images/kanye.png" },
  { name: "Michael Jackson", image: "images/mj.jpg" },
  { name: "Jay-Z", image: "images/jayz.jpg" }
];

/* ========================= PLAYER INTERACTION ========================= */
playerBar.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON" && e.target.type !== "range") {
        playerBar.classList.toggle("expanded");
    }
});

/* ========================= UI RENDERING ========================= */
function loadHome() {
    main.innerHTML = `
        <h1 class="home-title">Home</h1>
        <h2>Top Artists</h2>
        <div class="scroll" id="artistRow"></div>
        <h2>Recently Added</h2>
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
        div.onclick = () => openArtistPage(artist.name);
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

function playSong(title, file, album) {
    audio.src = encodeURI(file);
    audio.play();
    trackName.innerText = title;
    subText.innerText = album.artist;
    
    if (!document.getElementById("playerArt")) {
        const art = document.createElement("img");
        art.id = "playerArt";
        playerBar.prepend(art);
    }
    document.getElementById("playerArt").src = album.cover;
    isPlaying = true;
    playBtn.innerText = "⏸";
}

playBtn.onclick = () => {
    if (isPlaying) { audio.pause(); playBtn.innerText = "▶"; }
    else { audio.play(); playBtn.innerText = "⏸"; }
    isPlaying = !isPlaying;
};

loadHome();
