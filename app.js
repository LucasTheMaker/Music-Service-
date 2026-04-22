const albums = [
    {
        id: "romantic",
        title: "The Romantic",
        artist: "Bruno Mars",
        cover: "music/romantic/romantic.png",
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
        cover: "music/dropout/cover.jpg",
        tracks: [
            { number: 1, title: "Intro", file: "Intro.mp3" },
            { number: 2, title: "We Don't Care", file: "We Dont Care.mp3" },
            { number: 3, title: "Graduation Day", file: "Graduation Day.mp3" },
            { number: 4, title: "All Falls Down", file: "All Falls Down.mp3" },
            { number: 5, title: "I'll Fly Away", file: "Ill Fly Away.mp3" },
            { number: 6, title: "Spaceship", file: "Spaceship.mp3" },
            { number: 7, title: "Jesus Walks", file: "Jesus Walks.mp3" },
            { number: 8, title: "Never Let Me Down", file: "Never Let Me Down.mp3" },
            { number: 9, title: "Get 'Em High", file: "Get Em High.mp3" },
            { number: 10, title: "Workout Plan", file: "Workout Plan.mp3" },
            { number: 11, title: "The New Workout Plan", file: "The New Workout Plan.mp3" },
            { number: 12, title: "Slow Jamz", file: "Slow Jamz.mp3" },
            { number: 13, title: "Breathe In Breathe Out", file: "Breathe In Breathe Out.mp3" },
            { number: 14, title: "School Spirit Skit 1", file: "School Spirit Skit 1.mp3" },
            { number: 15, title: "School Spirit", file: "School Spirit.mp3" },
            { number: 16, title: "School Spirit Skit 2", file: "School Spirit Skit 2.mp3" },
            { number: 17, title: "Lil Jimmy Skit", file: "Lil Jimmy Skit.mp3" },
            { number: 18, title: "Two Words", file: "Two Words.mp3" },
            { number: 19, title: "Through The Wire", file: "Through The Wire.mp3" },
            { number: 20, title: "Family Business", file: "Family Business.mp3" },
            { number: 21, title: "Last Call", file: "Last Call.mp3" }
        ]
    },
    {
        id: "late",
        title: "Late Registration",
        artist: "Kanye West",
        cover: "music/late/cover.jpg",
        tracks: [
            { number: 1, title: "Wake Up Mr. West", file: "Wake Up Mr West.mp3" },
            { number: 2, title: "Heard 'Em Say", file: "Heard Em Say.mp3" },
            { number: 3, title: "Touch The Sky", file: "Touch The Sky.mp3" },
            { number: 4, title: "Gold Digger", file: "Gold Digger.mp3" },
            { number: 5, title: "Skit 1", file: "Skits 1.mp3" },
            { number: 6, title: "Drive Slow", file: "Drive Slow.mp3" },
            { number: 7, title: "My Way Home", file: "My Way Home.mp3" },
            { number: 8, title: "Crack Music", file: "Crack Music.mp3" },
            { number: 9, title: "Roses", file: "Roses.mp3" },
            { number: 10, title: "Bring Me Down", file: "Bring Me Down.mp3" },
            { number: 11, title: "Addiction", file: "Addiction.mp3" },
            { number: 12, title: "Skit 2", file: "Skits 2.mp3" },
            { number: 13, title: "Diamonds From Sierra Leone (Remix)", file: "Diamonds From Sierra Leone Remix.mp3" },
            { number: 14, title: "We Major", file: "We Major.mp3" },
            { number: 15, title: "Skit 3", file: "Skits 3.mp3" },
            { number: 16, title: "Hey Mama", file: "Hey Mama.mp3" },
            { number: 17, title: "Celebration", file: "Celebration.mp3" },
            { number: 18, title: "Skit 4", file: "Skits 4.mp3" },
            { number: 19, title: "Gone", file: "Gone.mp3" },
            { number: 20, title: "Diamonds From Sierra Leone", file: "Diamonds From Sierra Leone.mp3" },
            { number: 21, title: "Late", file: "Late.mp3" }
        ]
    },
    {
        id: "ye",
        title: "ye",
        artist: "Kanye West",
        cover: "music/ye/cover.jpg",
        tracks: [
            { number: 1, title: "I Thought About Killing You", file: "1. I Thought About Killing You.mp3" },
            { number: 2, title: "Yikes", file: "2. Yikes.mp3" },
            { number: 3, title: "All Mine", file: "3. All Mine.mp3" },
            { number: 4, title: "Wouldn't Leave", file: "4. Wouldn't Leave.mp3" },
            { number: 5, title: "No Mistakes", file: "5. No Mistakes.mp3" },
            { number: 6, title: "Ghost Town", file: "6. Ghost Town.mp3" },
            { number: 7, title: "Violent Crimes", file: "7. Violent Crimes.mp3" }
        ]
    },
    {
        id: "thriller",
        title: "Thriller",
        artist: "Michael Jackson",
        cover: "music/thriller/cover.jpg",
        tracks: [
            { number: 1, title: "Wanna Be Startin' Somethin'", file: "Wanna Be Startin Somethin.mp3" },
            { number: 2, title: "Baby Be Mine", file: "Baby Be Mine.mp3" },
            { number: 3, title: "The Girl Is Mine", file: "The Girl Is Mine.mp3" },
            { number: 4, title: "Thriller", file: "Thriller.mp3" },
            { number: 5, title: "Beat It", file: "Beat It.mp3" },
            { number: 6, title: "Billie Jean", file: "Billie Jean.mp3" },
            { number: 7, title: "Human Nature", file: "Human Nature.mp3" },
            { number: 8, title: "P.Y.T. (Pretty Young Thing)", file: "P Y T Pretty Young Thing.mp3" },
            { number: 9, title: "The Lady In My Life", file: "The Lady In My Life.mp3" }
        ]
    },
    {
        id: "wtt",
        title: "Watch The Throne",
        artist: "Jay-Z & Kanye West",
        cover: "music/wtt/cover.jpg",
        tracks: []
    }
];

function renderAlbums() {
    const container = document.getElementById('album-grid');
    if (!container) return;

    container.innerHTML = albums.map(album => `
        <div class="album-card" onclick="window.location.href='album.html?id=${album.id}'" style="cursor: pointer;">
            <img src="${album.cover}" alt="${album.title}" onerror="this.src='https://via.placeholder.com/300?text=Missing+Art'">
            <div class="album-info">
                <h3>${album.title}</h3>
                <p>${album.artist}</p>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', renderAlbums);
