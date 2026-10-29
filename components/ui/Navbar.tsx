"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Solid background after the page is scrolled a little.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Stop the page behind the mobile menu from scrolling.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the mobile menu with the Escape key.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const headerStyle =
    scrolled && !open
      ? "bg-espresso/90 py-3 shadow-lg backdrop-blur-md"
      : "bg-gradient-to-b from-black/60 to-transparent py-5";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${headerStyle}`}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex w-full max-w-[1680px] items-center justify-between px-4 sm:px-8 lg:px-14"
        >
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 text-white"
            onClick={() => setOpen(false)}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70 font-serif text-sm tracking-wider">
              RW
            </span>
            <span className="hidden text-xs uppercase tracking-[0.3em] sm:block">
              Raw Weddings
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative text-xs uppercase tracking-[0.2em] text-white/85 transition-colors hover:text-bronze after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-bronze after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="rounded-full border border-bronze px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-bronze"
              >
                Book Now
              </a>
            </li>
          </ul>

          {/* Mobile menu button */}
          <button
            type="button"
            className="p-2 text-white lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 bg-espresso lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-serif text-3xl uppercase tracking-wide text-white transition-colors hover:text-bronze"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 * i + 0.1 }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full border border-bronze px-8 py-3 text-sm uppercase tracking-[0.25em] text-white transition-colors hover:bg-bronze"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.08 * navLinks.length + 0.1,
              }}
            >
              Book Now
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
