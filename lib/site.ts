import * as defaults from "@/lib/content";
import { prisma } from "@/lib/db";

// Reads one section from the database. If the row is missing or the
// database is unreachable, it falls back to the starting content.
export async function getSection<T>(key: string, fallback: T): Promise<T> {
  try {
    const row = await prisma.siteContent.findUnique({ where: { key } });
    return row ? (row.data as unknown as T) : fallback;
  } catch (error) {
    console.error(`Could not load section "${key}"`, error);
    return fallback;
  }
}

export async function getSiteContent() {
  const [
    cover,
    portraitSplit,
    alponaTrio,
    filmStrip,
    slideshow,
    portraitStack,
    films,
    storytelling,
    standardPackages,
    sanatanPackages,
    sanatanArt,
    addOns,
    terms,
    team,
    siteInfo,
  ] = await Promise.all([
    getSection("cover", defaults.cover),
    getSection("portraitSplit", defaults.portraitSplit),
    getSection("alponaTrio", defaults.alponaTrio),
    getSection("filmStrip", defaults.filmStrip),
    getSection("slideshow", defaults.slideshow),
    getSection("portraitStack", defaults.portraitStack),
    getSection("films", defaults.films),
    getSection("storytelling", defaults.storytelling),
    getSection("standardPackages", defaults.standardPackages),
    getSection("sanatanPackages", defaults.sanatanPackages),
    getSection("sanatanArt", defaults.sanatanArt),
    getSection("addOns", defaults.addOns),
    getSection("terms", defaults.terms),
    getSection("team", defaults.team),
    getSection("siteInfo", defaults.siteInfo),
  ]);

  return {
    cover,
    portraitSplit,
    alponaTrio,
    filmStrip,
    slideshow,
    portraitStack,
    films,
    storytelling,
    standardPackages,
    sanatanPackages,
    sanatanArt,
    addOns,
    terms,
    team,
    siteInfo,
  };
}
