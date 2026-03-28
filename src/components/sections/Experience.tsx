import SectionTitle from "../ui/SectionTitle";
import { experiences } from "../../data/experience";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function Experience() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="experience" className="py-24 bg-gray-50 px-4">
      <div className="max-w-3xl mx-auto">
        <SectionTitle
          title="Experience"
          subtitle="My professional journey so far."
        />

        <div
          ref={ref}
          className={`relative transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-indigo-100" />

          <ul className="space-y-10 pl-12">
            {experiences.map((exp) => (
              <li key={exp.id} className="relative">
                {/* Dot */}
                <span
                  className={`absolute -left-8 top-1.5 w-4 h-4 rounded-full border-2 border-indigo-500 ${
                    exp.current ? "bg-indigo-500" : "bg-white"
                  }`}
                />

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold text-gray-900">{exp.role}</h3>
                    {exp.current && (
                      <span className="text-xs font-medium bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-indigo-600 mb-1">{exp.company}</p>
                  <p className="text-xs text-gray-400 mb-3">{exp.period}</p>
                  <ul className="space-y-1.5">
                    {exp.description.map((point, i) => (
                      <li key={i} className="text-sm text-gray-600 flex gap-2">
                        <span className="text-indigo-400 mt-0.5">▸</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

