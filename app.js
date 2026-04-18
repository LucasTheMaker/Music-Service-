const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const main = document.getElementById("main");
const trackName = document.getElementById("trackName");
const subText = document.getElementById("subText");

let currentAlbum = null;
let currentIndex = 0;
let isPlaying = false;

const albums = [
  {
    title: "ye",
    artist: "Kanye West",
    cover: "images/ye.jpg",
    songs: [
      { title: "I Thought About Killing You", file: "music/ye/1.mp3" },
      { title: "Yikes", file: "music/ye/2.mp3" },
      { title: "All Mine", file: "music/ye/3.mp3" },
      { title: "Wouldn't Leave", file: "music/ye/4.mp3" },
      { title: "No Mistakes", file: "music/ye/5.mp3" },
      { title: "Ghost Town", file: "music/ye/6.mp3" },
      { title: "Violent Crimes", file: "music/ye/7.mp3" }
    ]
  }
];

const artists = [
  { name: "Kanye West", image: "images/kanye.png" },
  { name: "Michael Jackson", image: "images/mj.jpg" }
];

function loadHome() {
    main.innerHTML = `<h1>Home</h1><div class="artist-grid" id="artRow"></div><h2>Albums</h2><div class="album-grid" id="albRow"></div>`;
    artists.forEach((a, i) => {
        const d = document.createElement("div"); d.className = "artist-card";
        d.innerHTML = `<img src="${a.image}"><div class="artist-name">${a.name}</div>`;
        d.onclick = () => openArtist(i);
        document.getElementById("artRow").appendChild(d);
    });
    albums.forEach((alb, i) => {
        const d = document.createElement("div"); d.className = "album-card";
        d.innerHTML = `<img src="${alb.cover}"><div class="album-title">${alb.title}</div>`;
        d.onclick = () => openAlbum(i);
        document.getElementById("albRow").appendChild(d);
    });
}

function openAlbum(i) {
    currentAlbum = albums[i];
    main.innerHTML = `<button onclick="loadHome()">← Home</button><div style="display:flex; gap:20px; margin:20px 0;"><img src="${currentAlbum.cover}" style="width:120px; border-radius:10px;"><div><h2>${currentAlbum.title}</h2><p>${currentAlbum.artist}</p></div></div><div id="trackList"></div>`;
    currentAlbum.songs.forEach((s, idx) => {
        const d = document.createElement("div"); d.className = "track";
        d.innerHTML = `<span>${idx+1}</span> ${s.title}`;
        d.onclick = () => playSong(idx);
        document.getElementById("trackList").appendChild(d);
    });
}

function openArtist(i) {
    const artist = artists[i];
    main.innerHTML = `<button onclick="loadHome()">← Home</button><h1>${artist.name}</h1><div id="trackList"></div>`;
    const filteredSongs = albums.filter(alb => alb.artist === artist.name).flatMap(alb => alb.songs);
    filteredSongs.forEach((s) => {
        const d = document.createElement("div"); d.className = "track"; d.innerHTML = s.title;
        d.onclick = () => { audio.src = encodeURI(s.file); audio.play(); trackName.innerText = s.title; subText.innerText = artist.name; playBtn.innerText = "⏸"; isPlaying = true; };
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
    if (isPlaying) { audio.pause(); playBtn.innerText = "▶"; isPlaying = false; }
    else { audio.play(); playBtn.innerText = "⏸"; isPlaying = true; }
};

document.addEventListener("DOMContentLoaded", loadHome);
