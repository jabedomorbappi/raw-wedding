import Reveal from "@/components/ui/Reveal";
import RichText from "@/components/ui/RichText";
import type { StandardPackage } from "@/lib/content";

interface StandardPackagesProps {
  packages: StandardPackage[];
}

export default function StandardPackages({ packages }: StandardPackagesProps) {
  return (
    <section id="packages" className="paper w-full">
      <div className="grid md:grid-cols-3 md:divide-x md:divide-maroon/10">
        {packages.map((pkg, i) => {
          const compact = pkg.features.length > 8;
          return (
            <Reveal
              key={pkg.name}
              delay={i * 0.12}
              className="relative flex flex-col px-6 py-14 text-center text-maroon lg:px-10"
            >
              <h3 className="font-serif text-4xl lg:text-5xl">{pkg.name}</h3>

              <ul
                className={`mt-8 ${
                  compact
                    ? "space-y-4 text-sm lg:text-base"
                    : "space-y-3 text-lg lg:text-xl"
                }`}
              >
                {pkg.features.map((feature) => (
                  <li key={feature}>
                    <RichText text={feature} />
                  </li>
                ))}
              </ul>

              {pkg.services.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-sm font-bold tracking-wide">SERVICES</h4>
                  <ul className="mx-auto mt-3 max-w-xs space-y-1 text-sm">
                    {pkg.services.map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-auto pt-12">
                <div className="mx-auto w-40 border-t border-maroon" />
                <p className="mt-2 font-serif text-4xl lg:text-5xl">
                  BDT {pkg.priceBdt.toLocaleString("en-US")}
                </p>
              </div>

              <span className="pointer-events-none absolute bottom-24 right-3 rotate-180 text-sm text-maroon/40 [writing-mode:vertical-rl]">
                Raw Weddings
              </span>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
