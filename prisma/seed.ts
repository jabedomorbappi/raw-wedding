import { PrismaClient } from "@prisma/client";
import * as content from "../lib/content";

const prisma = new PrismaClient();

const sections: Record<string, unknown> = {
  cover: content.cover,
  portraitSplit: content.portraitSplit,
  alponaTrio: content.alponaTrio,
  filmStrip: content.filmStrip,
  slideshow: content.slideshow,
  portraitStack: content.portraitStack,
  films: content.films,
  storytelling: content.storytelling,
  standardPackages: content.standardPackages,
  sanatanPackages: content.sanatanPackages,
  sanatanArt: content.sanatanArt,
  addOns: content.addOns,
  terms: content.terms,
  team: content.team,
  siteInfo: content.siteInfo,
  navLinks: content.navLinks,
};

async function main() {
  for (const [key, value] of Object.entries(sections)) {
    const data = JSON.parse(JSON.stringify(value));
    // update: {} means re-running the seed never overwrites admin edits.
    await prisma.siteContent.upsert({
      where: { key },
      update: {},
      create: { key, data },
    });
  }
  console.log(`Seeded ${Object.keys(sections).length} sections`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
