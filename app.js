/* ========================= UPDATED PLAYER HTML STRUCTURE ========================= */

// This part goes inside your loadHome or wherever you define the player structure
// But since your player is static in index.html, ensure the IDs match.

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

/* ========================= PLAYBACK & AUTO-PLAY ========================= */

function playSong(index) {
    currentIndex = index;
    const song = currentAlbum.songs[currentIndex];
    audio.src = encodeURI(song.file);
    audio.play();

    trackName.innerText = song.title;
    subText.innerText = currentAlbum.artist;

    let art = document.getElementById("playerArt");
    if (!art) {
        art = document.createElement("img");
        art.id = "playerArt";
        playerBar.prepend(art);
    }
    art.src = currentAlbum.cover;
    art.style.display = "block";

    isPlaying = true;
    playBtn.innerText = "⏸";
}

// Button Click Logic
playBtn.onclick = (e) => {
    e.stopPropagation(); // Prevents expanding the bar when clicking pause
    if (isPlaying) { audio.pause(); playBtn.innerText = "▶"; }
    else { audio.play(); playBtn.innerText = "⏸"; }
    isPlaying = !isPlaying;
};

prevBtn.onclick = (e) => {
    e.stopPropagation();
    if (currentIndex > 0) {
        playSong(currentIndex - 1);
    }
};

nextBtn.onclick = (e) => {
    e.stopPropagation();
    if (currentIndex + 1 < currentAlbum.songs.length) {
        playSong(currentIndex + 1);
    }
};

// AUTO-PLAY NEXT SONG
audio.onended = () => {
    if (currentIndex + 1 < currentAlbum.songs.length) {
        playSong(currentIndex + 1);
    }
};
