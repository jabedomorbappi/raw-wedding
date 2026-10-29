"use client";

import SmartImage from "@/components/media/SmartImage";
import type { ImageItem } from "@/lib/content";
import { motion } from "framer-motion";

interface HeroCoverProps {
  title: string;
  subtitle: string;
  image: ImageItem;
}

export default function HeroCover({ title, subtitle, image }: HeroCoverProps) {
  return (
    <section
      id="home"
      className="relative h-screen min-h-[600px] w-full overflow-hidden bg-espresso"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
      >
        <SmartImage
          src={image.src}
          alt={image.alt}
          priority
          className="h-full w-full object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70" />
      <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.7)]" />

      <motion.h1
        className="absolute inset-x-0 top-6 text-center font-serif text-4xl font-bold uppercase tracking-wide text-white/80 sm:text-6xl lg:text-7xl"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {title}
      </motion.h1>

      <motion.p
        className="absolute inset-x-0 bottom-8 px-4 text-center text-xs uppercase tracking-widest2 text-white/70 sm:text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        {subtitle}
      </motion.p>
    </section>
  );
}
