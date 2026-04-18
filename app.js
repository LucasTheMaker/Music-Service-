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
    title: "ye", artist: "Kanye West", cover: "images/ye.jpg",
    year: "June 1, 2018", label: "GOOD Music", duration: "7 songs, 23 minutes",
    songs: [
      { title: "I Thought About Killing You", file: "music/ye/1. I Thought About Killing You.mp3" },
      { title: "Yikes", file: "music/ye/2. Yikes.mp3" },
      { title: "All Mine", file: "music/ye/3. All Mine.mp3" },
      { title: "Wouldn't Leave", file: "music/ye/4. Wouldn't Leave.mp3" },
      { title: "No Mistakes", file: "music/ye/5. No Mistakes.mp3" },
      { title: "Ghost Town", file: "music/ye/6. Ghost Town.mp3" },
      { title: "Violent Crimes", file: "music/ye/7. Violent Crimes.mp3" }
    ]
  },
  {
    title: "The College Dropout", artist: "Kanye West", cover: "images/dropout.jpg",
    year: "February 10, 2004", label: "Roc-A-Fella", duration: "21 songs, 76 minutes",
    songs: [
      { title: "Intro", file: "music/dropout/Intro.mp3" },
      { title: "We Don't Care", file: "music/dropout/We Dont Care.mp3" },
      { title: "Jesus Walks", file: "music/dropout/Jesus Walks.mp3" },
      { title: "Through The Wire", file: "music/dropout/Through The Wire.mp3" },
      { title: "Last Call", file: "music/dropout/Last Call.mp3" }
    ]
  },
  {
    title: "Thriller", artist: "Michael Jackson", cover: "images/thriller.jpg",
    year: "November 30, 1982", label: "Epic Records", duration: "9 songs, 42 minutes",
    songs: [
      { title: "Wanna Be Startin' Somethin'", file: "music/thriller/Wanna Be Startin Somethin.mp3" },
      { title: "Thriller", file: "music/thriller/Thriller.mp3" },
      { title: "Billie Jean", file: "music/thriller/Billie Jean.mp3" }
    ]
  }
];

const artists = [
  { name: "Kanye West", image: "images/kanye.png" },
  { name: "Michael Jackson", image: "images/mj.jpg" }
];

/* ========================= NAVIGATION ========================= */

function loadHome() {
    main.innerHTML = `<h1>Home</h1><div class="artist-grid" id="artRow"></div><h2>Albums</h2><div class="album-grid" id="albRow"></div>`;
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
                <h1 style="margin:0;">${currentAlbum.title}</h1>
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

/* ========================= CONTROLS ========================= */

playBtn.onclick = () => {
    if (isPlaying) { audio.pause(); playBtn.innerText = "▶"; }
    else { audio.play(); playBtn.innerText = "⏸"; }
    isPlaying = !isPlaying;
};

nextBtn.onclick = () => { if (currentIndex + 1 < currentAlbum.songs.length) playSong(currentIndex + 1); };
prevBtn.onclick = () => { if (currentIndex > 0) playSong(currentIndex - 1); };
audio.onended = () => { if (currentIndex + 1 < currentAlbum.songs.length) playSong(currentIndex + 1); };

// Ensures data renders immediately
document.addEventListener("DOMContentLoaded", loadHome);
