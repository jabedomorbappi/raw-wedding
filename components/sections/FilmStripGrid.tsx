import SmartImage from "@/components/media/SmartImage";
import Reveal from "@/components/ui/Reveal";
import type { ImageItem } from "@/lib/content";

interface FilmStripGridProps {
  banner: ImageItem;
  columns: ImageItem[][];
}

const columnOffsets = [
  "mt-10",
  "mt-0",
  "mt-24",
  "mt-5",
  "mt-16",
  "mt-0",
  "mt-12",
  "mt-8",
];

export default function FilmStripGrid({ banner, columns }: FilmStripGridProps) {
  return (
    <section className="w-full bg-[#E6DED4]">
      <div className="relative h-[55vh] w-full">
        <SmartImage
          src={banner.src}
          alt={banner.alt}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#E6DED4]" />
      </div>

      <div className="-mt-10 flex gap-2 overflow-x-auto px-4 pb-24 lg:justify-center lg:overflow-visible">
        {columns.map((column, c) => (
          <Reveal
            key={c}
            delay={c * 0.08}
            className={`flex w-28 shrink-0 flex-col gap-2 lg:w-[10.5vw] ${columnOffsets[c]}`}
          >
            {column.map((item) => (
              <div
                key={item.src}
                className="border-[3px] border-black bg-black"
              >
                <SmartImage
                  src={item.src}
                  alt={item.alt}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            ))}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
