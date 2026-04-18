const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const main = document.getElementById("main");
const trackName = document.getElementById("trackName");
const subText = document.getElementById("subText");
const volume = document.getElementById("volume");

let currentAlbum = null;
let currentIndex = 0;
let isPlaying = false;
let isRepeat = false; 

/* ========================= UPDATED DATA ========================= */
const albums = [
  {
    title: "ye",
    artist: "Kanye West",
    cover: "images/ye.jpg",
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
    title: "Late Registration",
    artist: "Kanye West",
    cover: "images/late-registration.png",
    songs: [
      { title: "Wake Up Mr. West", file: "music/late/Wake Up Mr West.mp3" },
      { title: "Heard 'Em Say", file: "music/late/Heard Em Say.mp3" },
      { title: "Touch The Sky", file: "music/late/Touch The Sky.mp3" },
      { title: "Gold Digger", file: "music/late/Gold Digger.mp3" },
      { title: "Skit #1", file: "music/late/Skit 1.mp3" },
      { title: "Drive Slow", file: "music/late/Drive Slow.mp3" },
      { title: "Crack Music", file: "music/late/Crack Music.mp3" },
      { title: "Roses", file: "music/late/Roses.mp3" },
      { title: "Bring Me Down", file: "music/late/Bring Me Down.mp3" },
      { title: "Addiction", file: "music/late/Addiction.mp3" },
      { title: "Skit #2", file: "music/late/Skit 2.mp3" },
      { title: "Diamonds From Sierra Leone (Remix)", file: "music/late/Diamonds From Sierra Leone.mp3" },
      { title: "We Major", file: "music/late/We Major.mp3" },
      { title: "Skit #3", file: "music/late/Skit 3.mp3" },
      { title: "Hey Mama", file: "music/late/Hey Mama.mp3" },
      { title: "Celebration", file: "music/late/Celebration.mp3" },
      { title: "Skit #4", file: "music/late/Skit 4.mp3" },
      { title: "Gone", file: "music/late/Gone.mp3" },
      { title: "Diamonds From Sierra Leone", file: "music/late/Diamonds From Sierra Leone Bonus.mp3" },
      { title: "Late", file: "music/late/Late.mp3" }
    ]
  },
  {
    title: "Watch The Throne",
    artist: "Jay-Z & Kanye West",
    cover: "images/wtt.jpg",
    songs: [
      { title: "No Church In The Wild", file: "music/wtt/No Church In The Wild.mp3" },
      { title: "Niggas In Paris", file: "music/wtt/Niggas In Paris.mp3" },
      { title: "Otis", file: "music/wtt/Otis.mp3" }
    ]
  },
  {
    title: "Thriller",
    artist: "Michael Jackson",
    cover: "images/thriller.jpg",
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
  { 
    name: "Kanye West", 
    image: "images/kanye.png", 
    bio: "American rapper, designer, and producer. One of the most influential musicians of the 21st century.",
    albums: albums.filter(a => a.artist.includes("Kanye West")) 
  },
  { 
    name: "Michael Jackson", 
    image: "images/mj.jpg", 
    bio: "The King of Pop. His 1982 album 'Thriller' remains the best-selling album of all time.",
    albums: albums.filter(a => a.artist === "Michael Jackson") 
  },
  { 
    name: "Jay-Z", 
    image: "images/jayz.jpg", 
    bio: "New York rapper and business mogul. Co-founder of Roc-A-Fella Records.",
    albums: albums.filter(a => a.artist.includes("Jay-Z")) 
  }
];

/* ========================= LOGIC ========================= */

function loadHome() {
    main.innerHTML = `
        <h1 class="home-title">Home</h1>
        <div class="section-container">
            <h2>Artists</h2>
            <div class="artist-grid" id="artistRow"></div>
        </div>
        <div class="section-container">
            <h2>Albums</h2>
            <div class="album-grid" id="albumRow"></div>
        </div>
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
        div.onclick = () => openArtistPage(i);
        row.appendChild(div);
    });
}

function renderAlbums() {
    const row = document.getElementById("albumRow");
    albums.forEach((album, i) => {
        const div = document.createElement("div");
        div.className = "album-card";
        div.innerHTML = `<img src="${album.cover}"><div><strong>${album.title}</strong></div>`;
        div.onclick = () => openAlbumPage(i);
        row.appendChild(div);
    });
}

function openArtistPage(i) {
    const artist = artists[i];
    main.innerHTML = `
        <div class="detail-page">
            <button class="back-btn" onclick="loadHome()">← Back</button>
            <div class="header-hero">
                <img src="${artist.image}" class="hero-img">
                <div class="hero-text">
                    <h1>${artist.name}</h1>
                    <p class="bio">${artist.bio}</p>
                </div>
            </div>
            <h2>Discography</h2>
            <div class="album-grid" id="artistAlbums"></div>
        </div>
    `;
    const albumRow = document.getElementById("artistAlbums");
    artist.albums.forEach(album => {
        const div = document.createElement("div");
        div.className = "album-card";
        div.innerHTML = `<img src="${album.cover}"><div>${album.title}</div>`;
        div.onclick = () => {
            const index = albums.findIndex(a => a.title === album.title);
            openAlbumPage(index);
        };
        albumRow.appendChild(div);
    });
}

function openAlbumPage(i) {
    currentAlbum = albums[i];
    main.innerHTML = `
        <div class="detail-page">
            <button class="back-btn" onclick="loadHome()">← Back</button>
            <div class="album-header" style="display:flex; gap:20px; align-items:center; margin-bottom:30px;">
                <img src="${currentAlbum.cover}" style="width:200px; border-radius:15px;">
                <div>
                    <h1>${currentAlbum.title}</h1>
                    <p>${currentAlbum.artist}</p>
                </div>
            </div>
            <div id="trackList"></div>
        </div>
    `;
    const list = document.getElementById("trackList");
    currentAlbum.songs.forEach((song, index) => {
        const div = document.createElement("div");
        div.className = "track";
        div.innerHTML = `<span class="track-num">${index + 1}</span> <span>${song.title}</span>`;
        div.onclick = () => playSong(song, currentAlbum, index);
        list.appendChild(div);
    });
}

function playSong(song, album, index) {
    if (!song) return;
    currentIndex = index;
    currentAlbum = album;
    audio.src = encodeURI(song.file);
    audio.play().then(() => {
        trackName.innerText = song.title;
        subText.innerText = album ? album.artist : "Streaming";
        isPlaying = true;
        playBtn.innerText = "⏸";
    }).catch(err => console.error("Playback failed:", err));
}

// AUTO-PLAY NEXT SONG OR REPEAT
audio.onended = () => {
    if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
    } else if (currentAlbum && currentIndex + 1 < currentAlbum.songs.length) {
        currentIndex++;
        const nextSong = currentAlbum.songs[currentIndex];
        playSong(nextSong, currentAlbum, currentIndex);
    } else {
        isPlaying = false;
        playBtn.innerText = "▶";
    }
};

playBtn.onclick = () => {
    if (isPlaying) { audio.pause(); playBtn.innerText = "▶"; }
    else { audio.play(); playBtn.innerText = "⏸"; }
    isPlaying = !isPlaying;
};

volume.oninput = () => { audio.volume = volume.value; };

loadHome();
