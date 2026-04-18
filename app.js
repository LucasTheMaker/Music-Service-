const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const main = document.getElementById("main");
const trackName = document.getElementById("trackName");
const subText = document.getElementById("subText");
const volume = document.getElementById("volume");

let currentAlbum = null;
let currentIndex = 0;
let isPlaying = false;

/* ========================= FOLDER-BASED DATA ========================= */
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
      { title: "The New Workout Plan", file: "music/dropout/The New Workout Plan.mp3" },
      { title: "Slow Jamz", file: "music/dropout/Slow Jamz.mp3" },
      { title: "School Spirit", file: "music/dropout/School Spirit.mp3" },
      { title: "Two Words", file: "music/dropout/Two Words.mp3" },
      { title: "Through The Wire", file: "music/dropout/Through The Wire.mp3" },
      { title: "Family Business", file: "music/dropout/Family Business.mp3" },
      { title: "Last Call", file: "music/dropout/Last Call.mp3" }
    ]
  },
  {
    title: "Late Registration",
    artist: "Kanye West",
    cover: "images/late.jpg",
    songs: [
      { title: "Wake Up Mr. West", file: "music/late/Wake Up Mr West.mp3" },
      { title: "Heard 'Em Say", file: "music/late/Heard Em Say.mp3" },
      { title: "Touch The Sky", file: "music/late/Touch The Sky.mp3" },
      { title: "Gold Digger", file: "music/late/Gold Digger.mp3" },
      { title: "Drive Slow", file: "music/late/Drive Slow.mp3" },
      { title: "Hey Mama", file: "music/late/Hey Mama.mp3" },
      { title: "Gone", file: "music/late/Gone.mp3" }
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
      { title: "Beat It", file: "music/thriller/Beat It.mp3" },
      { title: "Billie Jean", file: "music/thriller/Billie Jean.mp3" },
      { title: "Thriller", file: "music/thriller/Thriller.mp3" }
    ]
  }
];

const artists = [
  { name: "Kanye West", image: "images/kanye_cover.jpg", albums: albums.filter(a => a.artist.includes("Kanye West")) },
  { name: "Jay-Z", image: "images/jayz.png", albums: albums.filter(a => a.artist.includes("Jay-Z")) },
  { name: "Michael Jackson", image: "images/mj.png", albums: albums.filter(a => a.artist === "Michael Jackson") }
];

/* ========================= CORE LOGIC ========================= */

function loadHome() {
    main.innerHTML = `
        <h1>Home</h1>
        <h2>Artists</h2>
        <div class="artist-grid" id="artistRow"></div>
        <h2>Albums</h2>
        <div class="album-grid" id="albumRow"></div>
        <div id="detailView" style="margin-top:30px;"></div>
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
        div.innerHTML = `<img src="${album.cover}"><div>${album.title}</div>`;
        div.onclick = () => openAlbumPage(i);
        row.appendChild(div);
    });
}

function openAlbumPage(i) {
    currentAlbum = albums[i];
    const view = document.getElementById("detailView");
    view.innerHTML = `<h3>${currentAlbum.title}</h3>`;
    currentAlbum.songs.forEach((song, index) => {
        const div = document.createElement("div");
        div.className = "track";
        div.innerText = song.title;
        div.onclick = () => playSong(song, currentAlbum, index);
        view.appendChild(div);
    });
    view.scrollIntoView({ behavior: 'smooth' });
}

function openArtistPage(i) {
    const artist = artists[i];
    const view = document.getElementById("detailView");
    view.innerHTML = `<h3>${artist.name} - All Tracks</h3>`;
    artist.albums.forEach(album => {
        const sub = document.createElement("h4");
        sub.innerText = album.title;
        view.appendChild(sub);
        album.songs.forEach((song, index) => {
            const div = document.createElement("div");
            div.className = "track";
            div.innerText = song.title;
            div.onclick = () => playSong(song, album, index);
            view.appendChild(div);
        });
    });
    view.scrollIntoView({ behavior: 'smooth' });
}

function playSong(song, album, index) {
    if (!song) return;
    audio.src = encodeURI(song.file);
    audio.play().then(() => {
        trackName.innerText = song.title;
        subText.innerText = album ? album.artist : "Streaming";
        isPlaying = true;
        playBtn.innerText = "⏸";
    }).catch(err => console.error("Playback failed:", err));
}

playBtn.onclick = () => {
    if (isPlaying) { audio.pause(); playBtn.innerText = "▶"; }
    else { audio.play(); playBtn.innerText = "⏸"; }
    isPlaying = !isPlaying;
};

volume.oninput = () => { audio.volume = volume.value; };

loadHome();
