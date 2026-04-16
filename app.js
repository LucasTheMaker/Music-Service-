const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const volume = document.getElementById("volume");

const trackName = document.getElementById("trackName");
const subText = document.getElementById("subText");

const trackView = document.getElementById("trackView");

let currentAlbum = null;
let currentIndex = 0;
let isPlaying = false;

/* 🎵 ALBUMS */
const albums = [
  {
    title: "ye",
    artist: "Kanye West",
    cover: "images/ye.jpg",
    songs: [
      { title: "I Thought About Killing You", file: "music/1. I Thought About Killing You.mp3" },
      { title: "Yikes", file: "music/2. Yikes.mp3" },
      { title: "All Mine", file: "music/3. All Mine.mp3" },
      { title: "Ghost Town", file: "music/6. Ghost Town.mp3" }
    ]
  }
];

/* 👤 ARTISTS */
const artists = [
  {
    name: "Kanye West",
    image: "images/kanye.jpg",
    songs: albums[0].songs
  }
];

/* 🏠 HOME UI */
function loadHomeUI() {
  trackView.style.display = "none";

  const artistRow = document.getElementById("artistRow");
  const albumRow = document.getElementById("albumRow");

  artistRow.innerHTML = "";
  albumRow.innerHTML = "";

  /* 🎤 KANYE CARD */
  const kanye = artists[0];

  const card = document.createElement("div");
  card.className = "big-card";

  card.innerHTML = `<img src="${kanye.image}">`;
  card.onclick = () => openArtist(0);

  artistRow.appendChild(card);

  /* 📀 ALBUM ROW */
  albums.forEach((album, i) => {
    const div = document.createElement("div");
    div.className = "album-card";

    div.innerHTML = `
      <img src="${album.cover}">
      <div>${album.title}</div>
    `;

    div.onclick = () => openAlbum(i);
    albumRow.appendChild(div);
  });
}

/* 📀 OPEN ALBUM */
function openAlbum(i) {
  currentAlbum = albums[i];
  trackView.style.display = "block";
  trackView.innerHTML = "";

  currentAlbum.songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.className = "track";
    div.innerText = song.title;

    div.onclick = () => play(index);
    trackView.appendChild(div);
  });
}

/* 👤 OPEN ARTIST */
function openArtist(i) {
  const artist = artists[i];
  trackView.style.display = "block";
  trackView.innerHTML = "";

  artist.songs.forEach((song) => {
    const div = document.createElement("div");
    div.className = "track";
    div.innerText = song.title;

    div.onclick = () => playDirect(song);
    trackView.appendChild(div);
  });
}

/* ▶ PLAY */
function play(i) {
  currentIndex = i;
  const song = currentAlbum.songs[i];

  audio.src = encodeURI(song.file);
  audio.play();

  trackName.innerText = song.title;
  subText.innerText = currentAlbum.artist;

  isPlaying = true;
  playBtn.innerText = "⏸";
}

/* ▶ DIRECT PLAY */
function playDirect(song) {
  audio.src = encodeURI(song.file);
  audio.play();

  trackName.innerText = song.title;
  subText.innerText = "Kanye West";
}

/* ▶ PLAY/PAUSE */
playBtn.onclick = () => {
  if (!audio.src) return;

  if (isPlaying) {
    audio.pause();
    playBtn.innerText = "▶";
    isPlaying = false;
  } else {
    audio.play();
    playBtn.innerText = "⏸";
    isPlaying = true;
  }
};

/* ⏭ NEXT */
nextBtn.onclick = () => {
  if (!currentAlbum) return;

  currentIndex++;
  if (currentIndex >= currentAlbum.songs.length) currentIndex = 0;

  play(currentIndex);
};

/* ⏮ PREV */
prevBtn.onclick = () => {
  if (!currentAlbum) return;

  currentIndex--;
  if (currentIndex < 0) currentIndex = currentAlbum.songs.length - 1;

  play(currentIndex);
};

/* 🔊 VOLUME */
volume.oninput = () => {
  audio.volume = volume.value;
};

/* 🔁 AUTO NEXT */
audio.onended = () => {
  nextBtn.click();
};

/* 🚀 START */
loadHomeUI();
