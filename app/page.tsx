import AlponaTrio from "@/components/sections/AlponaTrio";
import FilmStripGrid from "@/components/sections/FilmStripGrid";
import HeroCover from "@/components/sections/HeroCover";
import PortraitSplit from "@/components/sections/PortraitSplit";
import SlidingShowcase from "@/components/sections/SlidingShowcase";
import {
  alponaTrio,
  cover,
  filmStrip,
  portraitSplit,
  slideshow,
} from "@/lib/content";

export default function Home() {
  return (
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
    </main>
  );
}
