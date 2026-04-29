const audio = document.getElementById("audio-player");

const title = document.getElementById("song-title");
const artist = document.getElementById("artist-name");
const miniTitle = document.getElementById("mini-title");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const cover = document.getElementById("album-cover");

const currentTimeEl = document.getElementById("current-time");
const remainingTimeEl = document.getElementById("remaining-time");

const fullPlayer = document.getElementById("fullPlayer");

const homeView = document.getElementById("home-view");
const albumView = document.getElementById("album-view");

const albumCoverImg = document.getElementById("album-cover-img");
const albumTitle = document.getElementById("album-title");
const albumArtist = document.getElementById("album-artist");
const trackList = document.getElementById("track-list");

/* ALBUM DATA */
const albums = {
  war: {
    title: "WAR",
    artist: "Kanye West & James Blake",
    cover: "war/warlol.png",
    tracks: [
      { title: "For Once In My Life", src: "music/inmylife.mp3" },
      { title: "What I Would Have Said At Virgil's Funeral", src: "music/virgil.mp3" },
      { title: "Talking", src: "music/talking.mp3" },
      { title: "Hold Up, Get Up", src: "music/HUGU.mp3" }
    ]
  },

  bully: {
    title: "BULLY",
    artist: "Kanye West",
    cover: "lol/bully-cover.jpg",
    tracks: [
      { title: "KING", src: "bully/KING_spotdown.org.mp3" },
      { title: "THIS A MUST", src: "bully/THIS A MUST_spotdown.org.mp3" },
      { title: "FATHER (feat. Travis Scott)", src: "bully/FATHER (feat. Travis Scott)_spotdown.org.mp3" },
      { title: "ALL THE LOVE (feat. Andre Troutman)", src: "bully/ALL THE LOVE (feat. Andre Troutman)_spotdown.org.mp3" },
      { title: "PUNCH DRUNK", src: "bully/PUNCH DRUNK_spotdown.org.mp3" },
      { title: "WHATEVER WORKS", src: "bully/WHATEVER WORKS_spotdown.org.mp3" },
      { title: "MAMA'S FAVORITE", src: "bully/MAMA’S FAVORITE_spotdown.org.mp3" },
      { title: "SISTERS AND BROTHERS", src: "bully/SISTERS AND BROTHERS_spotdown.org.mp3" },
      { title: "BULLY (feat. CeeLo Green)", src: "bully/BULLY (feat. CeeLo Green)_spotdown.org.mp3" },
      { title: "HIGHS AND LOWS", src: "bully/HIGHS AND LOWS_spotdown.org.mp3" },
      { title: "I CAN'T WAIT", src: "bully/I CAN’T WAIT_spotdown.org.mp3" },
      { title: "WHITE LINES (feat. Andre Troutman)", src: "bully/WHITE LINES (feat. Andre Troutman)_spotdown.org.mp3" },
      { title: "CIRCLES", src: "bully/CIRCLES.mp3" },
      { title: "PREACHER MAN", src: "bully/PREACHER MAN.mp3" },
      { title: "BEAUTY AND THE BEAST", src: "bully/BEAUTY AND THE BEAST.mp3" },
      { title: "DAMN", src: "bully/DAMN.mp3" },
      { title: "LAST BREATH (feat. Peso Pluma)", src: "bully/LAST BREATH (feat. Peso Pluma)_spotdown.org.mp3" },
      { title: "THIS ONE HERE", src: "bully/THIS ONE HERE_spotdown.org.mp3" }
    ]
  },

  tryingtimes: {
    title: "Trying Times",
    artist: "James Blake",
    cover: "fun/ttcover.png",
    tracks: [
      { title: "Walk Out Music", src: "tt/1. Walk Out Music.mp3" },
      { title: "Death of Love", src: "tt/2. Death of Love.mp3" },
      { title: "I Had a Dream She Took My Hand", src: "tt/3. I Had a Dream She Took My Hand.mp3" },
      { title: "Trying Times", src: "tt/4. Trying Times.mp3" },
      { title: "Make Something Up", src: "tt/5. Make Something Up.mp3" },
      { title: "Didn’t Come To Argue", src: "tt/6. Didn’t Come To Argue.mp3" },
      { title: "Days Go By", src: "tt/7. Days Go By.mp3" },
      { title: "Doesn’t Just Happen", src: "tt/8. Doesn’t Just Happen.mp3" },
      { title: "Obsession", src: "tt/9. Obsession.mp3" },
      { title: "Rest Of Your Life", src: "tt/10. Rest Of Your Life.mp3" },
      { title: "Through The High Wire", src: "tt/11. Through The High Wire.mp3" },
      { title: "Feel It Again", src: "tt/12. Feel It Again.mp3" },
      { title: "Just A Little Higher", src: "tt/13. Just A Little Higher.mp3" }
    ]
  }
};

let currentAlbum = null;
let currentTrack = 0;

/* HOME → ALBUM */
function openAlbum(name) {
  currentAlbum = albums[name];

  homeView.style.display = "none";
  albumView.style.display = "block";

  albumCoverImg.src = currentAlbum.cover;
  albumTitle.textContent = currentAlbum.title;
  albumArtist.textContent = currentAlbum.artist;

  trackList.innerHTML = "";

  currentAlbum.tracks.forEach((t, i) => {
    const div = document.createElement("div");
    div.className = "track";
    div.innerHTML = `<span class="track-num">${i + 1}</span> ${t.title}`;
    div.onclick = () => playTrack(i);
    trackList.appendChild(div);
  });
}

/* BACK */
function goHome() {
  albumView.style.display = "none";
  homeView.style.display = "block";
}

/* LOAD TRACK */
function loadTrack(i, play = false) {
  const song = currentAlbum.tracks[i];

  audio.src = song.src;
  title.textContent = song.title;
  artist.textContent = currentAlbum.artist;
  miniTitle.textContent = song.title;

  cover.style.backgroundImage = `url('${currentAlbum.cover}')`;
  cover.style.backgroundSize = "cover";
  cover.style.backgroundPosition = "center";

  if (play) audio.play();
}

/* PLAY */
function playTrack(i) {
  currentTrack = i;
  loadTrack(i, true);
  expandPlayer();
}

/* NEXT / PREV */
function nextTrack() {
  currentTrack = (currentTrack + 1) % currentAlbum.tracks.length;
  loadTrack(currentTrack, true);
}

function prevTrack() {
  currentTrack =
    (currentTrack - 1 + currentAlbum.tracks.length) %
    currentAlbum.tracks.length;
  loadTrack(currentTrack, true);
}

/* AUTO NEXT */
audio.addEventListener("ended", () => {
  nextTrack();
});

/* PLAYER UI */
function playPause() {
  audio.paused ? audio.play() : audio.pause();
}

function expandPlayer() {
  fullPlayer.classList.add("active");
}

function closePlayer() {
  fullPlayer.classList.remove("active");
}

/* TIME */
function format(t) {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration)) {
    progress.value = (audio.currentTime / audio.duration) * 100;

    currentTimeEl.textContent = format(audio.currentTime);
    remainingTimeEl.textContent =
      "-" + format(audio.duration - audio.currentTime);
  }
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});
