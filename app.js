const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const main = document.getElementById("main");
const trackName = document.getElementById("trackName");
const subText = document.getElementById("subText");
const volume = document.getElementById("volume");
const playerBar = document.querySelector(".player");

let currentAlbum = null;
let currentIndex = 0;
let isPlaying = false;

/* ========================= FULL RESTORED DATA ========================= */
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
      { title: "Skit #1", file: "music/late/Skits 1.mp3" },
      { title: "Drive Slow", file: "music/late/Drive Slow.mp3" },
      { title: "My Way Home", file: "music/late/My Way Home.mp3" },
      { title: "Crack Music", file: "music/late/Crack Music.mp3" },
      { title: "Roses", file: "music/late/Roses.mp3" },
      { title: "Bring Me Down", file: "music/late/Bring Me Down.mp3" },
      { title: "Addiction", file: "music/late/Addiction.mp3" },
      { title: "Skit #2", file: "music/late/Skits 2.mp3" },
      { title: "Diamonds From Sierra Leone (Remix)", file: "music/late/Diamonds From Sierra Leone Remix.mp3" },
      { title: "We Major", file: "music/late/We Major.mp3" },
      { title: "Skit #3", file: "music/late/Skits 3.mp3" },
      { title: "Hey Mama", file: "music/late/Hey Mama.mp3" },
      { title: "Celebration", file: "music/late/Celebration.mp3" },
      { title: "Skit #4", file: "music/late/Skits 4.mp3" },
      { title: "Gone", file: "music/late/Gone.mp3" },
      { title: "Diamonds From Sierra Leone", file: "music/late/Diamonds From Sierra Leone.mp3" },
      { title: "Late", file: "music/late/Late.mp3" }
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
  },
  {
    title: "Watch The Throne",
    artist: "Jay-Z & Kanye West",
    cover: "images/blueprint.jpg",
    songs: [
      { title: "No Church In The Wild", file: "music/wtt/No Church In The Wild.mp3" },
      { title: "Niggas In Paris", file: "music/wtt/Niggas In Paris.mp3" },
      { title: "Otis", file: "music/wtt/Otis.mp3" }
    ]
  }
];

const artists = [
  { name: "Kanye West", image: "images/kanye.png" },
  { name: "Michael Jackson", image: "images/mj.jpg" },
  { name: "Jay-Z", image: "images/jayz.jpg" }
];

/* ========================= PLAYER INTERACTION ========================= */

playerBar.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON" && e.target.type !== "range") {
        playerBar.classList.toggle("expanded");
    }
});

/* ========================= UI RENDERING ========================= */

function loadHome() {
    main.innerHTML = `
        <h1 style="font-size: 32px; margin-bottom: 30px;">Home</h1>
        <h2>Artists</h2>
        <div class="scroll" id="artistRow"></div>
        <h2 style="margin-top: 40px;">Albums</h2>
        <div class="album-grid" id="albumRow"></div>
    `;
    renderArtists();
    renderAlbums();
}

function renderArtists() {
    const row = document.getElementById("artistRow");
    artists.forEach(artist => {
        const div = document.createElement("div");
        div.className = "artist-card";
        div.innerHTML = `<img src="${artist.image}"><div>${artist.name}</div>`;
        div.onclick = () => openArtistPage(artist.name);
        row.appendChild(div);
    });
}

function renderAlbums() {
    const row = document.getElementById("albumRow");
    albums.forEach((album, i) => {
        const div = document.createElement("div");
        div.className = "album-card";
        div.innerHTML = `<img src="${album.cover}"><div><strong>${album.title}</strong></div>`;
        div.onclick = () => openAlbum(i);
        row.appendChild(div);
    });
}

function openAlbum(i) {
    currentAlbum = albums[i];
    main.innerHTML = `
        <button onclick="loadHome()" class="back-btn">← Back</button>
        <div style="display:flex; gap:20px; align-items:center; margin-bottom:30px;">
            <img src="${currentAlbum.cover}" style="width:180px; border-radius:10px;">
            <div>
                <h1 style="margin:0;">${currentAlbum.title}</h1>
                <p style="color:#aaa;">${currentAlbum.artist}</p>
            </div>
        </div>
        <div id="trackList"></div>
    `;
    currentAlbum.songs.forEach((song, index) => {
        const div = document.createElement("div");
        div.className = "track";
        div.innerHTML = `<span style="color:#666; margin-right:15px;">${index + 1}</span> ${song.title}`;
        div.onclick = () => playSong(index);
        document.getElementById("trackList").appendChild(div);
    });
}

function playSong(index) {
    currentIndex = index;
    const song = currentAlbum.songs[currentIndex];
    audio.src = encodeURI(song.file);
    audio.play();

    trackName.innerText = song.title;
    subText.innerText = currentAlbum.artist;

    if (!document.getElementById("playerArt")) {
        const img = document.createElement("img");
        img.id = "playerArt";
        playerBar.prepend(img);
    }
    document.getElementById("playerArt").src = currentAlbum.cover;
    document.getElementById("playerArt").style.display = "block";

    isPlaying = true;
    playBtn.innerText = "⏸";
}

/* ========================= AUTO-PLAY LOGIC ========================= */

audio.onended = () => {
    if (currentAlbum && currentIndex + 1 < currentAlbum.songs.length) {
        currentIndex++;
        playSong(currentIndex);
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
