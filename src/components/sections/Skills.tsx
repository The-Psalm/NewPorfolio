import SectionTitle from "../ui/SectionTitle";
import Card from "../ui/Card";
import { skills } from "../../data/skills";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const categoryLabels: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  tools: "Tools & Others",
};

export default function Skills() {
  const { ref, isVisible } = useScrollAnimation();

  const grouped = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-24 bg-gray-50 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Skills"
          subtitle="Technologies and tools I work with."
        />

        <div
          ref={ref}
          className={`grid md:grid-cols-3 gap-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {Object.entries(grouped).map(([category, categorySkills]) => (
            <Card key={category} hover>
              <h3 className="text-base font-semibold text-indigo-600 mb-5 uppercase tracking-wide">
                {categoryLabels[category] ?? category}
              </h3>
              <ul className="space-y-4">
                {categorySkills.map((skill) => (
                  <li key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                      <span className="text-xs text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className="bg-indigo-500 h-1.5 rounded-full transition-all duration-700"
                        style={{ width: isVisible ? `${skill.level}%` : "0%" }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

