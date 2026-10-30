export interface ImageItem {
  src: string;
  alt: string;
}

// Temporary placeholder photos. Later this data comes from the database.
const img = (seed: string, w: number, h: number): string =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const cover = {
  title: "RAW VISUALS",
  subtitle: "EXPERIMENTAL DOCUMENTARY WEDDING",
  image: {
    src: img("rw-cover", 1920, 1200),
    alt: "Bride against a red brick wall",
  },
};

export const portraitSplit = {
  main: { src: img("rw-portrait", 1400, 1200), alt: "Bride close-up portrait" },
  cards: [
    { src: img("rw-card1", 600, 800), alt: "Bride in red" },
    { src: img("rw-card2", 600, 800), alt: "Couple portrait" },
    { src: img("rw-card3", 600, 800), alt: "Bride with veil" },
  ],
};

export const alponaTrio = {
  circle: {
    src: img("rw-alpona", 1200, 1200),
    alt: "Bride sitting on Alpona floor art",
  },
  cards: [
    { src: img("rw-trio1", 600, 1000), alt: "Bride in white veil" },
    { src: img("rw-trio2", 600, 1000), alt: "Smiling bride" },
    { src: img("rw-trio3", 600, 1000), alt: "Bride in orange veil" },
  ],
};

const stripCounts = [3, 4, 3, 4, 3, 4, 3, 3];

export const filmStrip = {
  banner: { src: img("rw-banner", 1920, 900), alt: "Bride with red dupatta" },
  columns: stripCounts.map((count, c) =>
    Array.from({ length: count }, (_, r) => ({
      src: img(`rw-strip-${c}-${r}`, 400, 500),
      alt: `Wedding moment ${c + 1}-${r + 1}`,
    })),
  ),
};

// export const floatingMosaic: ImageItem[] = [
//   { src: img("rw-m1", 700, 700), alt: "Bride in green setting" },
//   { src: img("rw-m2", 900, 1100), alt: "Girl with flowers" },
//   { src: img("rw-m3", 700, 900), alt: "Couple close-up" },
//   { src: img("rw-m4", 700, 900), alt: "Bride portrait" },
//   { src: img("rw-m5", 800, 800), alt: "Candid wedding moment" },
// ];

export const slideshow: ImageItem[] = Array.from({ length: 14 }, (_, i) => ({
  src: img(`rw-slide-${i}`, 800, 1000),
  alt: `Wedding moment ${i + 1}`,
}));

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Gallery", href: "#gallery" },
  { label: "Films", href: "#films" },
  { label: "Packages", href: "#packages" },
  { label: "Crew", href: "#crew" },
  { label: "Contact", href: "#contact" },
];

// ---------- Portrait + stacked photos ----------
export const portraitStack = {
  main: { src: img("rw-founder", 1000, 1400), alt: "Founder portrait" },
  stack: [
    { src: img("rw-stack1", 860, 520), alt: "Bridal close-up" },
    { src: img("rw-stack2", 860, 520), alt: "Bridal henna hands" },
    { src: img("rw-stack3", 860, 520), alt: "Wedding detail" },
  ] as ImageItem[],
};

// ---------- Films ----------
export interface FilmItem {
  title: string;
  youtubeUrl: string;
  thumbnail?: string; // if empty, the YouTube thumbnail is used
}

// Replace each youtubeUrl with the film's real YouTube link.
const CHANNEL = "https://www.youtube.com/@rawweddings";
const filmTitles = [
  "Sakif and Zohra",
  "Riaz and Sonia Pre Wedding Film",
  "Nayeem and Chaity",
  "Tanisha's wedding",
  "Jayan & Sattwa",
  "Marjan",
  "Asad Color Fest Trailer",
  "Swasti & Rajkumar Pre Wedding Story",
  "Story of Yousra & Nakib",
];
export const films: FilmItem[] = filmTitles.map((title, i) => ({
  title,
  youtubeUrl: CHANNEL,
  thumbnail: img(`rw-film-${i}`, 800, 450),
}));

