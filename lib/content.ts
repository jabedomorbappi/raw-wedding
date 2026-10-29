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
