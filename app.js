/* ========================= UPDATED ARTIST RENDER ========================= */
function loadArtists() {
    const row = document.getElementById("artistRow");
    row.innerHTML = "";
    artists.forEach(a => {
        const d = document.createElement("div");
        d.className = "artist-card";
        // This attribute allows the CSS to target MJ specifically
        d.setAttribute("data-artist", a.name); 
        
        d.innerHTML = `
            <img src="${a.image}">
            <div class="artist-name">${a.name}</div>
        `;
        d.onclick = () => openArtistPage(a.name);
        row.appendChild(d);
    });
}

/* ========================= RESTORED ALBUM DATA ========================= */
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
  },
  {
    title: "The College Dropout", artist: "Kanye West", cover: "images/dropout.jpg",
    year: "February 10, 2004", label: "Roc-A-Fella", duration: "21 songs, 76 minutes",
    songs: [
      { title: "Intro", file: "music/dropout/Intro.mp3" },
      { title: "We Don't Care", file: "music/dropout/We Dont Care.mp3" },
      { title: "Jesus Walks", file: "music/dropout/Jesus Walks.mp3" },
      { title: "Through The Wire", file: "music/dropout/Through The Wire.mp3" },
      { title: "Last Call", file: "music/dropout/Last Call.mp3" }
    ]
  },
  {
    title: "Thriller", artist: "Michael Jackson", cover: "images/thriller.jpg",
    year: "November 30, 1982", label: "Epic Records", duration: "9 songs, 42 minutes",
    songs: [
      { title: "Wanna Be Startin' Somethin'", file: "music/thriller/Wanna Be Startin Somethin.mp3" },
      { title: "Thriller", file: "music/thriller/Thriller.mp3" },
      { title: "Billie Jean", file: "music/thriller/Billie Jean.mp3" }
    ]
  }
];
