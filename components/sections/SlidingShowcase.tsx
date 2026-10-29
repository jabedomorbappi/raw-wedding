"use client";

import SmartImage from "@/components/media/SmartImage";
import type { ImageItem } from "@/lib/content";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Layout {
  width: number; // centre photo width (vw)
  spacing: number; // distance between photo centres (vw)
  rise: number; // how far photos sit above/below the middle line (vw)
}

const DESKTOP: Layout = { width: 24, spacing: 22, rise: 6 };
const MOBILE: Layout = { width: 46, spacing: 40, rise: 8 };

interface SlideProps {
  item: ImageItem;
  index: number;
  position: MotionValue<number>; // which photo is currently in the middle (can be fractional while sliding)
  layout: Layout;
}

function Slide({ item, index, position, layout }: SlideProps) {
  const { width, spacing, rise } = layout;
  const height = width * 1.25;
  const side = index % 2 === 0 ? -1 : 1; // even = upper, odd = lower

  const x = useTransform(position, (p) => `${(index - p) * spacing}vw`);
  const y = useTransform(position, (p) => {
    const d = Math.min(Math.abs(index - p), 1);
    return `${side * rise * (0.3 + 0.7 * d)}vw`;
  });
  const scale = useTransform(position, (p) =>
    Math.max(0.55, 1 - 0.28 * Math.abs(index - p)),
  );
  const opacity = useTransform(position, (p) => {
    const d = Math.abs(index - p);
    return Math.min(1, Math.max(0, (3 - d) / 0.8));
  });
  const zIndex = useTransform(position, (p) =>
    Math.round(10 - Math.abs(index - p) * 2),
  );

  return (
    <motion.div
      className="absolute"
      style={{
        left: "50%",
        top: "50%",
        width: `${width}vw`,
        height: `${height}vw`,
        marginLeft: `${-width / 2}vw`,
        marginTop: `${-height / 2}vw`,
        x,
        y,
        scale,
        opacity,
        zIndex,
        pointerEvents: "none",
      }}
    >
      <div className="h-full w-full overflow-hidden rounded-[2rem] shadow-2xl">
        <SmartImage
          src={item.src}
          alt={item.alt}
          priority
          className="h-full w-full object-cover"
        />
      </div>
    </motion.div>
  );
}

interface SlidingShowcaseProps {
  items: ImageItem[];
  intervalMs?: number;
}

export default function SlidingShowcase({
  items,
  intervalMs = 3000,
}: SlidingShowcaseProps) {
  const count = items.length;
  // Keep the middle photo away from the ends so both sides always have photos.
  const minIdx = Math.min(2, Math.floor((count - 1) / 2));
  const maxIdx = count - 1 - minIdx;

  const position = useMotionValue(minIdx);
  const indexRef = useRef(minIdx);
  const dirRef = useRef(1); // 1 = forward, -1 = backward
  const [paused, setPaused] = useState(false);
  const [layout, setLayout] = useState<Layout>(DESKTOP);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setLayout(mq.matches ? DESKTOP : MOBILE);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || maxIdx <= minIdx) return;
    const timer = setInterval(() => {
      let next = indexRef.current + dirRef.current;
      if (next > maxIdx || next < minIdx) {
        dirRef.current = -dirRef.current; // reverse at either end
        next = indexRef.current + dirRef.current;
      }
      indexRef.current = next;
      animate(position, next, { duration: 1.2, ease: [0.65, 0, 0.35, 1] });
    }, intervalMs);
    return () => clearInterval(timer);
  }, [paused, minIdx, maxIdx, intervalMs, position]);

  return (
    <section
      className="relative h-[88vw] w-full overflow-hidden bg-[#E6DED4] lg:h-[50vw]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {items.map((item, i) => (
        <Slide
          key={item.src}
          item={item}
          index={i}
          position={position}
          layout={layout}
        />
      ))}
    </section>
  );
}
