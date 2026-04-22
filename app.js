const audio = new Audio();

let currentAlbum = null;
let currentIndex = 0;

/* =========================
   ALBUM DATA
========================= */
const albums = [

{
    id: "romantic",
    title: "The Romantic",
    artist: "Bruno Mars",
    cover: "music/romantic/romantic.png",
    tracks: [
        { number: 1, title: "Risk It All", file: "music/romantic/01 Risk It All.mp3" },
        { number: 2, title: "Cha Cha Cha", file: "music/romantic/02 Cha Cha Cha.mp3" },
        { number: 3, title: "I Just Might", file: "music/romantic/03 I Just Might.mp3" }
    ]
},

{
    id: "dropout",
    title: "The College Dropout",
    artist: "Kanye West",
    cover: "music/dropout/cover.jpg",
    tracks: [
        { number: 1, title: "Intro", file: "music/dropout/Intro.mp3" },
        { number: 2, title: "We Don't Care", file: "music/dropout/We Dont Care.mp3" },
        { number: 3, title: "Spaceship", file: "music/dropout/Spaceship.mp3" }
    ]
},

{
    id: "ye",
    title: "ye",
    artist: "Kanye West",
    cover: "music/ye/cover.jpg",
    tracks: [
        { number: 1, title: "I Thought About Killing You", file: "music/ye/1. I Thought About Killing You.mp3" },
        { number: 6, title: "Ghost Town", file: "music/ye/6. Ghost Town.mp3" }
    ]
}

];

/* =========================
   RENDER HOME
========================= */
function renderAlbums() {
    const container = document.getElementById('album-grid');
    if (!container) return;

    container.innerHTML = albums.map(album => `
        <div class="album-card" onclick="window.location.href='album.html?id=${album.id}'">
            <img src="${album.cover}">
            <h3>${album.title}</h3>
            <p>${album.artist}</p>
        </div>
    `).join('');
}

/* =========================
   PLAYER
========================= */
function playSong(albumId, index) {
    const album = albums.find(a => a.id === albumId);
    if (!album) return;

    const song = album.tracks[index];
    if (!song) return;

    currentAlbum = album;
    currentIndex = index;

    audio.src = song.file;

    audio.play().catch(err => {
        console.log("AUDIO ERROR:", song.file);
    });

    const titleEl = document.getElementById("player-track-title");
    const artistEl = document.getElementById("player-track-artist");

    if (titleEl) titleEl.innerText = song.title;
    if (artistEl) artistEl.innerText = album.artist;
}

/* =========================
   CONTROLS
========================= */
document.addEventListener("DOMContentLoaded", () => {

    renderAlbums();

    const playBtn = document.getElementById("play-btn");
    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");

    if (playBtn) {
        playBtn.onclick = () => {
            if (!audio.src) return;
            if (audio.paused) audio.play();
            else audio.pause();
        };
    }

    if (nextBtn) {
        nextBtn.onclick = () => {
            if (!currentAlbum) return;
            currentIndex++;
            if (currentIndex >= currentAlbum.tracks.length) currentIndex = 0;
            playSong(currentAlbum.id, currentIndex);
        };
    }

    if (prevBtn) {
        prevBtn.onclick = () => {
            if (!currentAlbum) return;
            currentIndex--;
            if (currentIndex < 0) currentIndex = currentAlbum.tracks.length - 1;
            playSong(currentAlbum.id, currentIndex);
        };
    }
});
