// Alter Lily Website Constants

export const SITE_CONFIG = {
  name: "Alter Lily",
  tagline: "Innocence Tested in a Plague-Stricken World", // [WRITER: 5-8 word atmospheric tagline]
  description: "A hand-painted 2D medieval NSFW RPG where you play as Liliana in a plague-stricken village. Experience a living world where your actions shape destiny.",
  url: "https://alterlily.com",
  author: "Veducko",
};

export const COLORS = {
  // Primary
  forestGreen: "#4A6B4F",
  earthBrown: "#8B7355",
  stoneGray: "#787469",
  deepShadow: "#2C2A28",

  // Accents
  maxineOrange: "#E8754A",
  lilianaBrown: "#8B6B5F",
  bloodRed: "#8B3A3A",
  snowWhite: "#E8E4DC",

  // UI
  bgDark: "#0F0E0D",
  bgMid: "#1A1816",
  textCream: "#E8DCC4",
  textMuted: "#A89B88",
  border: "#4A3F38",
};

export type TimelineStatus = "completed" | "current" | "upcoming" | "future";

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  status: TimelineStatus;
  milestone?: boolean;
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: "2023",
    title: "Concept Phase",
    description: "The vision for Alter Lily took shape. Character designs, world-building, and core gameplay mechanics were conceived.",
    status: "completed",
  },
  {
    year: "2024-2025",
    title: "Production",
    description: "Full-scale development began. Hand-painted environments, Live2D animations, and core systems were brought to life.",
    status: "completed",
  },
  {
    year: "Late 2025",
    title: "Polishing",
    description: "Refining gameplay, perfecting animations, and ensuring every detail meets our vision of a premium experience.",
    status: "current",
  },
  {
    year: "Q1 2026",
    title: "Demo + Steam",
    description: "Public demo release and Steam page launch. Experience the village of Alter Lily for the first time.",
    status: "upcoming",
    milestone: true,
  },
  {
    year: "TBD",
    title: "Full Release",
    description: "The complete Alter Lily experience. Every secret, every path, every consequence.",
    status: "future",
  },
];

