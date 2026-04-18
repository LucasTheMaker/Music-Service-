/* ========================= HOME RENDERING ========================= */

function loadHome() {
    main.innerHTML = `
        <h1>Home</h1>
        
        <div class="section-header">
            <h2>Top Artists</h2>
        </div>
        <div class="artist-grid" id="artistRow"></div>
        
        <div class="section-header">
            <h2>Albums</h2>
        </div>
        <div class="album-grid" id="albumRow"></div>
        
        <div id="detailView"></div>
    `;
    renderArtists();
    renderAlbums();
}

function renderArtists() {
    const row = document.getElementById("artistRow");
    artists.forEach((artist, i) => {
        const div = document.createElement("div");
        div.className = "artist-card";
        div.innerHTML = `
            <img src="${artist.image}">
            <div class="artist-name">${artist.name}</div>
        `;
        div.onclick = () => openArtistPage(artist.name);
        row.appendChild(div);
    });
}

function renderAlbums() {
    const row = document.getElementById("albumRow");
    albums.forEach((album, i) => {
        const div = document.createElement("div");
        div.className = "album-card";
        div.innerHTML = `
            <img src="${album.cover}">
            <div class="album-title">${album.title}</div>
        `;
        div.onclick = () => openAlbum(i);
        row.appendChild(div);
    });
}

/* ========================= ALBUM PAGE (RESTORED METADATA) ========================= */

function openAlbum(i) {
    currentAlbum = albums[i];
    main.innerHTML = `
        <button onclick="loadHome()" class="back-btn">← Home</button>
        <div class="album-header">
            <img src="${currentAlbum.cover}" class="header-img">
            <div class="header-info">
                <h1>${currentAlbum.title}</h1>
                <p style="color:#fa233b; font-weight:600;">${currentAlbum.artist}</p>
                <div class="metadata">${currentAlbum.label} • ${currentAlbum.year}</div>
                <div class="metadata" style="margin-top:5px; color:#555;">${currentAlbum.duration}</div>
            </div>
        </div>
        <div id="trackList"></div>
    `;
    currentAlbum.songs.forEach((song, index) => {
        const div = document.createElement("div");
        div.className = "track";
        div.innerHTML = `<span class="track-num">${index + 1}</span> <span>${song.title}</span>`;
        div.onclick = () => playSong(index);
        document.getElementById("trackList").appendChild(div);
    });
}
