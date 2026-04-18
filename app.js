const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const main = document.getElementById("main");
const trackName = document.getElementById("trackName");
const subText = document.getElementById("subText");
const playerBar = document.querySelector(".player");

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
    title: "The College Dropout",
    artist: "Kanye West",
    cover: "images/dropout.jpg",
    year: "February 10, 2004", label: "Roc-A-Fella Records", duration: "21 songs, 1 hour 16 minutes",
    songs: [
      { title: "Intro", file: "music/dropout/Intro.mp3" },
      { title: "We Don't Care", file: "music/dropout/We Dont Care.mp3" },
      { title: "Graduation Day", file: "music/dropout/Graduation Day.mp3" },
      { title: "All Falls Down", file: "music/dropout/All Falls Down.mp3" },
      { title: "I'll Fly Away", file: "music/dropout/Ill Fly Away.mp3" },
      { title: "Spaceship", file: "music/dropout/Spaceship.mp3" },
      { title: "Jesus Walks", file: "music/dropout/Jesus Walks.mp3" },
      { title: "Never Let Me Down", file: "music/dropout/Never Let Me Down.mp3" },
      { title: "Get Em High", file: "music/dropout/Get Em High.mp3" },
      { title: "Workout Plan", file: "music/dropout/Workout Plan.mp3" },
      { title: "The New Workout Plan", file: "music/dropout/The New Workout Plan.mp3" },
      { title: "Slow Jamz", file: "music/dropout/Slow Jamz.mp3" },
      { title: "Breathe In Breathe Out", file: "music/dropout/Breathe In Breathe Out.mp3" },
      { title: "School Spirit Skit 1", file: "music/dropout/School Spirit Skit 1.mp3" },
      { title: "School Spirit", file: "music/dropout/School Spirit.mp3" },
      { title: "School Spirit Skit 2", file: "music/dropout/School Spirit Skit 2.mp3" },
      { title: "Lil Jimmy Skit", file: "music/dropout/Lil Jimmy Skit.mp3" },
      { title: "Two Words", file: "music/dropout/Two Words.mp3" },
      { title: "Through The Wire", file: "music/dropout/Through The Wire.mp3" },
      { title: "Family Business", file: "music/dropout/Family Business.mp3" },
      { title: "Last Call", file: "music/dropout/Last Call.mp3" }
    ]
  },
  {
    title: "Thriller",
    artist: "Michael Jackson",
    cover: "images/thriller.jpg",
    year: "November 30, 1982", label: "Epic Records", duration: "9 songs, 42 minutes",
    songs: [
      { title: "Wanna Be Startin' Somethin'", file: "music/thriller/Wanna Be Startin Somethin.mp3" },
      { title: "Baby Be Mine", file: "music/thriller/Baby Be Mine.mp3" },
      { title: "The Girl Is Mine", file: "music/thriller/The Girl Is Mine.mp3" },
      { title: "Thriller", file: "music/thriller/Thriller.mp3" },
      { title: "Beat It", file: "music/thriller/Beat It.mp3" },
      { title: "Billie Jean", file: "music/thriller/Billie Jean.mp3" },
      { title: "Human Nature", file: "music/thriller/Human Nature.mp3" },
      { title: "P.Y.T. (Pretty Young Thing)", file: "music/thriller/P Y T Pretty Young Thing.mp3" },
      { title: "The Lady in My Life", file: "music/thriller/The Lady In My Life.mp3" }
    ]
  }
];

const artists = [
  { name: "Kanye West", image: "images/kanye.png" },
  { name: "Michael Jackson", image: "images/mj.jpg" }
];

/* ========================= LOGIC ========================= */

playerBar.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") { playerBar.classList.toggle("expanded"); }
});

function loadHome() {
    main.innerHTML = `<h1>Home</h1><h2>Artists</h2><div class="artist-grid" id="artRow"></div><h2>Albums</h2><div class="album-grid" id="albRow"></div>`;
    artists.forEach(a => {
        const d = document.createElement("div"); d.className = "artist-card";
        d.innerHTML = `<img src="${a.image}"><div class="artist-name">${a.name}</div>`;
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
    main.innerHTML = `<button onclick="loadHome()">← Home</button><div class="album-header"><img src="${currentAlbum.cover}" style="width:180px;"><div class="header-info"><h1>${currentAlbum.title}</h1><p>${currentAlbum.artist}</p><div class="metadata">${currentAlbum.label} • ${currentAlbum.year}</div><div class="metadata">${currentAlbum.duration}</div></div></div><div id="trackList"></div>`;
    currentAlbum.songs.forEach((s, idx) => {
        const d = document.createElement("div"); d.className = "track";
        d.innerHTML = `<span>${idx + 1}</span> ${s.title}`;
        d.onclick = () => playSong(idx);
        document.getElementById("trackList").appendChild(d);
    });
}

function playSong(idx) {
    currentIndex = idx;
    const s = currentAlbum.songs[currentIndex];
    audio.src = encodeURI(s.file); audio.play();
    trackName.innerText = s.title; subText.innerText = currentAlbum.artist;
    if (!document.getElementById("playerArt")) { const img = document.createElement("img"); img.id = "playerArt"; playerBar.prepend(img); }
    document.getElementById("playerArt").src = currentAlbum.cover;
    isPlaying = true; playBtn.innerText = "⏸";
}

audio.onended = () => { if (currentIndex + 1 < currentAlbum.songs.length) playSong(currentIndex + 1); };
playBtn.onclick = (e) => { e.stopPropagation(); if (isPlaying) { audio.pause(); playBtn.innerText = "▶"; } else { audio.play(); playBtn.innerText = "⏸"; } isPlaying = !isPlaying; };
nextBtn.onclick = (e) => { e.stopPropagation(); if (currentIndex + 1 < currentAlbum.songs.length) playSong(currentIndex + 1); };
prevBtn.onclick = (e) => { e.stopPropagation(); if (currentIndex > 0) playSong(currentIndex - 1); };

loadHome();
