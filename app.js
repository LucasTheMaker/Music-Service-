const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
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
    title: "Late Registration",
    artist: "Kanye West",
    cover: "images/late-registration.png",
    year: "August 30, 2005", label: "Roc-A-Fella Records", duration: "21 songs, 1 hour 10 minutes",
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

/* ========================= NAVIGATION & PLAYBACK ========================= */

function openAlbum(i) {
    currentAlbum = albums[i];
    main.innerHTML = `
        <button onclick="loadHome()" class="back-btn">← Home</button>
        <div class="album-header">
            <img src="${currentAlbum.cover}" class="header-img">
            <div class="header-info">
                <h1>${currentAlbum.title}</h1>
                <p style="color:#fa233b; font-weight:600;">${currentAlbum.artist}</p>
                <div class="metadata">${currentAlbum.label} • ${currentAlbum.year}</div>
                <div class="metadata" style="margin-top:5px; color:#555;">${currentAlbum.duration}</div>
            </div>
        </div>
        <div id="trackList"></div>
    `;
    currentAlbum.songs.forEach((song, index) => {
        const div = document.createElement("div");
        div.className = "track";
        div.innerHTML = `<span class="track-num">${index + 1}</span> <span>${song.title}</span>`;
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
    isPlaying = true;
    playBtn.innerText = "⏸";
}

// ⏭️ AUTO-PLAY NEXT SONG
audio.onended = () => {
    if (currentIndex + 1 < currentAlbum.songs.length) {
        playSong(currentIndex + 1);
    }
};

/* Rest of navigation (loadHome, renderArtists, etc.) remains the same */
