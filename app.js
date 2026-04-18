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

/* ========================= LOCKED DATA (RESTORED TRACKLISTS) ========================= */
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
  },
  {
    title: "Late Registration",
    artist: "Kanye West",
    cover: "images/late-registration.png",
    year: "August 30, 2005", label: "Roc-A-Fella", duration: "21 songs, 70 minutes",
    songs: [
      { title: "Wake Up Mr. West", file: "music/late/1.mp3" },
      { title: "Heard 'Em Say", file: "music/late/2.mp3" },
      { title: "Touch The Sky", file: "music/late/3.mp3" },
      { title: "Gold Digger", file: "music/late/4.mp3" },
      { title: "Skit #1", file: "music/late/5.mp3" },
      { title: "Drive Slow", file: "music/late/6.mp3" },
      { title: "My Way Home", file: "music/late/7.mp3" },
      { title: "Crack Music", file: "music/late/8.mp3" },
      { title: "Roses", file: "music/late/9.mp3" },
      { title: "Bring Me Down", file: "music/late/10.mp3" },
      { title: "Addiction", file: "music/late/11.mp3" },
      { title: "Skit #2", file: "music/late/12.mp3" },
      { title: "Diamonds From Sierra Leone (Remix)", file: "music/late/13.mp3" },
      { title: "We Major", file: "music/late/14.mp3" },
      { title: "Skit #3", file: "music/late/15.mp3" },
      { title: "Hey Mama", file: "music/late/16.mp3" },
      { title: "Celebration", file: "music/late/17.mp3" },
      { title: "Skit #4", file: "music/late/18.mp3" },
      { title: "Gone", file: "music/late/19.mp3" },
      { title: "Diamonds From Sierra Leone", file: "music/late/20.mp3" },
      { title: "Late", file: "music/late/21.mp3" }
    ]
  },
  {
    title: "Thriller",
    artist: "Michael Jackson",
    cover: "images/thriller.jpg",
    year: "November 30, 1982", label: "Epic Records", duration: "9 songs, 42 minutes",
    songs: [
      { title: "Wanna Be Startin' Somethin'", file: "music/thriller/1.mp3" },
      { title: "Baby Be Mine", file: "music/thriller/2.mp3" },
      { title: "The Girl Is Mine", file: "music/thriller/3.mp3" },
      { title: "Thriller", file: "music/thriller/4.mp3" },
      { title: "Beat It", file: "music/thriller/5.mp3" },
      { title: "Billie Jean", file: "music/thriller/6.mp3" },
      { title: "Human Nature", file: "music/thriller/7.mp3" },
      { title: "P.Y.T. (Pretty Young Thing)", file: "music/thriller/8.mp3" },
      { title: "The Lady in My Life", file: "music/thriller/9.mp3" }
    ]
  }
];

const artists = [
  { name: "Kanye West", image: "images/kanye.png" },
  { name: "Michael Jackson", image: "images/mj.jpg" }
];

/* ========================= RENDER LOGIC ========================= */

function loadHome() {
    main.innerHTML = `
        <h1>Home</h1>
        <div class="artist-grid" id="artRow"></div>
        <h2 style="margin-top:30px;">Albums</h2>
        <div class="album-grid" id="albRow"></div>
    `;
    const artRow = document.getElementById("artRow");
    artists.forEach(a => {
        const d = document.createElement("div"); d.className = "artist-card";
        d.innerHTML = `<img src="${a.image}"><div class="artist-name">${a.name}</div>`;
        d.onclick = () => openArtistPage(a.name);
        artRow.appendChild(d);
    });
    
    const albRow = document.getElementById("albRow");
    albums.forEach((alb, i) => {
        const d = document.createElement("div"); d.className = "album-card";
        d.innerHTML = `<img src="${alb.cover}"><div class="album-title">${alb.title}</div>`;
        d.onclick = () => openAlbum(i);
        albRow.appendChild(d);
    });
}

function openAlbum(i) {
    currentAlbum = albums[i];
    main.innerHTML = `
        <button onclick="loadHome()" style="background:none; border:none; color:#888; cursor:pointer; margin-bottom:15px;">← Home</button>
        <div style="display:flex; gap:20px; margin-bottom:25px;">
            <img src="${currentAlbum.cover}" style="width:140px; border-radius:10px;">
            <div>
                <h2 style="margin:0;">${currentAlbum.title}</h2>
                <p style="color:var(--accent); font-weight:bold;">${currentAlbum.artist}</p>
                <div style="font-size:12px; color:#666;">${currentAlbum.label} • ${currentAlbum.year}</div>
                <div style="font-size:12px; color:#555;">${currentAlbum.duration}</div>
            </div>
        </div>
        <div id="trackList"></div>
    `;
    currentAlbum.songs.forEach((s, idx) => {
        const d = document.createElement("div");
        d.style = "padding:15px 0; border-bottom:1px solid #222; cursor:pointer;";
        d.innerHTML = `<span style="color:#444; margin-right:15px;">${idx+1}</span> ${s.title}`;
        d.onclick = () => playSong(idx);
        document.getElementById("trackList").appendChild(d);
    });
}

function playSong(idx) {
    currentIndex = idx;
    const s = currentAlbum.songs[currentIndex];
    audio.src = encodeURI(s.file);
    audio.play();
    trackName.innerText = s.title;
    subText.innerText = currentAlbum.artist;
    isPlaying = true;
    playBtn.innerText = "⏸";
}

playBtn.onclick = () => {
    if (isPlaying) { audio.pause(); playBtn.innerText = "▶"; }
    else { audio.play(); playBtn.innerText = "⏸"; }
    isPlaying = !isPlaying;
};

document.addEventListener("DOMContentLoaded", loadHome);
