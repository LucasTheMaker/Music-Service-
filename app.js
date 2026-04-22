const albums = [
    {
        id: "romantic",
        title: "The Romantic",
        artist: "Bruno Mars",
        cover: "images/romantic.png",
        tracks: [
            { number: 1, title: "Risk It All", file: "01 Risk It All.mp3" },
            { number: 2, title: "Cha Cha Cha", file: "02 Cha Cha Cha.mp3" },
            { number: 3, title: "I Just Might", file: "03 I Just Might.mp3" },
            { number: 4, title: "God Was Showing Off", file: "04 God Was Showing Off.mp3" },
            { number: 5, title: "Why You Wanna Fight?", file: "05 Why You Wanna Fight-.mp3" },
            { number: 6, title: "On My Soul", file: "06 On My Soul.mp3" },
            { number: 7, title: "Something Serious", file: "07 Something Serious.mp3" },
            { number: 8, title: "Nothing Left", file: "08 Nothing Left.mp3" },
            { number: 9, title: "Dance With Me", file: "09 Dance With Me.mp3" }
        ]
    },
    {
        id: "dropout",
        title: "The College Dropout",
        artist: "Kanye West",
        cover: "images/dropout.jpg",
        tracks: [
            { number: 1, title: "Intro", file: "Intro.mp3" },
            { number: 2, title: "We Don't Care", file: "We Dont Care.mp3" },
            { number: 3, title: "Graduation Day", file: "Graduation Day.mp3" },
            { number: 4, title: "All Falls Down", file: "All Falls Down.mp3" },
            { number: 7, title: "Jesus Walks", file: "Jesus Walks.mp3" },
            { number: 19, title: "Through The Wire", file: "Through The Wire.mp3" },
            { number: 21, title: "Last Call", file: "Last Call.mp3" }
        ]
    },
    {
        id: "late",
        title: "Late Registration",
        artist: "Kanye West",
        cover: "images/late-registration.png",
        tracks: [
            { number: 1, title: "Wake Up Mr. West", file: "Wake Up Mr West.mp3" },
            { number: 2, title: "Heard 'Em Say", file: "Heard Em Say.mp3" },
            { number: 3, title: "Touch The Sky", file: "Touch The Sky.mp3" },
            { number: 4, title: "Gold Digger", file: "Gold Digger.mp3" },
            { number: 21, title: "Late", file: "Late.mp3" }
        ]
    },
    {
        id: "ye",
        title: "ye",
        artist: "Kanye West",
        cover: "images/ye.jpg",
        tracks: [
            { number: 1, title: "I Thought About Killing You", file: "1. I Thought About Killing You.mp3" },
            { number: 2, title: "Yikes", file: "2. Yikes.mp3" },
            { number: 6, title: "Ghost Town", file: "6. Ghost Town.mp3" }
        ]
    },
    {
        id: "thriller",
        title: "Thriller",
        artist: "Michael Jackson",
        cover: "images/thriller.jpg",
        tracks: [
            { number: 4, title: "Thriller", file: "Thriller.mp3" },
            { number: 5, title: "Beat It", file: "Beat It.mp3" },
            { number: 6, title: "Billie Jean", file: "Billie Jean.mp3" }
        ]
    },
    {
        id: "wtt",
        title: "Watch The Throne",
        artist: "Jay-Z & Kanye West",
        cover: "images/jayz.jpg",
        tracks: []
    }
];

function renderAlbums() {
    const container = document.getElementById('album-grid');
    if (!container) return;

    container.innerHTML = albums.map(album => `
        <div class="album-card" onclick="window.location.href='album.html?id=${album.id}'" style="cursor: pointer; background: #181818; padding: 15px; border-radius: 8px;">
            <img src="${album.cover}" alt="${album.title}" style="width: 100%; border-radius: 4px; aspect-ratio: 1/1; object-fit: cover;" onerror="this.src='https://via.placeholder.com/300?text=Check+Image+Path'">
            <div class="album-info" style="margin-top: 10px;">
                <h3 style="font-size: 1rem; margin: 0;">${album.title}</h3>
                <p style="color: #b3b3b3; font-size: 0.8rem; margin: 5px 0 0 0;">${album.artist}</p>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', renderAlbums);