export const FEATURES = [
  {
    id: "hand-painted",
    title: "Hand-Painted World",
    shortDescription: "Every environment crafted with brushstroke precision, bringing medieval darkness to life.",
    icon: "paintbrush",
    // [WRITER: 150-200 word expanded description]
    expandedDescription: "Every pixel of Alter Lily's world has been lovingly hand-painted, creating an atmosphere that digital shortcuts simply cannot replicate. From the weathered stones of the village square to the twisted branches of the dark forest, each environment tells its own story through artistic detail. The plague-stricken village isn't just a backdrop—it's a character in itself, breathing with the weight of history and despair. Our artists have poured countless hours into ensuring that every shadow, every crack in the plaster, every flickering candle flame contributes to an immersive experience that draws you deeper into Liliana's world. This isn't procedural generation or asset flipping—this is craft, pure and intentional.",
  },
  {
    id: "living-world",
    title: "Interactive Living World",
    shortDescription: "NPCs follow daily routines, remember your actions, and shape their responses accordingly.",
    icon: "people",
    expandedDescription: "The village of Alter Lily breathes with independent life. Each NPC follows their own schedule—the blacksmith rises at dawn to stoke his forge, the tavern keeper prepares for the evening rush, and the guards patrol routes that shift with the time of day. But this isn't mere simulation; these characters remember. Help the merchant, and she'll offer better prices. Be caught stealing, and whispers will spread. The plague has changed people, and your actions determine whether they see Liliana as savior, victim, or threat. Every interaction ripples outward, creating emergent stories unique to your playthrough.",
  },
  {
    id: "stealth-combat",
    title: "Deadly Stealth Combat",
    shortDescription: "Soulslike difficulty meets tactical stealth. Every encounter is a puzzle with lethal stakes.",
    icon: "dagger",
    expandedDescription: "Combat in Alter Lily is not about power fantasy—it's about survival. Inspired by soulslike games, every encounter demands respect. Guards are dangerous, and a fair fight often means death. Success comes through observation, patience, and precision. Study patrol patterns. Time your movements to the shadows. Strike only when certain. Or find another way entirely—many situations can be resolved through stealth, distraction, or clever use of the environment. The plague has weakened Liliana, but cunning and desperation make for potent weapons.",
  },
  {
    id: "live2d",
    title: "Premium Live2D Animation",
    shortDescription: "Characters breathe, emote, and react with fluid Live2D animation bringing them to vivid life.",
    icon: "animation",
    expandedDescription: "Alter Lily's characters aren't static portraits—they live. Using premium Live2D technology, every character breathes, blinks, and reacts with natural fluidity. Emotions play across faces in real-time: a nervous lip bite, a flash of anger in the eyes, the subtle relaxation of relief. During intimate scenes, this technology reaches its full potential, creating moments of connection that static images simply cannot achieve. Each animation has been carefully crafted to maintain artistic consistency while bringing unprecedented life to the hand-painted aesthetic.",
  },
  {
    id: "day-night",
    title: "Day/Night & Dynamic Weather",
    shortDescription: "Time flows naturally, bringing changing light, weather, and opportunities with each passing hour.",
    icon: "sun-moon",
    expandedDescription: "The village transforms as hours pass. Dawn brings a false sense of hope, golden light cutting through morning mist. Noon exposes the plague's devastation in harsh clarity. Dusk paints everything in shades of blood and amber. Night brings both danger and opportunity—guards are fewer, but what lurks in darkness? Weather shifts too: rain drives people indoors, snow muffles footsteps, fog provides cover. The world responds to these changes, and the clever player learns to use them.",
  },
  {
    id: "ecosystem",
    title: "Reactive Ecosystem",
    shortDescription: "Animals, guards, and events interact dynamically, creating emergent gameplay moments.",
    icon: "ecosystem",
    expandedDescription: "Alter Lily's world operates on systems that interact in surprising ways. A startled crow might alert a guard. A stray dog could lead you to hidden supplies—or give away your position. Guards react to disturbances, investigate sounds, and coordinate responses. Rain affects visibility and noise. Fire spreads. The plague itself is an active force, changing who's affected and how the village responds. These systems combine to create moments the designers never scripted—emergent stories born from the world itself.",
  },
  {
    id: "choice-action",
    title: "Choice Through Action",
    shortDescription: "No dialogue trees. Your actions speak louder than words—every deed shapes your story.",
    icon: "crossroads",
    expandedDescription: "Forget dialogue wheels and moral choices presented as A/B buttons. In Alter Lily, choice is action. Help someone, ignore them, or exploit their weakness—the game never asks, it simply observes. There are no morality meters, no 'good' or 'evil' paths clearly marked. Only consequences, rippling outward from every decision you make through deed rather than declaration. The village watches, remembers, and responds to who you prove yourself to be through action.",
  },
  {
    id: "story",
    title: "Professionally Crafted Story",
    shortDescription: "A narrative woven by experienced writers, balancing mature themes with emotional depth.",
    icon: "scroll",
    expandedDescription: "The plague that grips Alter Lily's village is no ordinary disease. Its effects are strange, disturbing, and deeply personal. Liliana's journey through this nightmare is crafted by writers who understand that mature content requires mature storytelling. This isn't gratuitous—every intimate moment serves character and plot, exploring themes of desire, desperation, corruption, and survival. The story respects both its dark subject matter and its audience, delivering an experience that lingers long after the game ends.",
  },
  {
    id: "detailed-world",
    title: "Detailed Hand-Placed World",
    shortDescription: "Every object has purpose and story. Nothing exists without reason in this meticulously crafted village.",
    icon: "map",
    expandedDescription: "No procedural generation. No copy-pasted assets. Every barrel, every piece of furniture, every shadow has been deliberately placed by human hands. The village tells stories through environmental details: a child's toy abandoned in the street, medicine bottles empty by a bedside, a letter never sent. Exploration rewards attention—secrets hide in plain sight for those who look closely. This is a world built with intention, where every corner rewards curiosity with discovery.",
  },
];

