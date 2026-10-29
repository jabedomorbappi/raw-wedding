import SmartImage from "@/components/media/SmartImage";
import Reveal from "@/components/ui/Reveal";
import type { TeamMember } from "@/lib/content";

interface CrewProps {
  members: TeamMember[];
}

export default function Crew({ members }: CrewProps) {
  return (
    <section
      id="crew"
      className="w-full bg-deepteal px-4 py-20 text-white lg:px-14"
    >
      <div className="mx-auto max-w-[1680px]">
        <Reveal className="text-center">
          <p className="font-serif text-xl text-sand">The Crew</p>
          <h2 className="mt-2 font-serif text-4xl lg:text-5xl">
            Behind the Lens
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 lg:grid-cols-5">
          {members.map((member, i) => (
            <Reveal
              key={member.name}
              delay={(i % 5) * 0.08}
              className="text-center"
            >
              <div className="mx-auto aspect-square w-full max-w-[200px] overflow-hidden rounded-full">
                <SmartImage
                  src={member.photo.src}
                  alt={member.photo.alt}
                  className="h-full w-full object-cover grayscale transition duration-500 hover:scale-105 hover:grayscale-0"
                />
              </div>
              <h3 className="mt-5 font-serif text-3xl">{member.name}</h3>
              <p className="mx-auto mt-1 max-w-[16ch] text-base text-sand">
                {member.role}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
