/* ========================= UPDATED DATA ========================= */
const albums = [
    {
        title: "The College Dropout",
        artist: "Kanye West",
        cover: "images/dropout.jpg",
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
        title: "ye",
        artist: "Kanye West",
        cover: "images/ye.jpg",
        songs: [
            { title: "I Thought About Killing You", file: "music/ye/I Thought About Killing You.mp3" },
            { title: "Yikes", file: "music/ye/Yikes.mp3" },
            { title: "All Mine", file: "music/ye/All Mine.mp3" },
            { title: "Wouldn't Leave", file: "music/ye/Wouldnt Leave.mp3" },
            { title: "No Mistakes", file: "music/ye/No Mistakes.mp3" },
            { title: "Ghost Town", file: "music/ye/Ghost Town.mp3" },
            { title: "Violent Crimes", file: "music/ye/Violent Crimes.mp3" }
        ]
    },
    {
        title: "Thriller",
        artist: "Michael Jackson",
        cover: "images/thriller.jpg",
        songs: [
            { title: "Wanna Be Startin' Somethin'", file: "music/mj/Wanna Be Startin Somethin.mp3" },
            { title: "Thriller", file: "music/mj/Thriller.mp3" },
            { title: "Beat It", file: "music/mj/Beat It.mp3" },
            { title: "Billie Jean", file: "music/mj/Billie Jean.mp3" }
        ]
    }
];

const artists = [
    { name: "Kanye West", image: "images/kanye.png", albums: albums.filter(a => a.artist === "Kanye West") },
    { name: "Michael Jackson", image: "images/mj.png", albums: albums.filter(a => a.artist === "Michael Jackson") },
    { name: "Bruno Mars", image: "images/bruno.png", albums: [] },
    { name: "Tyler, The Creator", image: "images/tyler.png", albums: [] },
    { name: "Jay-Z", image: "images/jayz.png", albums: [] }
];

/* ========================= PLAYER CORE ========================= */
function playSong(song, album, index) {
    if (!song) return;

    // Fix: Encode the URI so spaces and special characters don't break the path
    const safeFile = encodeURI(song.file);
    audio.src = safeFile;
    
    audio.play().then(() => {
        trackName.innerText = song.title;
        subText.innerText = album.artist;
        currentAlbum = album;
        currentIndex = index;
        isPlaying = true;
        playBtn.innerText = "⏸";
    }).catch(err => {
        console.error("Playback failed for:", song.file, err);
        alert(`Song not found! Check your folder for: ${song.file}`);
    });
}
