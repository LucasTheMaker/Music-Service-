const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const main = document.getElementById("main");
const trackName = document.getElementById("trackName");
const subText = document.getElementById("subText");

let currentAlbum = null;
let currentIndex = 0;
let isPlaying = false;

/* ========================= DATASET ========================= */
const albums = [
  {
    title: "ye", 
    artist: "Kanye West", 
    cover: "images/ye.jpg",
    year: "June 1, 2018", label: "GOOD Music", duration: "7 songs, 23 minutes",
    songs: [
      { title: "I Thought About Killing You", file: "music/ye/1.mp3" },
      { title: "Yikes", file: "music/ye/2.mp3" },
      { title: "All Mine", file: "music/ye/3.mp3" },
      { title: "Wouldn't Leave", file: "music/ye/4.mp3" },
      { title: "No Mistakes", file: "music/ye/5.mp3" },
      { title: "Ghost Town", file: "music/ye/6.mp3" },
      { title: "Violent Crimes", file: "music/ye/7.mp3" }
    ]
  },
  {
    title: "The College Dropout",
    artist: "Kanye West",
    cover: "images/dropout.jpg",
    year: "February 10, 2004", label: "Roc-A-Fella", duration: "21 songs, 76 minutes",
    songs: [
      { title: "Intro", file: "music/dropout/1.mp3" },
      { title: "We Don't Care", file: "music/dropout/2.mp3" },
      { title: "Graduation Day", file: "music/dropout/3.mp3" },
      { title: "All Falls Down", file: "music/dropout/4.mp3" },
      { title: "I'll Fly Away", file: "music/dropout/5.mp3" },
      { title: "Spaceship", file: "music/dropout/6.mp3" },
      { title: "Jesus Walks", file: "music/dropout/7.mp3" },
      { title: "Never Let Me Down", file: "music/dropout/8.mp3" },
      { title: "Get Em High", file: "music/dropout/9.mp3" },
      { title: "Workout Plan", file: "music/dropout/10.mp3" },
      { title: "The New Workout Plan", file: "music/dropout/11.mp3" },
      { title: "Slow Jamz", file: "music/dropout/12.mp3" },
      { title: "Breathe In Breathe Out", file: "music/dropout/13.mp3" },
      { title: "School Spirit Skit 1", file: "music/dropout/14.mp3" },
      { title: "School Spirit", file: "music/dropout/15.mp3" },
      { title: "School Spirit Skit 2", file: "music/dropout/16.mp3" },
      { title: "Lil Jimmy Skit", file: "music/dropout/17.mp3" },
      { title: "Two Words", file: "music/dropout/18.mp3" },
      { title: "Through The Wire", file: "music/dropout/19.mp3" },
      { title: "Family Business", file: "music/dropout/20.mp3" },
      { title: "Last Call", file: "music/dropout/21.mp3" }
    ]
  }
];

const artists = [
  { name: "Kanye West", image: "images/kanye.png" },
  { name: "Michael Jackson", image: "images/mj.jpg" }
];

/* ========================= RENDERING ========================= */

function loadHome() {
    main.innerHTML = `<h1>Home</h1><div class="artist-grid" id="artRow"></div><h2>Albums</h2><div class="album-grid" id="albRow"></div>`;
    const artRow = document.getElementById("artRow");
    const albRow = document.getElementById("albRow");

    artists.forEach((a, i) => {
        const d = document.createElement("div"); d.className = "artist-card";
        d.innerHTML = `<img src="${a.image}"><div class="artist-name">${a.name}</div>`;
        d.onclick = () => openArtist(i);
        artRow.appendChild(d);
    });
    
    albums.forEach((alb, i) => {
        const d = document.createElement("div"); d.className = "album-card";
        d.innerHTML = `<img src="${alb.cover}"><div class="album-title">${alb.title}</div>`;
        d.onclick = () => openAlbum(i);
        albRow.appendChild(d);
    });
}

function openArtist(i) {
    const artist = artists[i];
    main.innerHTML = `<button onclick="loadHome()" style="background:none; border:none; color:#888; cursor:pointer;">← Home</button><h1>${artist.name}</h1><div id="trackList"></div>`;
    // Filter songs belonging to this artist
    const filteredSongs = albums.filter(alb => alb.artist === artist.name).flatMap(alb => alb.songs);
    filteredSongs.forEach((s) => {
        const d = document.createElement("div"); d.style = "padding:15px 0; border-bottom:1px solid #222; cursor:
