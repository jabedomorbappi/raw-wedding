import SmartImage from "@/components/media/SmartImage";
import Reveal from "@/components/ui/Reveal";
import RichText from "@/components/ui/RichText";
import type { ImageItem, SanatanPackage } from "@/lib/content";

interface SanatanPackagesProps {
  packages: SanatanPackage[];
  art: ImageItem;
}

export default function SanatanPackages({
  packages,
  art,
}: SanatanPackagesProps) {
  return (
    <section className="paper w-full border-t border-maroon/10 px-4 py-14 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-[1680px] gap-12 lg:grid-cols-[0.8fr_1fr_1fr]">
        <Reveal className="flex flex-col items-center gap-8 text-center">
          <div>
            <p className="text-5xl font-extrabold tracking-wide text-[#C4161C]">
              Sanatan
            </p>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-charcoal/80">
              Wedding Packages
            </p>
          </div>
          <div className="w-full max-w-[300px] border-[10px] border-[#E2B7B7] bg-[#FBF1E4] p-3">
            <SmartImage
              src={art.src}
              alt={art.alt}
              className="aspect-[3/4] w-full object-cover"
            />
            <p className="mt-2 font-serif text-2xl text-[#D4A5A5]">
              Raw Weddings
            </p>
          </div>
        </Reveal>

        {packages.map((pkg, i) => (
          <Reveal
            key={pkg.name}
            delay={0.12 * (i + 1)}
            className="flex flex-col text-center text-maroon"
          >
            <h3 className="font-serif text-4xl lg:text-5xl">{pkg.name}</h3>

            <div className="mt-6 space-y-3">
              {pkg.schedule.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[1fr_auto] gap-2"
                >
                  <div className="rounded-t-[2rem] rounded-b-lg bg-cocoa px-4 py-3 text-white">
                    <p className="font-serif text-base leading-tight lg:text-lg">
                      {row.label}
                    </p>
                    <p className="text-[11px] lg:text-xs">{row.crew}</p>
                  </div>
                  <div className="flex min-w-[96px] flex-col justify-center rounded-lg bg-cocoa px-3 py-3 text-white">
                    <p className="font-serif text-base">{row.duration}</p>
                    <p className="text-xs">(continual)</p>
                  </div>
                </div>
              ))}
            </div>

            <h4 className="mt-6 text-sm font-bold tracking-wide">SERVICES</h4>
            <ul className="mt-3 space-y-1 text-sm">
              {pkg.services.map((service) => (
                <li key={service}>
                  <RichText text={service} />
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <p className="mx-auto w-fit rounded-lg bg-cocoa px-10 py-4 font-serif text-2xl text-white">
                BDT {pkg.priceBdt.toLocaleString("en-US")} tk
              </p>
              <p className="mt-4 text-xs font-bold">{pkg.note}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
