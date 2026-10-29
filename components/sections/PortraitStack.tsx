import SmartImage from "@/components/media/SmartImage";
import Reveal from "@/components/ui/Reveal";
import type { ImageItem } from "@/lib/content";

interface PortraitStackProps {
  main: ImageItem;
  stack: ImageItem[];
}

export default function PortraitStack({ main, stack }: PortraitStackProps) {
  return (
    <section className="grid w-full lg:grid-cols-2">
      <div className="h-[80vh] lg:h-auto lg:min-h-screen">
        <SmartImage
          src={main.src}
          alt={main.alt}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-12 bg-[#E6DED4] px-6 py-16 lg:gap-16">
        {stack.map((item, i) => (
          <Reveal
            key={item.src}
            delay={i * 0.1}
            className="w-full max-w-[430px]"
          >
            <SmartImage
              src={item.src}
              alt={item.alt}
              className="aspect-[5/3] w-full object-cover shadow-xl"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