// ---------- Storytelling ----------
export const storytelling = {
  caption: "THE ART OF VISUAL STORYTELLING.",
  video: { thumbnail: img("rw-story", 1000, 750), youtubeUrl: CHANNEL },
  images: [
    { src: img("rw-band1", 1000, 667), alt: "Traditional band musicians" },
    { src: img("rw-band2", 1000, 667), alt: "Band drummer" },
    { src: img("rw-band3", 1000, 667), alt: "Wedding procession" },
  ] as ImageItem[],
};

// ---------- Packages ----------
// Use **double asterisks** to make text bold.
export interface StandardPackage {
  name: string;
  priceBdt: number;
  features: string[];
  services: string[];
}

const standardServices = [
  "15-40 minute cinematic wedding film with song preference.",
  "Cinematic color-graded trailer (2-5 minutes).",
  "Digital copies will be provided via google drive or the client's pendrive",
];

export const standardPackages: StandardPackage[] = [
  {
    name: "Kathgolap",
    priceBdt: 15000,
    features: [
      "**1 Senior** Photographer",
      "**1 Senior** Cinematographer",
      "5 Hours Duration (Continual)",
      "Unlimited photos (all post-processed)",
      "2 Edited videos (1920x1080) Full HD",
      "1 promo or trailer video",
      "1 full documentation video",
    ],
    services: standardServices,
  },
  {
    name: "Charulata",
    priceBdt: 20000,
    features: [
      "**1 Senior** Photographer",
      "**1 Associate** Photographer",
      "**1 Senior** Cinematographer",
      "5 Hours Duration (Continual)",
      "Unlimited photos (all post-processed)",
      "2 Edited videos (1920x1080) Full HD",
      "1 promo or trailer video",
      "1 full documentation video",
    ],
    services: standardServices,
  },
  {
    name: "RAW Signature",
    priceBdt: 50000,
    features: [
      "**3 Hours** Portrait Session With **Naeem Noor, Mi Maruf, Arik ahman**",
      "**3 Senior Photographer** for Group, Guest, Family & Candid Shots.",
      "**Unlimited** number of Photos.",
      "Total **6 hours** Shift.",
      "**300** Special Edit by **Naeem Noor**",
      "**100** (4R Size) & 5 (**12L Size**) Printed Hard copy.",
      "Cinematography lead by **AH Hridoy** with one **assistant** Cinematographer",
      "**One Storytelling Style Documentary Film**",
      "**All Photos** (RAW+Edited) will be Delivered in **Highspeed Pen drive with box**",
      "**Complimentary** Get Ready shoot **Complimentary** reels",
      "**Complimentary Pre / Post wedding Shoot.**",
      "**Drone** Shoot",
      "One Best Quality customise **Photobook**",
    ],
    services: [],
  },
];

export interface ScheduleRow {
  label: string;
  crew: string;
  duration: string;
}

export interface SanatanPackage {
  name: string;
  priceBdt: number;
  schedule: ScheduleRow[];
  services: string[];
  note: string;
}

const morning: ScheduleRow = {
  label: "morning ritual (adhibhas/holud snan)",
  crew: "1 photographer & 1 cinematographer",
  duration: "4 hours",
};
const wedding: ScheduleRow = {
  label: "Wedding / Logno (Till 05.00 am)",
  crew: "2 photographer & 2 cinematographer",
  duration: "whole night",
};
const bidai: ScheduleRow = {
  label: "bidai / bashi biye",
  crew: "1 photographer & 1 cinematographer",
  duration: "3 hours",
};
const reception: ScheduleRow = {
  label: "RECEPTION",
  crew: "1 photographer & 1 cinematographer",
  duration: "5 hours",
};

export const sanatanArt: ImageItem = {
  src: img("rw-sanatan", 600, 800),
  alt: "Sanatan wedding illustration",
};

