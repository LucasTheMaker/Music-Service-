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

/* ========================= LOCKED DATA ========================= */
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
  }
];

const artists = [
  { name: "Kanye West", image: "images/kanye.png" },
  { name: "Michael Jackson", image: "images/mj.jpg" } // Locked MJ Image
];

/* ========================= RENDER LOGIC ========================= */

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
