import SmartImage from "@/components/media/SmartImage";
import Reveal from "@/components/ui/Reveal";
import type { FilmItem } from "@/lib/content";
import { youtubeThumbnail } from "@/lib/youtube";
import { Link2, Play } from "lucide-react";

interface FilmsGridProps {
  films: FilmItem[];
}

const offsets = ["", "lg:mt-4", "lg:-mt-2"];

export default function FilmsGrid({ films }: FilmsGridProps) {
  return (
    <section
      id="films"
      className="w-full bg-[#E6DED4] px-4 py-16 sm:px-8 lg:px-14"
    >
      <h2 className="sr-only">Wedding films</h2>
      <div className="mx-auto grid max-w-[1680px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-8">
        {films.map((film, i) => {
          const thumb =
            film.thumbnail ?? youtubeThumbnail(film.youtubeUrl) ?? "";
          return (
            <Reveal
              key={film.title}
              delay={(i % 3) * 0.1}
              className={offsets[i % 3]}
            >
              <a
                href={film.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Watch ${film.title} on YouTube`}
                className="group relative block aspect-video overflow-hidden bg-black"
              >
                <SmartImage
                  src={thumb}
                  alt={film.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 top-0 flex items-center gap-3 bg-gradient-to-b from-black/70 to-transparent p-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0f2a22] text-[10px] font-bold tracking-wider text-white">
                    RAW
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-white sm:text-base">
                      {film.title}
                    </span>
                    <span className="block text-xs text-white/80">
                      RAW Weddings
                    </span>
                  </span>
                </div>
                <span className="absolute inset-0 m-auto flex h-12 w-[68px] items-center justify-center rounded-2xl bg-[#FF0033] shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Play size={24} fill="white" className="text-white" />
                </span>
                <span className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur">
                  <Link2 size={18} />
                </span>
                <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/55 px-4 py-2 text-xs text-white backdrop-blur sm:text-sm">
                  Watch on <strong className="font-bold">YouTube</strong>
                </span>
              </a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