export const CHARACTERS = [
  {
    id: "liliana",
    name: "Liliana",
    role: "Protagonist",
    age: "19",
    status: "Healthy (for now)",
    // Character image (thigh-up)
    image: "/images/characters/LilianaMerged.png",
    imageType: "thigh-up" as const,
    // Color palette: top, bottom, hair, skin
    palette: {
      top: "#BDAAA1",
      bottom: "#313945",
      hair: "#453732",
      skin: "#E8B9A6",
    },
    themeColor: "#E8B9A6",
    accentColor: "#453732",
    traits: {
      positive: ["Curious", "Caring", "Innocent", "Headstrong", "Self-Sacrificing", "Hard-Working"],
      dark: ["Jealous", "Slow to Trust"],
    },
    // [WRITER: 2-3 sentences character teaser]
    teaser: "A young woman whose quiet life shatters when the plague reaches her village. Her determination to help those she loves will lead her down paths she never imagined—and force her to discover what she's truly capable of.",
    // [WRITER: 200-250 words personality deep dive]
    personality: "Liliana embodies the quiet strength of someone who has never been tested—until now. Raised in relative comfort by her mother Sophie, she's developed a deep well of compassion that sometimes blinds her to her own needs. She gives too freely, trusts too slowly, and carries a stubborn streak that her mother calls 'headstrong' and others might call reckless. The plague hasn't touched her body, but it's already begun to change her soul. Watching neighbors fall ill, watching the village she loves decay around her, she's discovering anger she didn't know she possessed. And perhaps something else—a darkness that whispers possibilities she was raised to reject. Her innocence isn't naivety; it's simply that she's never had reason to be otherwise. That's changing. Every day brings new tests, new temptations, new reasons to question everything she believed about herself and her world. The plague has unusual effects on those it touches, and Liliana will learn that even the healthy aren't immune to its corruption.",
    // [WRITER: 75-100 words, spoiler-free role in story]
    roleInStory: "As the player character, Liliana is your vessel through the plague-stricken village. Her relationships, reputation, and fate are entirely in your hands. Will she remain the caring soul her mother raised, or will desperation carve something new from her innocence? The village watches, remembers, and responds to every choice you make through her.",
    // [WRITER: 50-75 words voice/manner description]
    voiceManner: "Liliana speaks with careful consideration, often pausing before responding. Her voice carries warmth when comforting others, but hardens with unexpected steel when protecting those she loves. She rarely raises her voice—when she does, people listen.",
    // [WRITER: 10-25 word iconic quote]
    quote: "I won't let this village die. Not while I can still do something.",
  },
  {
    id: "maxine",
    name: "Maxine",
    role: "Childhood Friend",
    age: "20",
    status: "Complicated",
    // Character image (thigh-up)
    image: "/images/characters/MaxineMerged.png",
    imageType: "thigh-up" as const,
    // Color palette: top, bottom, hair, skin
    palette: {
      top: "#CE5831",
      bottom: "#804829",
      hair: "#534E3F",
      skin: "#E9C9B2",
    },
    themeColor: "#CE5831",
    accentColor: "#804829",
    traits: {
      positive: ["Adventurous", "Passionate", "Tomboyish", "Loyal", "Seeks Distraction"],
      dark: ["Foul-Mouthed", "Callous"],
    },
    teaser: "Fire and fury wrapped in a woman who refuses to show weakness. Maxine's bravado hides wounds the plague has only deepened—and her bond with Liliana may be tested in ways neither expected.",
    personality: "Where Liliana is careful, Maxine is reckless. Where Liliana whispers, Maxine roars. The two have been inseparable since childhood, their differences forging a bond stronger than blood. But the plague has changed things. Maxine watched her father succumb to the disease—watched the impossible things it did to him before the end. Now she carries that trauma like a second skin, hiding it beneath layers of crude jokes and aggressive confidence. She drinks too much, fights too eagerly, and pushes away anyone who tries to reach the pain beneath. Her loyalty to Liliana remains absolute, but it's a fierce, possessive loyalty that might suffocate as easily as protect. Maxine refuses to acknowledge fear, which makes her both incredibly brave and terrifyingly reckless. She'd die for her friends without hesitation—but she might also get them killed through her refusal to show caution.",
    roleInStory: "Maxine serves as Liliana's closest companion and potential romantic interest. Her brash nature often creates opportunities—and problems—that shape your journey through the village. How you navigate her trauma and earn her trust will significantly impact both characters' fates.",
    voiceManner: "Maxine speaks quickly, loudly, and colorfully. Profanity punctuates her sentences like exclamation points. She laughs too hard at her own jokes and challenges everyone to match her intensity. But in rare quiet moments, her voice drops to something almost tender.",
    quote: "The plague took everything from me. It doesn't get to take you too.",
  },
  {
    id: "sophie",
    name: "Sophie",
    role: "Mother Figure",
    age: "42",
    status: "Worried",
    // Silhouette (waist-up) - no full image yet
    image: "/images/characters/SiluetteGirl2.png",
    imageType: "waist-up" as const,
    isSilhouette: true,
    // Color palette: top, bottom, hair, skin (mature, elegant tones)
    palette: {
      top: "#8B7355",
      bottom: "#5C4A3D",
      hair: "#3D2E24",
      skin: "#DEB8A0",
    },
    themeColor: "#DEB8A0",
    accentColor: "#8B7355",
    traits: {
      positive: ["Affectionate", "Traditional", "Strict", "Proud", "Protective"],
      dark: ["Stubborn", "Image-Conscious"],
    },
    teaser: "Liliana's mother clings to propriety as the world crumbles around her. Her love is fierce, her expectations high, and her secrets deeper than her daughter knows.",
    personality: "Sophie raised Liliana alone, building a life through sheer determination and an iron grip on respectability. The village knows her as a proud woman, perhaps too proud—she'd rather go hungry than accept charity, rather suffer in silence than admit weakness. This stubbornness served her well in better times, but the plague tests everything she's built. Her daughter's safety consumes her thoughts, and she struggles to balance protection with the knowledge that Liliana must make her own choices. Sophie's love manifests as rules, as worry, as attempts to control what cannot be controlled. She sees the woman her daughter is becoming and fears for her—not because she doubts Liliana's strength, but because she knows too well what this world does to strong women. There are things in Sophie's past she's never shared with her daughter. The plague may force those secrets into light.",
    roleInStory: "Sophie represents the life Liliana might lose—or fight to protect. Her approval or disappointment carries weight, and her secrets may reveal unexpected depths to both characters. The mother-daughter relationship evolves based on player choices, from supportive partnership to heartbreaking estrangement.",
    voiceManner: "Sophie speaks with measured dignity, each word chosen for propriety. Her affection shows in actions more than words—a touch on the cheek, a meal prepared just so. When angry, she grows quieter, not louder, which is somehow worse.",
    quote: "I didn't raise you to be reckless, Liliana. I raised you to survive.",
  },
  {
    id: "acacius",
    name: "Acacius",
    role: "Noble",
    age: "24",
    status: "Privileged",
    // Silhouette (waist-up) - no full image yet
    image: "/images/characters/SiluetteMan1.png",
    imageType: "waist-up" as const,
    isSilhouette: true,
    // Color palette: top, bottom, hair, skin (noble, refined tones)
    palette: {
      top: "#4A5568",
      bottom: "#2D3748",
      hair: "#C9A66B",
      skin: "#F0D9C4",
    },
    themeColor: "#C9A66B",
    accentColor: "#4A5568",
    traits: {
      positive: ["Heart of Gold", "Naive", "Noble", "Stubborn", "Idealistic"],
      dark: ["Spoiled", "Blind to Others' Ways"],
    },
    teaser: "Born to privilege, Acacius has never known hardship—until the plague made equals of noble and peasant alike. His genuine desire to help wars with his complete inability to understand the common folk he wants to save.",
    personality: "Acacius is living proof that wealth doesn't prevent compassion—it just makes it complicated. Raised in the noble quarter's isolation, he grew up with tutors who taught philosophy and ethics, instilling a genuine desire to improve his people's lives. The problem is, he's never actually met his people. His understanding of poverty comes from books. His knowledge of struggle is theoretical. When he ventures into the plague-stricken village with supplies and good intentions, he's genuinely confused by resentment and mistrust. Why wouldn't people accept help? His naivety isn't malicious—it's simply the blindness of someone who's never had to choose between dignity and survival. The plague is teaching him lessons no tutor could provide, and his idealism is being tested by harsh reality. Whether he emerges as a true ally or retreats to comfortable ignorance depends largely on those he encounters.",
    roleInStory: "Acacius represents opportunity and complication in equal measure. His resources could significantly aid Liliana's efforts, but earning his trust—and teaching him to actually understand her world—requires patience. A potential ally, romantic interest, or source of conflict depending on player choices.",
    voiceManner: "Acacius speaks with educated precision, occasionally using words no one else in the village would know. He tries to modulate his accent to sound more approachable, usually failing. His enthusiasm often overwhelms his listeners, and he's completely oblivious to social cues suggesting he should stop talking.",
    quote: "I know I can't understand what you're going through. But I want to try.",
  },
];

