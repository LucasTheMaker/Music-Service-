const albums = [
  {
    id: "romantic",
    title: "The Romantic",
    artist: "Bruno Mars",
    releaseDate: "February 27, 2026",
    runtime: "31 minutes",
    cover: "music/romantic/romantic.png",
    tracks: [
      { number: 1, title: "Risk It All", duration: "3:24" },
      { number: 2, title: "Cha Cha Cha", duration: "3:56" },
      { number: 4, title: "God Was Showing Off", duration: "3:31" }
    ]
  },
  {
    id: "dropout",
    title: "The College Dropout",
    artist: "Ye",
    releaseDate: "February 10, 2004",
    runtime: "1 hour 16 minutes",
    cover: "music/dropout/cover.jpg",
    tracks: [
      { number: 4, title: "All Falls Down", duration: "3:43" },
      { number: 7, title: "Jesus Walks", duration: "3:13" }
    ]
  },
  {
    id: "late-registration",
    title: "Late Registration",
    artist: "Ye",
    releaseDate: "August 30, 2005",
    runtime: "1 hour 10 minutes",
    cover: "music/late-registration/cover.jpg",
    tracks: [
      { number: 4, title: "Gold Digger", duration: "3:27" }
    ]
  },
  {
    id: "thriller",
    title: "Thriller",
    artist: "Michael Jackson",
    releaseDate: "November 30, 1982",
    runtime: "42 minutes",
    cover: "music/thriller/cover.jpg",
    tracks: [
      { number: 6, title: "Billie Jean", duration: "4:53" }
    ]
  }
];

function renderMusic() {
  // Target every possible container in your HTML
  const containers = [
    document.getElementById('album-grid'),
    document.getElementById('album-container'),
    document.querySelector('.album-grid'),
    document.querySelector('.main-content')
  ];

  const target = containers.find(c => c !== null);

  if (!target) {
    console.error("Target container not found!");
    return;
  }

  target.innerHTML = albums.map(album => `
    <div class="album-card" onclick="window.location.href='album.html?id=${album.id}'" style="cursor:pointer; background: #1a1a1a; padding: 15px; border-radius: 10px; margin: 10px;">
      <img src="${album.cover}" alt="${album.title}" style="width:100%; border-radius: 5px;" onerror="this.src='https://via.placeholder.com/150?text=Music'">
      <div style="margin-top: 10px;">
        <h3 style="color: white; margin: 0; font-size: 1rem;">${album.title}</h3>
        <p style="color: #aaa; margin: 5px 0 0 0; font-size: 0.9rem;">${album.artist}</p>
      </div>
    </div>
  `).join('');
}

// Run immediately and also on load to be safe
renderMusic();
window.onload = renderMusic;
