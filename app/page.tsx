import AddOnsTerms from "@/components/sections/AddOnsTerms";
import AlponaTrio from "@/components/sections/AlponaTrio";
import Crew from "@/components/sections/Crew";
import FilmsGrid from "@/components/sections/FilmsGrid";
import FilmStripGrid from "@/components/sections/FilmStripGrid";
import Footer from "@/components/sections/Footer";
import HeroCover from "@/components/sections/HeroCover";
import PortraitSplit from "@/components/sections/PortraitSplit";
import PortraitStack from "@/components/sections/PortraitStack";
import SanatanPackages from "@/components/sections/SanatanPackages";
import SlidingShowcase from "@/components/sections/SlidingShowcase";
import StandardPackages from "@/components/sections/StandardPackages";
import Storytelling from "@/components/sections/Storytelling";
import FloatingContact from "@/components/ui/FloatingContact";
import Navbar from "@/components/ui/Navbar";
import { getSiteContent } from "@/lib/site";
import { connection } from "next/server";
import { Suspense } from "react";

async function HomeContent() {
  // Always read fresh data, so admin edits show up right away.
  await connection();
  const c = await getSiteContent();

  return (
    <>
      <Navbar />
      <main>
        <HeroCover
          title={c.cover.title}
          subtitle={c.cover.subtitle}
          image={c.cover.image}
        />
        <PortraitSplit
          main={c.portraitSplit.main}
          cards={c.portraitSplit.cards}
        />
        <AlponaTrio circle={c.alponaTrio.circle} cards={c.alponaTrio.cards} />
        <FilmStripGrid
          banner={c.filmStrip.banner}
          columns={c.filmStrip.columns}
        />
        <SlidingShowcase items={c.slideshow} />
        <PortraitStack
          main={c.portraitStack.main}
          stack={c.portraitStack.stack}
        />
        <FilmsGrid films={c.films} />
        <Storytelling
          caption={c.storytelling.caption}
          video={c.storytelling.video}
          images={c.storytelling.images}
        />
        <StandardPackages packages={c.standardPackages} />
        <SanatanPackages packages={c.sanatanPackages} art={c.sanatanArt} />
        <AddOnsTerms addOns={c.addOns} terms={c.terms} />
        <Crew members={c.team} />
      </main>
      <Footer info={c.siteInfo} />
      <FloatingContact info={c.siteInfo} />
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-espresso" />}>
      <HomeContent />
    </Suspense>
  );
}
