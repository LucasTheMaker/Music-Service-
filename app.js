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
      { number: 3, title: "I Just Might", duration: "3:32" },
      { number: 4, title: "God Was Showing Off", duration: "3:31" },
      { number: 5, title: "Why You Wanna Fight?", duration: "4:14" },
      { number: 6, title: "On My Soul", duration: "2:54" },
      { number: 7, title: "Something Serious", duration: "2:46" },
      { number: 8, title: "Nothing Left", duration: "3:34" },
      { number: 9, title: "Dance With Me", duration: "3:39" }
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
      { number: 1, title: "Intro", duration: "0:19" },
      { number: 2, title: "We Don't Care", duration: "3:59" },
      { number: 4, title: "All Falls Down", duration: "3:43" },
      { number: 7, title: "Jesus Walks", duration: "3:13" },
      { number: 12, title: "Slow Jamz", duration: "5:16" },
      { number: 19, title: "Through The Wire", duration: "3:41" },
      { number: 20, title: "Family Business", duration: "4:38" },
      { number: 21, title: "Last Call", duration: "12:40" }
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
      { number: 2, title: "Heard 'Em Say", duration: "3:23" },
      { number: 3, title: "Touch the Sky", duration: "3:56" },
      { number: 4, title: "Gold Digger", duration: "3:27" },
      { number: 13, title: "Diamonds From Sierra Leone (Remix)", duration: "3:53" },
      { number: 16, title: "Hey Mama", duration: "5:05" },
      { number: 19, title: "Gone", duration: "5:33" }
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
      { number: 1, title: "Wanna Be Startin' Somethin'", duration: "6:03" },
      { number: 4, title: "Thriller", duration: "5:58" },
      { number: 5, title: "Beat It", duration: "4:18" },
      { number: 6, title: "Billie Jean", duration: "4:53" },
      { number: 7, title: "Human Nature", duration: "4:05" },
      { number: 8, title: "P.Y.T. (Pretty Young Thing)", duration: "3:58" }
    ]
  }
];

function initApp() {
  const container = document.getElementById('album-grid') || document.querySelector('.album-container');
  
  if (!container) {
    console.error("Could not find the album container in your HTML.");
    return;
  }

  container.innerHTML = albums.map(album => `
    <div class="album-card" onclick="window.location.href='album.html?id=${album.id}'" style="cursor: pointer;">
      <img src="${album.cover}" alt="${album.title}" onerror="this.src='https://via.placeholder.com/150?text=No+Cover'">
      <div class="album-info">
        <h3>${album.title}</h3>
        <p>${album.artist}</p>
      </div>
    </div>
  `).join('');
}

// Run the initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
