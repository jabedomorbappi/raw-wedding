"use client";

import SmartImage from "@/components/media/SmartImage";
import type { ImageItem } from "@/lib/content";
import { motion } from "framer-motion";

interface PortraitSplitProps {
  main: ImageItem;
  cards: ImageItem[];
}

const cardLayout = [
  { pos: "left-[6%] top-[2%] w-[50%]", rotate: -8 },
  { pos: "left-[26%] top-[32%] w-[56%]", rotate: 9 },
  { pos: "left-[8%] top-[66%] w-[48%]", rotate: -6 },
];

export default function PortraitSplit({ main, cards }: PortraitSplitProps) {
  return (
    <section className="grid w-full lg:min-h-screen lg:grid-cols-[1.4fr_1fr]">
      <div className="relative h-[70vh] lg:h-auto">
        <SmartImage
          src={main.src}
          alt={main.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white/30" />
      </div>

      <div className="relative min-h-[640px] overflow-hidden bg-[#E6DED4]">
        {cards.map((card, i) => (
          <motion.div
            key={card.src}
            className={`absolute aspect-[3/4] ${cardLayout[i].pos}`}
            initial={{ opacity: 0, y: 50, rotate: cardLayout[i].rotate }}
            whileInView={{ opacity: 1, y: 0, rotate: cardLayout[i].rotate }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
          >
            <div className="h-full w-full overflow-hidden rounded-3xl shadow-xl">
              <SmartImage
                src={card.src}
                alt={card.alt}
                className="h-full w-full object-cover transition duration-300 hover:scale-105"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