export const ENVIRONMENTS = [
  {
    id: "village",
    name: "The Village",
    image: "/images/environments/_village1.png",
    caption: "Once the heart of community, now a haunted reminder of better days. The fountain still flows, but few gather at its edge anymore.",
  },
  {
    id: "farm",
    name: "The Farm",
    image: "/images/environments/_Farm.png",
    caption: "Fields that once fed families now lie fallow. The farmer's tools rust where they fell. Nature reclaims what plague has abandoned.",
  },
  {
    id: "cemetery",
    name: "The Cemetery",
    image: "/images/environments/_cemetary.png",
    caption: "Fresh graves outnumber the old. The groundskeeper works through the night now. Some say the dead don't rest easy.",
  },
  {
    id: "hunter-hut",
    name: "Hunter's Hut",
    image: "/images/environments/_hunerhut.png",
    caption: "Deep in the woods where few dare venture. The hunter knows paths others have forgotten.",
  },
  {
    id: "mines",
    name: "The Mines",
    image: "/images/environments/_mines.png",
    caption: "Abandoned when the first miners fell ill. Now only echoes live in those tunnels—and perhaps something else.",
  },
  {
    id: "swamp",
    name: "The Swamp",
    image: "/images/environments/_swamp.png",
    caption: "Murky waters hide more than mud and reeds. Others who enter are not always seen again.",
  },
  {
    id: "ingame",
    name: "In-Game Preview",
    image: "/images/environments/_InGame1.png",
    caption: "Experience the plague-stricken world through Liliana's eyes. Every location tells a story.",
  },
];

