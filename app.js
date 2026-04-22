const albums = [
    {
        id: "romantic",
        title: "The Romantic",
        artist: "Bruno Mars",
        cover: "music/romantic/romantic.png",
        distributor: "© 2026 Bruno Mars Music",
        tracks: [
            { number: 1, title: "Risk It All", file: "Risk It All.mp3" },
            { number: 2, title: "Cha Cha Cha", file: "Cha Cha Cha.mp3" },
            { number: 3, title: "I Just Might", file: "I Just Might.mp3" },
            { number: 4, title: "God Was Showing Off", file: "God Was Showing Off.mp3" },
            { number: 5, title: "Why You Wanna Fight?", file: "Why You Wanna Fight?.mp3" },
            { number: 6, title: "On My Soul", file: "On My Soul.mp3" },
            { number: 7, title: "Something Serious", file: "Something Serious.mp3" },
            { number: 8, title: "Nothing Left", file: "Nothing Left.mp3" },
            { number: 9, title: "Dance With Me", file: "Dance With Me.mp3" }
        ]
    },
    {
        id: "dropout",
        title: "The College Dropout",
        artist: "Kanye West",
        cover: "music/dropout/cover.jpg",
        distributor: "℗ 2004 UMG Recordings, Inc.",
        tracks: [
            { number: 1, title: "Intro", file: "Intro.mp3" },
            { number: 2, title: "We Don't Care", file: "We Don't Care.mp3" },
            { number: 4, title: "All Falls Down", file: "All Falls Down.mp3" },
            { number: 7, title: "Jesus Walks", file: "Jesus Walks.mp3" },
            { number: 19, title: "Through The Wire", file: "Through The Wire.mp3" }
        ]
    },
    {
        id: "late",
        title: "Late Registration",
        artist: "Kanye West",
        cover: "music/late/cover.jpg",
        distributor: "℗ 2005 UMG Recordings, Inc.",
        tracks: [
            { number: 1, title: "Wake Up Mr. West", file: "Wake Up Mr West.mp3" },
            { number: 2, title: "Heard 'Em Say", file: "Heard Em Say.mp3" },
            { number: 3, title: "Touch The Sky", file: "Touch The Sky.mp3" },
            { number: 4, title: "Gold Digger", file: "Gold Digger.mp3" }
        ]
    },
    {
        id: "ye",
        title: "ye",
        artist: "Kanye West",
        cover: "music/ye/cover.jpg",
        distributor: "© 2018 G.O.O.D. Music / Def Jam",
        tracks: [
            { number: 1, title: "I Thought About Killing You", file: "I Thought About Killing You.mp3" },
            { number: 2, title: "Yikes", file: "Yikes.mp3" },
            { number: 3, title: "All Mine", file: "All Mine.mp3" }
        ]
    },
    {
        id: "thriller",
        title: "Thriller",
        artist: "Michael Jackson",
        cover: "music/thriller/cover.jpg",
        distributor: "℗ 1982 MJJ Productions Inc.",
        tracks: [
            { number: 1, title: "Wanna Be Startin' Somethin'", file: "Wanna Be Startin Somethin.mp3" },
            { number: 4, title: "Thriller", file: "Thriller.mp3" },
            { number: 6, title: "Billie Jean", file: "Billie Jean.mp3" }
        ]
    }
];

const artists = [
    { id: "mj", name: "Michael Jackson", hero: "images/mj-hero.jpg" },
    { id: "kanye", name: "Kanye West", hero: "images/kanye-hero.jpg" }
];

// --- THE ROUTER (Fixes the White Page/Clicking) ---
function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const albumId = urlParams.get('id');
    const artistId = urlParams.get('artist_id');

    if (window.location.pathname.includes('album.html') && albumId) {
        renderAlbumPage(albumId);
    } else if (window.location.pathname.includes('artist.html') && artistId) {
        renderArtistPage(artistId);
    } else {
        renderHomePage();
    }
}

function renderHomePage() {
    const container = document.getElementById('home-content');
    if (!container) return;

    container.innerHTML = `
        <div class="section">
            <h2>Top Picks for You</h2>
            <div class="horizontal-scroll">
                ${artists.map(a => `
                    <div class="artist-card" onclick="location.href='artist.html?artist_id=${a.id}'">
                        <img src="${a.hero}">
                        <h3>${a.name} Essentials</h3>
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="section">
            <h2>Albums</h2>
            <div class="album-grid">
                ${albums.map(al => `
                    <div class="album-card" onclick="location.href='album.html?id=${al.id}'">
                        <img src="${al.cover}">
                        <h3>${al.title}</h3>
                        <p>${al.artist}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderAlbumPage(id) {
    const album = albums.find(a => a.id === id);
    const container = document.getElementById('album-content');
    if (!album || !container) return;

    document.title = `${album.title} - ${album.artist}`;
    container.innerHTML = `
        <div class="album-header">
            <img src="${album.cover}">
            <h1>${album.title}</h1>
            <p>${album.artist}</p>
        </div>
        <div class="tracklist-grid">
            ${album.tracks.map(t => `
                <div class="track-item">
                    <span>${t.number}</span>
                    <p>${t.title}</p>
                </div>
            `).join('')}
        </div>
        <p class="distro">${album.distributor}</p>
    `;
}

window.onload = init;
