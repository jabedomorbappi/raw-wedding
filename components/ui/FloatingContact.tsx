import { FacebookIcon } from "@/components/ui/SocialIcons";
import type { SiteInfo } from "@/lib/content";
import { MessageCircle } from "lucide-react";

interface FloatingContactProps {
  info: SiteInfo;
}

export default function FloatingContact({ info }: FloatingContactProps) {
  const whatsapp = info.socials.find((s) => s.label === "WhatsApp");
  const facebook = info.socials.find((s) => s.label === "Facebook");

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      {facebook && (
        <a
          href={facebook.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message us on Facebook"
          className="flex h-13 w-13 items-center justify-center rounded-full bg-[#1877F2] p-3.5 text-white shadow-lg transition-transform hover:scale-110"
        >
          <FacebookIcon size={24} />
        </a>
      )}
      {whatsapp && (
        <a
          href={whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="flex items-center justify-center rounded-full bg-[#25D366] p-3.5 text-white shadow-lg transition-transform hover:scale-110"
        >
          <MessageCircle size={24} />
        </a>
      )}
    </div>
  );
}