export const sanatanPackages: SanatanPackage[] = [
  {
    name: "Alpona",
    priceBdt: 60000,
    schedule: [morning, wedding, bidai],
    services: [
      "15-40 minute cinematic wedding film with song preference. (**3** Documentation video)",
      "Cinematic color-graded trailer (2-5 minutes). (**3** trailers)",
      "Number of Pictures: Unlimited (All post processed)",
      "Specially Edited Photos: 150 copies",
      "One Premium Photobook (100 pictures)",
      "Digital copies will be provided via google drive or the client's pendrive",
    ],
    note: "(This is only the Bride side package. You can add the Groom side.)",
  },
  {
    name: "Logno Combo",
    priceBdt: 75000,
    schedule: [morning, wedding, bidai, reception],
    services: [
      "15-40 minute cinematic wedding film with song preference. (**3** Documentation video)",
      "Cinematic color-graded trailer (2-5 minutes). (**3** trailers)",
      "Number of Pictures: Unlimited (All post processed)",
      "Specially Edited Photos: 250-300 copies",
      "All pictures retouched",
      "One Premium Photobook (100 pictures)",
      "Digital copies will be provided via google drive or the client's pendrive",
    ],
    note: "(This is only the Bride side package. You can add the Groom side.)",
  },
];

export const addOns: string[] = [
  "1 Premium **Photobook** (100 Pages) BDT 5,000",
  "1 **Senior Photographer** BDT 4,000",
  "1 **Senior Cinematographer** BDT 5,000",
  "1 **Core Photographer** BDT 6,000",
  "1 **Core Cinematographer** BDT 7,000",
  "**4K** Video Resolution BDT 10,000",
  "**Reels** (15-60 Sec) BDT 2,000",
  "**Drone** BDT 5,000",
  "50 PHOTOS EDITED IN **24 HOUR** BDT 2,000",
  "Express Delivery within **72 hours** - BDT 10,000",
];

export const terms: string[] = [
  "An additional charge of **3,000** will be applied for **every extra hour.**",
  "All the photographs that are taken by us **RAW WEDDINGS** are under copyright protection by us. We hold the right to display any photographs to generally promote the business in facebook, advertising media, brochures, magazine articles, Websites and other social medias.",
  "Duration can be negotiated depending on special circumstances and availability.",
  "**50% payment** is required in **advance** for booking.",
  "The rest **50%** is payable on the day of the event date.",
  "It may take around **1 month** to deliver the photographs.",
  "The client must inform us of any corrections to the videos/photos within **three** days of the final delivery.",
  "After this period, a re-edit **charge** will apply for any changes.",
  "These packages are for Chittagong City only. For outside of Chittagong **extra charges (Travel, Accommodation, food Etc.)** will be added to the price of each package.",
  "We can provide you a **custom package** if needed.",
  "We do not retain any footage/images/files (raw or edited) **beyond two months** after delivery.",
  "The client must receive the final delivery within **45 days of the event.** If not, we will delete the project.",
  "The client **must download all files** from Google Drive within **15 days** of delivery.",
  "We will **clear our drive after 15 days** of Final delivery.",
  "To ensure the best quality, it is highly recommended that you **hire only one professional team** to cover each of your events.",
];

// ---------- Crew ----------
export interface TeamMember {
  name: string;
  role: string;
  photo: ImageItem;
}

const crewData: [string, string][] = [
  ["Hridoy", "Founder & Lead Cinematographer"],
  ["Naeem", "Lead Photographer"],
  ["Maruf", "Lead Photographer"],
  ["Arik", "Core Photographer"],
  ["Mong", "Cinematographer"],
  ["Tanvir", "Co-Founder & Lead Cinematographer"],
  ["Munna", "Chief Editor"],
  ["Irfan", "Manager"],
  ["Imran", "Drone Operator"],
  ["Emon", "Co-ordinator"],
];

export const team: TeamMember[] = crewData.map(([name, role]) => ({
  name,
  role,
  photo: { src: img(`rw-crew-${name.toLowerCase()}`, 400, 400), alt: name },
}));

// ---------- Contact / footer ----------
export const siteInfo = {
  brand: "rawweddings",
  email: "shoot.rawweddingbd@gmail.com",
  phone: "+880 1812-284828",
  address: "B6X-Block, Halishahar, Chattogram, Bangladesh",
  // Confirm these handles; they are guesses.
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/rawweddings" },
    { label: "YouTube", href: "https://www.youtube.com/@rawweddings" },
    { label: "Facebook", href: "https://www.facebook.com/rawweddings" },
    { label: "WhatsApp", href: "https://wa.me/8801812284828" },
  ],
};

export type SiteInfo = typeof siteInfo;
