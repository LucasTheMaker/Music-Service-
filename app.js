const albums = [
  {
    title: "ye",
    artist: "Kanye West",
    cover: "images/ye.jpg",
    description:
      "Ye (stylized as ye) is Kanye West’s eighth studio album, released on June 1, 2018. It is a highly personal, introspective seven-track project recorded in Wyoming, focused on mental health, bipolar disorder, family, and recent controversies, featuring stripped-back production.",

    songs: [
      { title: "I Thought About Killing You", file: "music/1. I Thought About Killing You.mp3" },
      { title: "Yikes", file: "music/2. Yikes.mp3" },
      { title: "All Mine", file: "music/3. All Mine.mp3" },
      { title: "Wouldn't Leave", file: "music/4. Wouldn't Leave.mp3" },
      { title: "No Mistakes", file: "music/5. No Mistakes.mp3" },
      { title: "Ghost Town", file: "music/6. Ghost Town.mp3" },
      { title: "Violent Crimes", file: "music/7. Violent Crimes.mp3" }
    ]
  }
];

/* 👤 ARTIST DATA */
const artists = [
  {
    name: "Kanye West",
    image: "images/kanye.png",
    bio:
      "Kanye Omari West (now known as Ye) is a highly influential American rapper, producer, and fashion designer born in 1977. Rising to fame in the early 2000s, he revolutionized hip-hop by breaking away from gangster rap conventions, integrating soul samples, and exploring introspective themes. Known for his eclectic sound, critical acclaim, and controversial public persona, he has sold over 135 million records and won 24 Grammy Awards.\n\nKey Aspects of His Artistry:\n• Musical Evolution: From soul-sampling to experimental hip-hop and industrial sounds.\n• Production Pioneer: Early Roc-A-Fella producer including Jay-Z’s The Blueprint.\n• Fashion: Founder of YEEZY brand.\n• Controversy: One of music’s most polarizing public figures.\n• Critical Acclaim: Widely regarded as one of the most influential artists of the 21st century.",
    albums: [albums[0]]
  }
];
