# 🎵 Music Service App
A premium web-based music player inspired by Apple Music and Spotify, featuring a responsive mobile-first design and a unified playback system.

---

## 🚀 Latest Features
- **Apple Music Mobile Layout**: 
  - **Horizontal Artist Cards**: Featured artists are displayed in a landscape scroll for a modern look.
  - **2x2 Album Grid**: Compact, organized grid view for mobile browsing.
- **Interactive Player Bar**: 
  - Tapping the bottom bar on mobile expands it to a full-screen "Now Playing" view with large artwork and centered controls (Back, Pause, Next).
- **Detailed Metadata**: Each album page displays the specific Release Date, Record Label, and Total Runtime.
- **Unified Playback**: Songs play in order from start to finish with automatic track progression.

---

## 💿 Current Library Metadata

| Album | Release Date | Label | Runtime |
| :--- | :--- | :--- | :--- |
| **ye** | June 1, 2018 | GOOD Music | 7 songs, 23 mins |
| **The College Dropout** | Feb 10, 2004 | Roc-A-Fella | 21 songs, 76 mins |
| **Late Registration** | Aug 30, 2005 | Roc-A-Fella | 21 songs, 70 mins |
| **Thriller** | Nov 30, 1982 | Epic Records | 9 songs, 42 mins |

---

## 🗂️ Project Structure
Music-Service-
├── index.html       # Clean HTML structure with #detailView logic
├── style.css        # Responsive CSS (Mobile 2x2 grid vs Desktop locked layout)
├── app.js           # Core engine & full tracklists
├── images/          # Assets (kanye_cover.jpg, ye.jpg, thriller.jpg, etc.)
└── music/           # Organized subfolders for each album's .mp3 files

---

## 🛠️ Developer Notes
- **Mobile vs Desktop**: The CSS is split using media queries. The Desktop version is currently locked as finalized; mobile-only changes are handled within the `@media (max-width: 767px)` block.
- **Path Sensitivity**: Ensure all filenames in the `images/` and `music/` folders are lowercase and avoid double extensions (e.g., `.jpg.jpg`) to prevent 404 errors on GitHub Pages.
- **Volume Logic**: The volume slider is hidden on mobile views as system hardware handles audio levels.
