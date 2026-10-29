import Reveal from "@/components/ui/Reveal";
import RichText from "@/components/ui/RichText";

interface AddOnsTermsProps {
  addOns: string[];
  terms: string[];
}

export default function AddOnsTerms({ addOns, terms }: AddOnsTermsProps) {
  return (
    <section className="paper w-full border-t border-maroon/10">
      <div className="mx-auto grid max-w-[1680px] gap-12 px-6 py-16 md:grid-cols-2 lg:px-14">
        <Reveal className="text-center text-maroon">
          <h3 className="font-serif text-4xl font-bold">ADD-ONS</h3>
          <ul className="mt-8 space-y-4 text-lg lg:text-2xl">
            {addOns.map((item) => (
              <li key={item}>
                <RichText text={item} />
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15} className="text-maroon">
          <h3 className="mx-auto w-fit bg-[#E9B38A]/70 px-6 py-1 text-center font-serif text-3xl">
            Terms &amp; Conditions
          </h3>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-sm lg:text-base">
            {terms.map((term) => (
              <li key={term}>
                <RichText text={term} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
