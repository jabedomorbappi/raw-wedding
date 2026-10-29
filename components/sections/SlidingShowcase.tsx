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
  width: number; // Card width in vw (adjust independently)
  height: number; // Card height in vw (fixed independently of width)
  spacing: number; // Distance step for 45-degree diagonal movement in vw
}

// You can now change width and height separately without affecting each other!
const DESKTOP: Layout = { width: 48, height: 34, spacing: 40 };
const MOBILE: Layout = { width: 76, height: 50, spacing: 62 };

interface SlideProps {
  item: ImageItem;
  index: number;
  position: MotionValue<number>;
  layout: Layout;
}

function Slide({ item, index, position, layout }: SlideProps) {
  const { width, height, spacing } = layout;

  // 45-DEGREE DIAGONAL VECTOR PATH:
  // Synchronized x and y movement ensuring strict diagonal transition without awkward corner-cutting.
  const x = useTransform(position, (p) => `${(index - p) * spacing}vw`);

  const y = useTransform(position, (p) => {
    const diff = index - p;
    const direction = index % 2 === 0 ? -1 : 1;
    return `${direction * diff * spacing * 0.45}vw`;
  });

  // SCALE: Center image is commanding and large (1.0), side images are gracefully smaller (0.58)
  const scale = useTransform(position, (p) => {
    const distance = Math.abs(index - p);
    return Math.max(0.58, 1 - 0.42 * distance);
  });

  // OPACITY: Sharp visibility for active items, smooth fade for off-screen bounds
  const opacity = useTransform(position, (p) => {
    const distance = Math.abs(index - p);
    return Math.min(1, Math.max(0, (1.6 - distance) / 0.4));
  });

  // Z-INDEX: Keeps the active center focal item strictly on top
  const zIndex = useTransform(position, (p) =>
    Math.round(10 - Math.abs(index - p) * 2),
  );

  return (
    <motion.div
      className="absolute will-change-transform"
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
      <div className="h-full w-full overflow-hidden rounded-[2.8rem] shadow-2xl transition-shadow duration-300">
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
  intervalMs = 3200,
}: SlidingShowcaseProps) {
  const count = items.length;
  const minIdx = 1;
  const maxIdx = count - 2;

  const position = useMotionValue(minIdx);
  const indexRef = useRef(minIdx);
  const dirRef = useRef(1); // 1 = right-to-left flow, -1 = left-to-right flow
  const [paused, setPaused] = useState(false);
  const [layout, setLayout] = useState<Layout>(DESKTOP);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setLayout(mq.matches ? DESKTOP : MOBILE);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Smooth diagonal transition loop with cinematic easing
  useEffect(() => {
    if (paused || maxIdx <= minIdx) return;
    const timer = setInterval(() => {
      let next = indexRef.current + dirRef.current;
      if (next > maxIdx || next < minIdx) {
        dirRef.current = -dirRef.current; // Seamless reversal at bounds
        next = indexRef.current + dirRef.current;
      }
      indexRef.current = next;
      animate(position, next, {
        duration: 1.1,
        ease: [0.25, 1, 0.5, 1], // Custom smooth-out curve
      });
    }, intervalMs);
    return () => clearInterval(timer);
  }, [paused, maxIdx, intervalMs, position]);

  return (
    <section
      className="relative h-[100vw] w-full overflow-hidden bg-[#E6DED4] lg:h-[62vw] flex items-center justify-center"
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
