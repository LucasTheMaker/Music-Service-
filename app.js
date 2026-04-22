const audio = new Audio();

let currentAlbum = null;
let currentIndex = 0;

/* =========================
   ARTISTS
========================= */
const artists = [
{
id: "kanye",
name: "Kanye West",
image: "images/kanye.jpg",
bio: "Influential rapper and producer."
},
{
id: "mj",
name: "Michael Jackson",
image: "images/mj.jpg",
bio: "King of Pop."
},
{
id: "bruno",
name: "Bruno Mars",
image: "images/bruno.jpg",
bio: "Singer and performer."
}
];

/* =========================
   ALBUMS (FULL RESTORED)
========================= */
const albums = [

/* THE COLLEGE DROPOUT */
{
id: "dropout",
title: "The College Dropout",
artist: "Kanye West",
cover: "music/dropout/cover.jpg",
tracks: [
{ number: 1, title: "Intro", file: "music/dropout/Intro.mp3" },
{ number: 2, title: "We Don't Care", file: "music/dropout/We Dont Care.mp3" },
{ number: 3, title: "Graduation Day", file: "music/dropout/Graduation Day.mp3" },
{ number: 4, title: "All Falls Down", file: "music/dropout/All Falls Down.mp3" },
{ number: 5, title: "I'll Fly Away", file: "music/dropout/Ill Fly Away.mp3" },
{ number: 6, title: "Spaceship", file: "music/dropout/Spaceship.mp3" },
{ number: 7, title: "Jesus Walks", file: "music/dropout/Jesus Walks.mp3" },
{ number: 8, title: "Never Let Me Down", file: "music/dropout/Never Let Me Down.mp3" },
{ number: 9, title: "Get Em High", file: "music/dropout/Get Em High.mp3" },
{ number: 10, title: "Workout Plan", file: "music/dropout/Workout Plan.mp3" },
{ number: 11, title: "The New Workout Plan", file: "music/dropout/The New Workout Plan.mp3" },
{ number: 12, title: "Slow Jamz", file: "music/dropout/Slow Jamz.mp3" },
{ number: 13, title: "Breathe In Breathe Out", file: "music/dropout/Breathe In Breathe Out.mp3" },
{ number: 14, title: "School Spirit Skit 1", file: "music/dropout/School Spirit Skit 1.mp3" },
{ number: 15, title: "School Spirit", file: "music/dropout/School Spirit.mp3" },
{ number: 16, title: "School Spirit Skit 2", file: "music/dropout/School Spirit Skit 2.mp3" },
{ number: 17, title: "Lil Jimmy Skit", file: "music/dropout/Lil Jimmy Skit.mp3" },
{ number: 18, title: "Two Words", file: "music/dropout/Two Words.mp3" },
{ number: 19, title: "Through The Wire", file: "music/dropout/Through The Wire.mp3" },
{ number: 20, title: "Family Business", file: "music/dropout/Family Business.mp3" },
{ number: 21, title: "Last Call", file: "music/dropout/Last Call.mp3" }
]
},

/* LATE REGISTRATION */
{
id: "late",
title: "Late Registration",
artist: "Kanye West",
cover: "music/late/cover.jpg",
tracks: [
{ number: 1, title: "Wake Up Mr West", file: "music/late/Wake Up Mr West.mp3" },
{ number: 2, title: "Heard Em Say", file: "music/late/Heard Em Say.mp3" },
{ number: 3, title: "Touch The Sky", file: "music/late/Touch The Sky.mp3" },
{ number: 4, title: "Gold Digger", file: "music/late/Gold Digger.mp3" },
{ number: 5, title: "Skit 1", file: "music/late/Skit 1.mp3" },
{ number: 6, title: "Drive Slow", file: "music/late/Drive Slow.mp3" },
{ number: 7, title: "My Way Home", file: "music/late/My Way Home.mp3" },
{ number: 8, title: "Crack Music", file: "music/late/Crack Music.mp3" },
{ number: 9, title: "Roses", file: "music/late/Roses.mp3" },
{ number: 10, title: "Bring Me Down", file: "music/late/Bring Me Down.mp3" },
{ number: 11, title: "Addiction", file: "music/late/Addiction.mp3" },
{ number: 12, title: "Skit 2", file: "music/late/Skit 2.mp3" },
{ number: 13, title: "Diamonds From Sierra Leone (Remix)", file: "music/late/Diamonds Remix.mp3" },
{ number: 14, title: "We Major", file: "music/late/We Major.mp3" },
{ number: 15, title: "Skit 3", file: "music/late/Skit 3.mp3" },
{ number: 16, title: "Hey Mama", file: "music/late/Hey Mama.mp3" },
{ number: 17, title: "Celebration", file: "music/late/Celebration.mp3" },
{ number: 18, title: "Skit 4", file: "music/late/Skit 4.mp3" },
{ number: 19, title: "Gone", file: "music/late/Gone.mp3" },
{ number: 20, title: "Diamonds From Sierra Leone", file: "music/late/Diamonds.mp3" },
{ number: 21, title: "Late", file: "music/late/Late.mp3" }
]
},

/* YE */
{
id: "ye",
title: "ye",
artist: "Kanye West",
cover: "music/ye/cover.jpg",
tracks: [
{ number: 1, title: "I Thought About Killing You", file: "music/ye/1.mp3" },
{ number: 2, title: "Yikes", file: "music/ye/2.mp3" },
{ number: 3, title: "All Mine", file: "music/ye/3.mp3" },
{ number: 4, title: "Wouldn't Leave", file: "music/ye/4.mp3" },
{ number: 5, title: "No Mistakes", file: "music/ye/5.mp3" },
{ number: 6, title: "Ghost Town", file: "music/ye/6.mp3" },
{ number: 7, title: "Violent Crimes", file: "music/ye/7.mp3" }
]
},

/* THRILLER */
{
id: "thriller",
title: "Thriller",
artist: "Michael Jackson",
cover: "music/thriller/cover.jpg",
tracks: [
{ number: 1, title: "Wanna Be Startin Somethin", file: "music/thriller/1.mp3" },
{ number: 2, title: "Baby Be Mine", file: "music/thriller/2.mp3" },
{ number: 3, title: "The Girl Is Mine", file: "music/thriller/3.mp3" },
{ number: 4, title: "Thriller", file: "music/thriller/4.mp3" },
{ number: 5, title: "Beat It", file: "music/thriller/5.mp3" },
{ number: 6, title: "Billie Jean", file: "music/thriller/6.mp3" },
{ number: 7, title: "Human Nature", file: "music/thriller/7.mp3" },
{ number: 8, title: "P.Y.T.", file: "music/thriller/8.mp3" },
{ number: 9, title: "The Lady In My Life", file: "music/thriller/9.mp3" }
]
},

/* THE ROMANTIC */
{
id: "romantic",
title: "The Romantic",
artist: "Bruno Mars",
cover: "music/romantic/cover.jpg",
tracks: [
{ number: 1, title: "Risk It All", file: "music/romantic/1.mp3" },
{ number: 2, title: "Cha Cha Cha", file: "music/romantic/2.mp3" },
{ number: 3, title: "I Just Might", file: "music/romantic/3.mp3" },
{ number: 4, title: "God Was Showing Off", file: "music/romantic/4.mp3" },
{ number: 5, title: "Why You Wanna Fight", file: "music/romantic/5.mp3" },
{ number: 6, title: "On My Soul", file: "music/romantic/6.mp3" },
{ number: 7, title: "Something Serious", file: "music/romantic/7.mp3" },
{ number: 8, title: "Nothing Left", file: "music/romantic/8.mp3" },
{ number: 9, title: "Dance With Me", file: "music/romantic/9.mp3" }
]
}

];

