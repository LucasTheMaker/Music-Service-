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

function renderAlbums() {
  // Your index.html uses class="album-grid"
  const container = document.querySelector('.album-grid');

  if (!container) {
      console.error("Could not find .album-grid container");
      return;
  }

  container.innerHTML = albums.map(album => `
    <div class="album-card" onclick="location.href='album.html?id=${album.id}'">
      <img src="${album.cover}" alt="${album.title}" onerror="this.src='https://via.placeholder.com/300?text=Music'">
      <div class="album-info">
        <h3>${album.title}</h3>
        <p>${album.artist}</p>
      </div>
    </div>
  `).join('');
}

// Run when the page is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAlbums);
} else {
    renderAlbums();
}
