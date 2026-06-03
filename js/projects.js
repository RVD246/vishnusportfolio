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
    description: {
      about: "Box To The Beat VR is a fast-paced rhythm boxing game built around indie artists across all genres. Players throw punches in sync with the music across fully immersive VR environments, with reactive visuals, leaderboards, world bosses, custom song support, and a progression system tied to a pet dragon. The game was self-published by Khosouf Studio and positions itself as a platform for independent musicians to reach players through interactive experiences.",
      contributions: "Effectively the sole programmer on the project alongside the studio director, responsible for the entire codebase from the ground up. This included all gameplay systems, UI, input handling, VFX pooling, and platform-specific integrations across six VR platforms: PS5 VR2, PC VR, Meta Quest, Meta Rift, HTC Vive, and PICO VR.\n\nShipping across six platforms simultaneously meant maintaining a platform-agnostic architecture as the baseline, then layering targeted patches and modifications where each platform diverged. No single platform was a blocker, as documentation, community forums, and systematic experimentation resolved every issue, but the cumulative scope of keeping six distinct input systems, certification requirements, and hardware constraints aligned in one codebase was the central engineering challenge of the project.\n\nPSVR2 required the deepest platform-specific work. This involved writing PlayStation engine-level code directly, implementing PSVR2-specific input handling and haptics, working within console save system size constraints, and conducting heavy performance optimisation across the board to satisfy Sony's thorough certification and certops process.\n\nBeyond platform work, Beat Saber custom map compatibility was implemented, allowing players to import and play community-created content, a significant feature that extended the game's content ecosystem well beyond its shipped song library.",
      notable: "First PSVR2 title shipped from the Middle East · Silver, Best VR Game, NYX Game Awards 2023, an international game awards program · Shipped and live on PlayStation Store, Steam, Meta Store, and PICO VR globally and in China"
    },
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
    description: {
      about: "The Panic Pit is a dark gothic FPS roguelite where you play as the embodiment of the last thought of hope, venturing into a suicidal mind to battle inner demons and corrupted thoughts across five kingdoms. The game features over 50 weapons, a diverse skill tree, magic-based combat, and a procedurally generated level system that ensures each run plays differently. The project originated as Shadow Dreams: The Last Thought of Hope before being overhauled and rebranded, and has since been further rebuilt as a melee roguelite. Coming soon to PC, PS5, Xbox, and Switch 2.",
      contributions: "Worked as lead developer alongside the studio director, responsible for the majority of the codebase. Built all core gameplay systems including a full combat system with multiple weapons, payload types, and an FX pooling system for performance. Designed and implemented all enemy types and bosses, including multi-phase boss fights with distinct attack patterns. Built the parkour movement system with wall running and mantling. Developed an aim assist system, a thoughts pickup system forming the core roguelite loop, and contributed to a procedural content generation system to vary level layouts across runs. Handled all UI work, all console and controller integrations including PS5 haptics, and a full achievements system.",
      notable: "Silver, Best PC Shooter, NYX Game Awards 2021, won under the original title Shadow Dreams: The Last Thought of Hope · Coming soon to PC, PS5, Xbox, and Switch 2"
    },
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
    description: {
      about: "Glitchcore is an FPS roguelite where you play as a hacked combat AI trapped in endless training simulations. Each run corrupts reality, rewriting enemies, environments, and your own purpose. Survive, adapt, and discover what remains of your identity in a neon-soaked sci-fi world that constantly rewrites itself. Coming soon to PC, PS5, Xbox, and Switch 2.",
      contributions: "Worked as lead developer on a three person team alongside the studio director and a game and level designer. Responsible for the majority of the codebase. Built a full combat system with multiple weapons, payload types, and an FX pooling system for performance. Designed and implemented all enemy types and bosses, including multi-phase boss fights with distinct attack patterns. Developed an aim assist system, a core roguelite pickup loop, and a procedural content generation system to vary level layouts across runs. Handled all UI work, all console and controller integrations including PS5 haptics, and a full achievements system.",
      notable: "Coming soon to PC, PS5, Xbox, and Switch 2 · Wishlistable now on Steam"
    },
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
    featured: false,
    tier: "full",
    awards: [],
    links: [
      { label: "Steam", icon: "ti-brand-steam", url: "https://store.steampowered.com/app/2959710/Astral_Hound_VR/" }
    ],
    description: {
      about: "Astral Hound VR is a VR horror adventure game where you play as Howard, a man who can project himself into the astral plane. Traversing a supernatural realm, Howard must find and rescue Allie, kidnapped by the mysterious organisation BIO. Players navigate using a grab and propulsion glove system, collect astral gems, and uncover fragmented memories hidden across the plane's most treacherous reaches.",
      contributions: "Sole developer on the project alongside the studio director, responsible for the vast majority of the codebase and all level design. Took a barebones grab and propulsion locomotion system built by the studio director and significantly expanded it, adding thruster mechanics and a flashlight system with limited battery management in the style of Outlast. Built all remaining gameplay systems from scratch including all collectible and progression logic, the memory fragment system, and all enemy and interaction systems. Also designed and built all levels in the game, which constituted a significant portion of the overall development time given the nature of VR space design.\n\nAlso responsible for all character work across the game. Used Character Creator 3 with the Headshot plugin, bringing in face references and individually sculpting each character through iterative passes until the creative direction was satisfied. This covered 18 NPC characters and 1 enemy character.",
      notable: "Shipped and live on Steam"
    },
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
    description: {
      about: "An immersive underwater VR experience built for Discovery Channel through Robocom VR. Players explore ocean environments, photograph wildlife, and learn about marine ecosystems across multiple underwater locations. The experience was designed to replicate the feeling of a theme park ride, paired with a custom interactive robotic chair rig for full physical immersion. It ran across three locations in the UAE and multiple locations internationally.",
      contributions: "Sole developer on the project from start to finish, responsible for the entire codebase and experience. Built all underwater gameplay systems, the wildlife photography mechanic, and the full educational content flow.\n\nThe most technically significant work was the hardware integration between the game and the physical simulator chair and peripheral device rig. The chair had no plugin, no SDK, and no out-of-the-box Unreal Engine support whatsoever. It communicated entirely over a raw serial connection using a custom binary protocol. The integration required establishing the serial connection using Windows API calls directly from within UE4, implementing the full binary message format including byte-packing floats for 3-axis motion data, framing with start and end bytes, and computing CRC16 checksums for data integrity, then piping live in-world motion data into the chair in real time.\n\nThe system was built as a modular component architecture: a low-level serial driver, a protocol serialisation layer, and higher-level UE4 ActorComponents that mapped live actor rotations to chair axis values with configurable clamping and multipliers. This was then extended to drive a second hardware board controlling additional immersion devices including fans, vibration motors, water spray, and an electromagnetic lock, all configured at runtime via a JSON device mapping file.\n\nNo documentation, no abstraction layer, and no prior art to reference. Every part of this was researched and built from scratch.",
      notable: "Built under contract for Discovery Channel, showcased across UAE and international locations · Full physical immersion via custom robotic chair, haptics, fans, water spray, and EM lock integration"
    },
    youtube: ["EcC186CG81E", "UpmxBURPKRo", "xGSDPbaH_Uo"]
  },
  {
    id: "pixoul",
    title: "Pixoul Gaming",
    engine: "Various",
    role: "QA Lead · Consultant",
    type: "Client Work",
    genre: "VR · Location-Based",
    platforms: ["PC VR"],
    featured: true,
    featuredOrder: 4,
    tier: "full",
    awards: [
      "Pre-launch QA across all 10 VR experiences at one of the region's largest gaming venues"
    ],
    links: [
      { label: "Pixoul", icon: "ti-world", url: "https://pixoulgaming.com" }
    ],
    description: {
      about: "Pixoul Gaming is a large-scale VR and eSports entertainment complex at Al Qana, Abu Dhabi, featuring 10 VR experiences across 5 gaming zones alongside an eSports arena, academy, and broadcasting studio. It opened in November 2022 as one of the region's largest integrated gaming destinations.",
      contributions: "Engaged through Khosouf Studio via Robocom VR, who supplied the games and motion rigs for the park. Worked over approximately 6 months in a QA, playtesting, and consulting capacity in the lead-up to launch. All 10 VR experiences arrived in a non-deliverable state — poor performance, unstable framerates, and critical gameplay issues across the board. Systematically playtested and documented issues across every experience, providing detailed QA feedback and consulting on fixes until each title reached a shippable standard for public launch.\n\nAlso handled capture and editing of trailers for every VR experience featured at the park, as well as the trailer for Robocom VR's Transformers VR game, also shown at the venue. Ocean Explorer VR, also built by our team, was and may still be featured at Pixoul as part of the park's lineup.",
      notable: "Pre-launch QA and consulting across all 10 VR experiences at one of the region's largest gaming venues · Trailer production for all featured park titles and Robocom VR's Transformers VR · Engaged through Robocom VR and Khosouf Studio, 2022"
    },
    youtube: ["G0gz474ZkH4", "Q6wN2Ze3nlU", "LccHh8znuYo", "Nhqjt_M5qkE", "-GObsPVI_SY", "5aiNCdpcuy0", "ojGew1IHKnY", "vCwroMy4keg", "0Hl5B1xFT60", "u33kQYMzvvo", "A30T09whXAY"]
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
    description: {
      about: "A VR architectural visualisation experience built for the Jeddah Central development project in Saudi Arabia. Players are taken on a guided journey through a real-time rendered vision of the district, exploring its landmark buildings, infrastructure, and urban design with meticulous attention to architectural detail. No gameplay, purely an immersive showcase of the project's vision.",
      contributions: "Sole developer on the project, responsible for the entire experience from start to finish. Built the full VR walkthrough system, all real-time rendering and optimisation work, and the guided experience flow that takes viewers through the district's key landmarks and spaces. Delivered a polished, high-fidelity visualisation capable of running smoothly in VR headsets for a high-profile client presentation context.",
      notable: "Official VR experience for the Jeddah Central development project, one of Saudi Arabia's largest urban development initiatives · Showcased to high-profile KSA government authorities"
    },
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
    description: {
      about: "A VR educational and cultural experience celebrating UAE heritage. Players travel through three distinct chapters: an introductory camel ride through the Abu Dhabi desert where they spot and identify constellations in the night sky, a dedicated constellation-making level where they connect stars to form shapes and receive historical and cultural information about each one, and a traditional target shooting level where they compete for points on a global online leaderboard. Built for the Al-Hosn Festival in Abu Dhabi.",
      contributions: "Sole developer on the project, responsible for the entire codebase and all systems. The centrepiece of the technical work was the interactive constellation system, built in collaboration with an official UAE astronomy authority to ensure the star positions, constellation data, and cultural information were accurate. Players physically connect stars in VR space to form constellations, which then trigger educational content. Also built the camel ride playable cutscene, the target shooting system with scoring, and the online leaderboard that persists scores across players globally.",
      notable: "Showcased at Al-Hosn Festival and multiple local cultural festivals across Abu Dhabi · Demonstrated to Sheikh Khaled Bin Zayed at a private event as a showcase of Abu Dhabi Gaming's growth as a government-backed initiative supporting the UAE games industry"
    },
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
    description: {
      about: "A space arcade VR game built for a private client. Players defend their space station from waves of incoming asteroids and missiles in a fully immersive endless experience, seated in a physical flight simulator chair that moves and responds in sync with the on-screen action.",
      contributions: "Worked alongside the studio director and a designer on this project. Personally responsible for the ForceSeat motion platform integration and all asteroid and missile shooting gameplay systems. ForceSeat is a professional motion platform SDK used across commercial racing and flight simulation titles, and integrating it required mapping in-game events and forces to the platform's motion API to deliver a physically convincing experience in sync with the VR gameplay. The remaining environment and visual work was handled by the studio director and designer.",
      notable: "Built with full flight simulator chair and ForceSeat haptic platform integration · Private client installation"
    },
    youtube: ["egUVTvhhYzI", "b3mP3L5wVj4"]
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
    description: {
      about: "A VR meditation and wellness experience designed as part of a daily lifestyle routine. Players choose from multiple environments including beach, moon, and forest, with full control over weather, time of day, and rain intensity. A pet dragon grows and evolves through consistent daily meditation sessions, tracked via in-game calories burned. Elemental breathing exercises are guided through timed UI and animations, and a Zen platform ascends the longer a session continues. Shipped on Steam.",
      contributions: "Lead developer on the project alongside the studio director, responsible for the entire codebase. Built all environment systems including the dynamic weather, time of day, and rain intensity controls. Built the full dragon progression system tied to daily session tracking, the guided breathing exercise system using timed animations and UI, the Zen platform ascension mechanic, and all environment switching logic. Also handled all UI work across the experience.",
      notable: "Shipped and live on Steam"
    },
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
    description: {
      about: "A game-show-style arcade driving game where you hurl yourself into traffic, chain spectacular crashes, and rack up cash for the chaos you cause. Landing on cars triggers explosions that feed into further chains, rewarding the most absurd and over-the-top crashes. Built in 48 hours for Global Game Jam 2024 on the theme 'Make Me Laugh.'",
      contributions: "Two person team alongside a game and level designer. Built the entire crash and scoring system, including the ragdoll physics on impact, the chain reaction explosion mechanic triggered on landing, and the points accumulation system rewarding increasingly spectacular crashes. Essentially a from-scratch implementation of the insurance fraud minigame concept, built to a shippable standard in 48 hours.",
      notable: "Winner, Global Game Jam UAE 2024"
    },
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
    description: {
      about: "A local split-screen racing game set in a stylised desert inspired by UAE heritage and landscapes. Two players race across ancient paths and shifting sands, collecting historical artifacts along the way. The end screen reveals information about the artifacts collected, tying the gameplay to genuine Emirati cultural education. Built in 3 days for the Heritage Gameathon 2026, hosted by Unity Technologies in collaboration with Abu Dhabi Gaming and the Abu Dhabi Heritage Authority.",
      contributions: "Two person team alongside a game and level designer. Built the player movement system and the grappling hook mechanic, which formed the core of the game's movement and traversal feel across the desert environments.",
      notable: "Runner-Up, Heritage Gameathon 2026, Abu Dhabi, 22 entries total"
    },
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
    description: {
      about: "An online co-op and single-player FPS roguelite. Join Pablo and his crew on their journey to Vasquez's fiesta, battling through unique levels with punchy gunplay and aggressive combat. Multiple weapons and enemy types, a tarot card modifier system shaping each run, and a loot and upgrade system between encounters. Built as a serious studio project at SAE Institute Dubai. Completed and on Steam, currently unreleased.",
      contributions: "Part of a larger team, responsible for a substantial portion of the codebase. Built the full enemy AI system covering multiple distinct enemy types including ranged, melee, grenade-throwing, and drone-spawning variants, each with their own behaviour and attack patterns. Implemented the grenade system with a cooking mechanic and visible trajectory preview. Built the networked multiplayer layer using Photon, including player spawning, enemy synchronisation across clients, and networked death. Developed the tarot card roguelite modifier selection system, the loot and chest system with upgrade shop, and a fully rebindable input manager with save and load. Also handled level 2 design and population, UI work, and audio integration throughout.",
      notable: "Best Studio Project, SAE Institute Dubai 2021"
    },
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
    description: {
      about: "A team-based online PvP game where humans solve puzzles to escape the hotel while a ghost player tries to stop them. Both sides select abilities to aid their efforts. Humans race against the clock solving interconnected puzzles across the hotel, while the ghost hunts them down. You can check out any time you like, but you can never leave.",
      contributions: "One of three programmers on the project. Worked on top of a custom networking layer built by a teammate to design and implement all puzzle systems, making each one functional over multiplayer. Built a networked map jigsaw puzzle, a replicate puzzle, a radio tuning puzzle, and a Morse code puzzle, each requiring state to be synchronised correctly across all connected clients. Also handled character selection over the network, the settings menu, and end game screens.",
      notable: "University project, SAE Institute Dubai"
    },
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
    description: {
      about: "A 2.5D narrative platformer set in a transhuman future. The protagonist confronts the inevitability of human augmentation, processing emotional trauma while acquiring abilities that challenge their identity. Inspired by the accelerating pace of real-world augmentation technology.",
      contributions: "One of two programmers on the project. Built the player movement system including slide, crouch, and a double jump jetpack mechanic. Implemented the full dialogue system across all four levels, handled all level decoration, lighting, and post-processing, integrated all audio including ambient sounds, movement audio, and voiced dialogue, and built the animated main menu system.",
      notable: "University project, SAE Institute Dubai"
    },
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
    description: {
      about: "A short low-poly 2.5D platformer set in a fictional Middle Eastern future. Play as Model-VV, a lost robot from an endangered species striving to reach a safehouse, coping with a constant loss of abilities along the way. Built for Global Game Jam 2021 on the theme 'Lost and Found.'",
      contributions: "Small team built over 48 hours. Responsible for the player movement system with a dash ability and cooldown, the perk and ability loss system with swap UI and icons forming the core game mechanic, the dialogue system with voice overs across all levels, level complete flow with fades, the main menu, and all audio and VFX throughout.",
      notable: "Global Game Jam 2021"
    },
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
    description: {
      about: "A third-person tower defense game where you protect the Kingdom of Calces from waves of enemy forces. Built as a collaborative university project across the games and animation departments at SAE Institute Dubai, with a team spanning programmers, a game designer, animation students, and graphic design and audio collaborators.",
      contributions: "One of the programmers on a large collaborative team. Built the camera system, the full shooting system with tracer bullets, muzzle flash, and hit markers, AI for multiple enemy types including knights and archers with separation and alignment behaviours, a wave system with burst wave support, ammo UI, health bars with gradient visuals, a wall health bar, custom Unity editor tools for level setup, VFX for enemy attacks, a cutscene system with skippable sequences, win and loss screens, and the main menu with animated buttons and hover particle effects. Also handled audio integration throughout.",
      notable: "University project, SAE Institute Dubai, collaboration across games, animation, graphic design, and audio departments"
    },
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
    description: {
      about: "A gothic horror turn-based RPG set across a haunted hotel and carnival environment. Players build and manage a party of characters, recruiting allies and battling through story-driven encounters against skeletal and supernatural enemies. Built as a university project at SAE Institute Dubai.",
      contributions: "Lead programmer on a small team that started with two programmers, a designer, and animation student collaborators, eventually carrying the codebase solo after the other programmer left mid-project. Built the hex grid system with pathfinding, a GOAP AI system for enemy behaviour, a full turn-based battle manager, multiple character classes with distinct skills, a party selection and recruitment system, an overworld with click-to-move navigation, a camera system using Bezier curves, a minimap, a story and dialogue trigger system, cutscenes, and a full menu system with transitions. Also built the UI throughout including profile cards, skill displays, and victory and loss screens.",
      notable: "University project, SAE Institute Dubai"
    },
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