/* =========================
   BOOT
========================= */
document.addEventListener("DOMContentLoaded", () => {
renderHome();
});

/* =========================
   HOME
========================= */
function renderHome() {
const app = document.getElementById("app");

app.innerHTML = `
<h2>Albums</h2>
<div class="album-grid">
${albums.map(a => `
<div class="album-card" onclick="openAlbum('${a.id}')">
<img src="${a.cover}">
<p>${a.title}</p>
</div>
`).join("")}
</div>

<h2>Artists</h2>
<div class="artist-grid">
${artists.map(a => `
<div class="artist-card" onclick="openArtist('${a.id}')">
<img src="${a.image}">
<p>${a.name}</p>
</div>
`).join("")}
</div>
`;
}

/* =========================
   ALBUM PAGE
========================= */
function openAlbum(id) {
const album = albums.find(a => a.id === id);
const app = document.getElementById("app");

app.innerHTML = `
<button onclick="renderHome()">← Back</button>

<img src="${album.cover}" style="width:100%;max-width:300px">

<h1>${album.title}</h1>
<p>${album.artist}</p>

<div class="tracklist">
${album.tracks.map((t,i) => `
<div onclick="playSong('${album.id}', ${i})">
${t.number}. ${t.title}
</div>
`).join("")}
</div>
`;
}

/* =========================
   PLAYER
========================= */
function playSong(albumId, index) {
const album = albums.find(a => a.id === albumId);
const song = album.tracks[index];

currentAlbum = album;
currentIndex = index;

audio.src = song.file;
audio.play();

document.getElementById("player-track-title").innerText = song.title;
document.getElementById("player-track-artist").innerText = album.artist;
}
