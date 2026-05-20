const PROJECTS = [
  {
    id: "boxtothebeat",
    title: "Box To The Beat",
    engine: "Unreal Engine 5",
    role: "Lead Developer",
    type: "Shipped",
    genre: "VR · Rhythm",
    platforms: ["PS5 VR2", "PC VR", "Meta Quest", "Meta Rift", "HTC Vive", "PICO VR"],
    featured: true,
    featuredOrder: 1,
    tier: "full",
    awards: [
      "Best VR Game · Silver — NYX Awards 2023",
      "First PSVR2 game shipped from the Middle East"
    ],
    links: [
      { label: "PlayStation", icon: "ti-device-gamepad-2", url: "https://store.playstation.com/en-ae/concept/10007964" },
      { label: "Steam", icon: "ti-brand-steam", url: "https://store.steampowered.com/app/2063120/Box_To_The_Beat_VR/" },
      { label: "Meta", icon: "ti-vr", url: "https://www.meta.com/en-gb/experiences/box-to-the-beat-vr/8848345028541262/" }
    ],
    description: "Box To The Beat VR is a fast and rhythmic boxing game built around indie artists of all genres. Players throw punches in sync with the music in fully immersive VR environments. Developed as Lead Developer across six VR platforms, it became the first PSVR2 title shipped from the Middle East.",
    youtube: ["4OaNlcSKZKY"]
  },
  {
    id: "thepanicpit",
    title: "The Panic Pit",
    engine: "Unreal Engine 5",
    role: "Lead Developer",
    type: "In Development",
    genre: "FPS · Roguelite",
    platforms: ["PC", "PS5", "Xbox", "Switch 2"],
    featured: true,
    featuredOrder: 2,
    tier: "full",
    awards: [
      "Best PC Shooter · Silver — NYX Awards 2021 (as Shadow Dreams: The Last Thought of Hope)"
    ],
    links: [
      { label: "Steam", icon: "ti-brand-steam", url: "https://store.steampowered.com/app/4445950/The_Panic_Pit/" }
    ],
    description: "Play as the embodiment of the last thought of hope, venturing into a suicidal mind. Battle inner demons and corrupted thoughts across five kingdoms in a dark gothic FPS roguelite. Over 50 weapons, a diverse skill tree, magic-based combat, and a psychologically-inspired story aimed at improving mental health awareness through storytelling.",
    youtube: ["8KgG1VwAwMM"]
  },
  {
    id: "glitchcore",
    title: "Glitchcore",
    engine: "Unreal Engine 5",
    role: "Lead Developer",
    type: "In Development",
    genre: "FPS · Roguelite",
    platforms: ["PC", "PS5", "Xbox", "Switch 2"],
    featured: true,
    featuredOrder: 3,
    tier: "full",
    awards: [],
    links: [
      { label: "Steam", icon: "ti-brand-steam", url: "https://store.steampowered.com/app/2439980/Glitch_Core/" }
    ],
    description: "An FPS roguelite where the code fights back. Play as a hacked combat AI trapped in endless training simulations. Each run corrupts reality, rewriting enemies, environments, and your own purpose. Survive, adapt, and discover what remains of your identity in a neon-soaked sci-fi world that constantly rewrites itself.",
    youtube: ["XubvHykJX7A"]
  },
  {
    id: "astralhound",
    title: "Astral Hound VR",
    engine: "Unreal Engine 4",
    role: "Lead Developer",
    type: "Shipped",
    genre: "VR · Horror",
    platforms: ["PC VR"],
    featured: true,
    featuredOrder: 4,
    tier: "full",
    awards: [],
    links: [
      { label: "Steam", icon: "ti-brand-steam", url: "https://store.steampowered.com/app/2959710/Astral_Hound_VR/" }
    ],
    description: "Become The Astral Hound. Play as Howard, a man who can project himself into the astral plane, as he traverses a supernatural realm to find and rescue Allie, kidnapped by the mysterious organization BIO. Navigate using a grab system and propulsion gloves, collect astral gems, and uncover fragmented memories hidden in the plane's most treacherous reaches.",
    youtube: ["Mo5Ktu04NQI", "_1iYeGWFPSI"]
  },
  {
    id: "oceanexplorer",
    title: "Ocean Explorer VR",
    engine: "Unreal Engine 4",
    role: "Lead Developer",
    type: "Interactive Experience",
    genre: "VR · Education",
    platforms: ["PC VR"],
    featured: true,
    featuredOrder: 5,
    tier: "full",
    awards: [
      "Made for Discovery Channel — showcased across multiple locations"
    ],
    links: [],
    description: "An immersive underwater VR experience built for Robocom VR and Discovery Channel. Paired with an interactive robotic chair rig for full physical immersion, players explore ocean environments, photograph wildlife, and learn about marine ecosystems. Designed to replicate the feel of a theme park ride while educating audiences on ocean wildlife.",
    youtube: ["EcC186CG81E", "UpmxBURPKRo", "xGSDPbaH_Uo"]
  },
  {
    id: "jeddahcentral",
    title: "Jeddah Central VR",
    engine: "Unreal Engine 5",
    role: "Lead Developer",
    type: "Client Work",
    genre: "VR · Archviz",
    platforms: ["PC VR"],
    featured: false,
    tier: "full",
    awards: [
      "Official VR experience for the Jeddah Central development project, KSA"
    ],
    links: [],
    description: "A VR architectural visualization experience built for the Jeddah Central development project in Saudi Arabia. Players step into a realistic world of architectural vision, exploring the cutting-edge designs and futuristic infrastructure of the district with meticulous attention to detail and real-time rendering.",
    youtube: ["ZtikQVY6E-c","mXTzStNBlpY"]
  },
  {
    id: "ahuntersjourney",
    title: "A Hunter's Journey",
    engine: "Unreal Engine 5",
    role: "Lead Developer",
    type: "Interactive Experience",
    genre: "VR · Cultural",
    platforms: ["PC VR"],
    featured: false,
    tier: "full",
    awards: [
      "Showcased at Al-Hosn Festival and multiple local festivals",
      "Demonstrated to Sheikh Khaled Bin Zayed to showcase Abu Dhabi Gaming growth"
    ],
    links: [],
    description: "A VR educational and cultural journey through the UAE's heritage. Players travel through the Abu Dhabi desert, navigate the sky and constellations, and arrive at an oasis for traditional target practice. Built for the Al-Hosn Festival and later showcased to Sheikh Khaled Bin Zayed as a demonstration of Abu Dhabi Gaming's growth.",
    youtube: ["14Iy5zgCEH0", "TJcm8IJaDNE"]
  },
  {
    id: "asteroidassault",
    title: "Asteroid Assault VR",
    engine: "Unreal Engine 5",
    role: "Lead Developer",
    type: "Client Work",
    genre: "VR · Arcade",
    platforms: ["PC VR"],
    featured: false,
    tier: "full",
    awards: [
      "Built with full flight sim chair and haptic apparatus integration"
    ],
    links: [],
    description: "A space arcade VR game built for a private client. Players defend their space station from waves of incoming asteroids in a fully immersive, endless experience. Developed with real-life haptics and flight simulator chair integration for a complete physical experience.",
    youtube: ["egUVTvhhYzI"]
  },
  {
    id: "hopevr",
    title: "HOPE VR",
    engine: "Unreal Engine 4",
    role: "Lead Developer",
    type: "Shipped",
    genre: "VR · Wellness",
    platforms: ["PC VR"],
    featured: false,
    tier: "full",
    awards: [],
    links: [
      { label: "Steam", icon: "ti-brand-steam", url: "https://store.steampowered.com/app/1703740/HOPE_VR_Progressive_Meditation/" }
    ],
    description: "A VR meditation and wellness experience designed as part of a daily lifestyle routine. Players choose from multiple environments — beach, moon, forest — controlling weather, time of day, and rain intensity. Hatch and collect baby dragons through daily meditation, practice elemental breathing exercises, and ascend a Zen platform the longer you meditate.",
    youtube: ["MqBdLEGtP3E"]
  },
  {
    id: "crashncash",
    title: "Crash 'N' Cash",
    engine: "Unreal Engine 5",
    role: "Lead Developer",
    type: "Game Jam",
    genre: "Arcade · Driving",
    platforms: ["PC"],
    featured: false,
    tier: "full",
    awards: [
      "Global Game Jam UAE 2024 — Winner"
    ],
    links: [
      { label: "GGJ", icon: "ti-world", url: "https://globalgamejam.org/games/2024/crash-n-cash-4" }
    ],
    description: "A game-show-style arcade driving game where you plow through traffic, chase chaos, and rack up cash for spectacular crashes. Built for Global Game Jam 2024 on the theme 'Make Me Laugh' — and won the UAE jam. Fast, absurd, and deliberately over the top.",
    youtube: ["2BZqI-RYIEo"]
  },
  {
    id: "atlantisofthesands",
    title: "Atlantis of the Sands",
    engine: "Unreal Engine 5",
    role: "Lead Developer",
    type: "Game Jam",
    genre: "Co-op · Racing",
    platforms: ["PC"],
    featured: false,
    tier: "full",
    awards: [
      "Runner-Up — Heritage Gameathon 2026, Abu Dhabi"
    ],
    links: [
      { label: "itch.io", icon: "ti-world", url: "https://retaketeam.itch.io/atlantis-of-the-sands" }
    ],
    description: "A local split-screen racing game set in a stylized desert inspired by UAE heritage and landscapes. Players race across ancient paths and shifting sands, collecting historical artifacts while managing thirst, balancing speed against exploration, and learning about Emirati culture and history. Built for the Heritage Gameathon 2026 in Abu Dhabi.",
    youtube: ["O4yQtrsOCUs"]
  },
  {
    id: "pabloletsgobar",
    title: "Pablo Let's Go Bar",
    engine: "Unity",
    role: "Game Developer",
    type: "Completed — Unreleased",
    genre: "FPS · Co-op",
    platforms: ["PC"],
    featured: false,
    tier: "full",
    awards: [
      "Best Studio Project — SAE Institute 2021"
    ],
    links: [
      { label: "Steam", icon: "ti-brand-steam", url: "https://store.steampowered.com/app/1676180/Pablo_Lets_Go_Bar/" }
    ],
    description: "An online co-op and single-player FPS roguelite. Join Pablo and his crew on their journey to Vásquez's fiesta, battling through unique levels with punchy gunplay and aggressive combat. Multiple weapons and playstyles, each run shaped by the ghosts of Pablo's past. Built as a serious studio project at SAE Institute.",
    youtube: ["FZi3oIOzDKk"]
  },
  {
    id: "hotelcalifornia",
    title: "Hotel California",
    engine: "Unity",
    role: "Game Developer",
    type: "Completed — Unreleased",
    genre: "PvP · Puzzle",
    platforms: ["PC"],
    featured: false,
    tier: "full",
    awards: [],
    links: [
      { label: "itch.io", icon: "ti-world", url: "https://flamencoman.itch.io/hotel-california" }
    ],
    description: "A team-based PvP escape room where humans solve puzzles to escape the hotel while a ghost tries to stop them. Both sides choose abilities to aid their efforts — humans race against the clock, while the ghost hunts them down. You can check out any time you like, but you can never leave.",
    youtube: ["Oq2eE_yoWps"]
  },
  {
    id: "augmentingreality",
    title: "Augmenting Reality",
    engine: "Unity",
    role: "Game Developer",
    type: "University Project",
    genre: "Platformer · Sci-fi",
    platforms: ["PC"],
    featured: false,
    tier: "minor",
    awards: [],
    links: [
      { label: "itch.io", icon: "ti-world", url: "https://blankrip.itch.io/augmenting-reality" }
    ],
    description: "A 2.5D narrative platformer set in a transhuman future. The protagonist confronts the inevitability of human augmentation, processing emotional trauma while acquiring abilities that challenge their identity. Inspired by the accelerating pace of real-world augmentation technology.",
    youtube: ["El3w6VNfu4Q"]
  },
  {
    id: "skillcrisis",
    title: "Skill Crisis",
    engine: "Unity",
    role: "Game Developer",
    type: "Game Jam",
    genre: "Platformer · Low Poly",
    platforms: ["PC"],
    featured: false,
    tier: "minor",
    awards: [],
    links: [
      { label: "itch.io", icon: "ti-world", url: "https://flamencoman.itch.io/skill-crisis" }
    ],
    description: "A short low-poly 2.5D platformer set in a fictional Middle Eastern future. Play as Model-VV, a lost robot from an endangered species striving to reach a safehouse, coping with a constant loss of abilities along the way. Built for Global Game Jam 2021 on the theme 'Lost & Found'.",
    youtube: ["mFtMzJf2tGs"]
  },
  {
    id: "lastmercenary",
    title: "The Last Mercenary",
    engine: "Unity",
    role: "Game Developer",
    type: "University Project",
    genre: "Tower Defense · 3rd Person",
    platforms: ["PC"],
    featured: false,
    tier: "minor",
    awards: [],
    links: [
      { label: "itch.io", icon: "ti-world", url: "https://shaded-wireframe.itch.io/the-last-mercenary" }
    ],
    description: "A third-person tower defense game where you protect the Kingdom of Calces from hordes of enemy forces. Built as a collaborative university project by seven students from the games and animation departments at SAE Institute Dubai, alongside nine additional collaborators.",
    youtube: ["mTuamVXfELU" , "MTLSzNWbVKI"]
  },
  {
    id: "rattleemup",
    title: "Rattle 'Em Up",
    engine: "Unity",
    role: "Game Developer",
    type: "University Project",
    genre: "Turn-based",
    platforms: ["PC"],
    featured: false,
    tier: "minor",
    awards: [],
    links: [
      { label: "itch.io", icon: "ti-world", url: "https://cemetery-studios.itch.io/rattle-em-up" }
    ],
    description: "A turn-based game built as a university project at SAE Institute Dubai.",
    youtube: ["S4mvozVvd00", "ApVwQ0GKpd0"]
  }
];

// ─── Site config ───────────────────────────────────────────────
// Change FEATURED_COUNT to control how many projects cycle in the homepage hero
const FEATURED_COUNT = 5;

const SITE = {
  name:     "Vishnu Raveendran",
  role:     "Game Developer",
  location: "Abu Dhabi, UAE",
  email:    "vishnuraveendran246@gmail.com",
  linkedin: "https://www.linkedin.com/in/vishnu-raveendran/",
  formspree: "https://formspree.io/f/xjgzgnwz",
  bio: `നമസ്കാരം, नमस्ते, أهلاً, سلام!\n\nBased in Abu Dhabi, UAE, I have been a game developer for the past half decade. I helped ship the first PSVR2 game from the Middle East — Box To The Beat — alongside a range of VR, PC, and location-based titles.\n\nI have worked on commercial releases, client experiences for the likes of Discovery Channel, architectural VR for major KSA developments, and cultural showcases presented to Abu Dhabi's leadership.\n\nProgramming has been a passion of mine since high school. I work primarily in Unreal Engine 5, with a background in Unity, and I am proficient in C++, C#, and more.\n\nFeel free to browse the work, and get in touch if you'd like to talk.`
};
