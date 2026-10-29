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
import {
  addOns,
  alponaTrio,
  cover,
  films,
  filmStrip,
  portraitSplit,
  portraitStack,
  sanatanArt,
  sanatanPackages,
  slideshow,
  standardPackages,
  storytelling,
  team,
  terms,
} from "@/lib/content";

export default function Home() {
  return (
    <>
      <main>
        <HeroCover
          title={cover.title}
          subtitle={cover.subtitle}
          image={cover.image}
        />
        <PortraitSplit main={portraitSplit.main} cards={portraitSplit.cards} />
        <AlponaTrio circle={alponaTrio.circle} cards={alponaTrio.cards} />
        <FilmStripGrid banner={filmStrip.banner} columns={filmStrip.columns} />
        <SlidingShowcase items={slideshow} />
        <PortraitStack main={portraitStack.main} stack={portraitStack.stack} />
        <FilmsGrid films={films} />
        <Storytelling
          caption={storytelling.caption}
          video={storytelling.video}
          images={storytelling.images}
        />
        <StandardPackages packages={standardPackages} />
        <SanatanPackages packages={sanatanPackages} art={sanatanArt} />
        <AddOnsTerms addOns={addOns} terms={terms} />
        <Crew members={team} />
      </main>
      <Footer />
    </>
  );
}
