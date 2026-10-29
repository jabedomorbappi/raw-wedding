import SmartImage from "@/components/media/SmartImage";
import Reveal from "@/components/ui/Reveal";
import type { ImageItem } from "@/lib/content";

interface AlponaTrioProps {
  circle: ImageItem;
  cards: ImageItem[];
}

const cardOffsets = ["lg:mt-44", "lg:mt-16", "lg:-mt-12"];

export default function AlponaTrio({ circle, cards }: AlponaTrioProps) {
  return (
    <section
      className="relative flex w-full flex-col overflow-hidden bg-[#EFEDEA] py-10 lg:min-h-screen lg:flex-row lg:items-center lg:py-0"
      style={{
        backgroundImage:
          "linear-gradient(45deg, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(-45deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
        backgroundSize: "180px 180px",
      }}
    >
      <Reveal className="-ml-[20vw] h-[70vw] w-[70vw] shrink-0 lg:-ml-[22vh] lg:h-[85vh] lg:w-[85vh]">
        <div className="h-full w-full overflow-hidden rounded-full shadow-2xl">
          <SmartImage
            src={circle.src}
            alt={circle.alt}
            className="h-full w-full object-cover"
          />
        </div>
      </Reveal>

      <div className="mt-8 grid flex-1 grid-cols-3 items-start gap-3 px-4 lg:mt-0 lg:gap-6 lg:pl-0 lg:pr-12">
        {cards.map((card, i) => (
          <Reveal
            key={card.src}
            delay={0.15 * (i + 1)}
            className={cardOffsets[i]}
          >
            <div className="aspect-[3/5] w-full overflow-hidden rounded-[2rem] shadow-xl">
              <SmartImage
                src={card.src}
                alt={card.alt}
                className="h-full w-full object-cover transition duration-300 hover:scale-105"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