export const SOCIAL_LINKS = {
  discord: {
    name: "Discord",
    url: "https://discord.gg/alterlily", // [REPLACE: Actual Discord link]
    description: "Join Our Community",
    memberCount: "130+",
    color: "#5865F2",
  },
  patreon: {
    name: "Patreon",
    url: "https://patreon.com/alterlily", // [REPLACE: Actual Patreon link]
    description: "Support Development",
    color: "#FF424D",
  },
  itchio: {
    name: "Itch.io",
    url: "https://alterlily.itch.io", // [REPLACE: Actual Itch.io link]
    description: "NSFW Animations Available Now",
    viewCount: "200k+",
    color: "#FA5C5C",
    available: true,
  },
  steam: {
    name: "Steam",
    url: "#", // Coming soon
    description: "Coming Q1 2026",
    color: "#1B2838",
    available: false,
  },
  twitter: {
    name: "Twitter/X",
    url: "https://twitter.com/alterlily", // [REPLACE: Actual Twitter link]
    description: "Follow for Updates",
    color: "#000000",
  },
  youtube: {
    name: "YouTube",
    url: "https://youtube.com/@alterlily", // [REPLACE: Actual YouTube link]
    description: "Trailers & Devlogs",
    color: "#FF0000",
  },
};

export const NEWSLETTER_BENEFITS = [
  { icon: "bell", text: "Demo release notification" },
  { icon: "steam", text: "Steam launch alert" },
  { icon: "mail", text: "Monthly dev updates" },
  { icon: "image", text: "Exclusive concept art" },
  { icon: "star", text: "Early access opportunities" },
];

export const NAV_LINKS = [
  { name: "Live2D", href: "#live2d" },
  { name: "Characters", href: "#characters" },
  { name: "Timeline", href: "#timeline" },
  { name: "World", href: "#environments" },
  { name: "Media", href: "#media" },
  { name: "Devblog", href: "/devblog" },
];

export const FOOTER_LINKS = {
  main: [
    { name: "About", href: "#about" },
    { name: "Characters", href: "#characters" },
    { name: "Media", href: "#media" },
    { name: "Devblog", href: "/devblog" },
    { name: "Press Kit", href: "#" }, // [ADD: Press kit page]
    { name: "Contact", href: "#" }, // [ADD: Contact method]
  ],
  legal: [
    { name: "Privacy Policy", href: "#" }, // [ADD: Privacy policy]
    { name: "Terms of Service", href: "#" }, // [ADD: Terms]
    { name: "Age Disclaimer", href: "#" }, // [ADD: Age disclaimer]
  ],
};

export const WIKI_SECTIONS = [
  { name: "Lore", icon: "book" },
  { name: "Characters", icon: "users" },
  { name: "Locations", icon: "map" },
  { name: "Combat Guide", icon: "sword" },
  { name: "Items", icon: "chest" },
  { name: "Secrets", icon: "key" },
];

// Demo countdown target
export const DEMO_RELEASE_DATE = new Date("2026-03-01T00:00:00");
