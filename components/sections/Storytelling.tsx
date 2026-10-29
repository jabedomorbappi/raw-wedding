import SmartImage from "@/components/media/SmartImage";
import Reveal from "@/components/ui/Reveal";
import type { ImageItem } from "@/lib/content";
import { Play } from "lucide-react";

interface StorytellingProps {
  caption: string;
  video: { thumbnail: string; youtubeUrl: string };
  images: ImageItem[];
}

export default function Storytelling({
  caption,
  video,
  images,
}: StorytellingProps) {
  return (
    <section className="grid w-full gap-10 bg-[#E6DED4] px-4 py-16 sm:px-8 lg:grid-cols-2 lg:px-14">
      <Reveal className="lg:pt-0">
        <a
          href={video.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Watch the film on YouTube"
          className="group relative block aspect-[4/3] w-full max-w-[600px] overflow-hidden shadow-[12px_14px_0_rgba(0,0,0,0.28)]"
        >
          <SmartImage
            src={video.thumbnail}
            alt={caption}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
          <p className="absolute left-5 top-5 max-w-[12ch] font-serif text-3xl leading-tight text-white sm:text-4xl">
            {caption}
          </p>
          <span className="absolute inset-0 m-auto flex h-14 w-20 items-center justify-center rounded-2xl bg-[#FF0033] shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Play size={26} fill="white" className="text-white" />
          </span>
          <span className="absolute bottom-3 right-4 font-serif text-sm tracking-widest text-white/80">
            RAW
          </span>
        </a>
      </Reveal>

      <div className="flex flex-col gap-8 bg-white p-6 lg:mr-[5%] lg:p-8">
        {images.map((item, i) => (
          <Reveal key={item.src} delay={i * 0.12}>
            <SmartImage
              src={item.src}
              alt={item.alt}
              className="aspect-[3/2] w-full object-cover"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
