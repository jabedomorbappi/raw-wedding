"use client";

import {
  FacebookIcon,
  InstagramIcon,
  YouTubeIcon,
} from "@/components/ui/SocialIcons";
import { SiteInfo } from "@/lib/content";
import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";

const socialIcons: Record<string, ReactNode> = {
  Instagram: <InstagramIcon size={20} />,
  YouTube: <YouTubeIcon size={20} />,
  Facebook: <FacebookIcon size={20} />,
  WhatsApp: <MessageCircle size={20} />,
};

const fieldClass =
  "w-full border-b border-white/30 bg-transparent py-3 text-white outline-none transition-colors placeholder:text-white/50 focus:border-bronze";
interface FooterProps {
  info: SiteInfo;
}
export default function Footer({ info: siteInfo }: FooterProps) {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Later: send the form data to /api/contact (saved in the database).
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <footer
      id="contact"
      className="w-full bg-deepteal px-4 pt-20 text-white sm:px-8 lg:px-14"
    >
      <div className="mx-auto grid max-w-[1680px] gap-14 lg:grid-cols-2">
        <div>
          <p className="font-serif text-4xl lowercase tracking-wide">
            {siteInfo.brand}
          </p>
          <p className="mt-4 max-w-md text-sand">
            Experimental documentary wedding photography and cinematography in
            Chattogram.
          </p>

          <ul className="mt-10 space-y-5">
            <li className="flex items-center gap-4">
              <Mail size={20} className="shrink-0 text-bronze" />
              <a
                href={`mailto:${siteInfo.email}`}
                className="break-all hover:text-bronze"
              >
                {siteInfo.email}
              </a>
            </li>
            <li className="flex items-center gap-4">
              <Phone size={20} className="shrink-0 text-bronze" />
              <a
                href={`tel:${siteInfo.phone.replace(/\s|-/g, "")}`}
                className="hover:text-bronze"
              >
                {siteInfo.phone}
              </a>
            </li>
            <li className="flex items-start gap-4">
              <MapPin size={20} className="mt-0.5 shrink-0 text-bronze" />
              <span>{siteInfo.address}</span>
            </li>
          </ul>

          <div className="mt-10 flex gap-3">
            {siteInfo.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 transition-colors hover:border-bronze hover:bg-bronze"
              >
                {socialIcons[social.label]}
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="font-serif text-3xl">Get in touch</h2>
          <label className="block">
            <span className="sr-only">Name</span>
            <input
              type="text"
              name="name"
              required
              placeholder="Name"
              className={fieldClass}
            />
          </label>
          <label className="block">
            <span className="sr-only">Email address</span>
            <input
              type="email"
              name="email"
              required
              placeholder="Email address"
              className={fieldClass}
            />
          </label>
          <label className="block">
            <span className="sr-only">Leave a message</span>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Leave a message"
              className={`${fieldClass} resize-none`}
            />
          </label>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full border border-bronze px-8 py-3 text-sm uppercase tracking-[0.2em] transition-colors hover:bg-bronze"
          >
            Submit <Send size={16} />
          </button>
          {sent && (
            <p role="status" className="text-sm text-sand">
              Thank you. We will get back to you soon.
            </p>
          )}
        </form>
      </div>

      <div className="mx-auto mt-16 max-w-[1680px] border-t border-white/10 py-6 text-center text-xs tracking-wide text-sand">
        © RAW Weddings. All rights reserved.
      </div>
    </footer>
  );
}
