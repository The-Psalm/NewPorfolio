import SectionTitle from "../ui/SectionTitle";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { projects } from "../../data/projects";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function Projects() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="projects" className="py-24 bg-white px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Projects"
          subtitle="A selection of things I've built."
        />

        <div
          ref={ref}
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {projects.map((project) => (
            <Card key={project.id} hover className="flex flex-col">
              {/* Image placeholder */}
              <div className="w-full h-40 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                <span className="text-4xl">🖥️</span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">{project.description}</p>

              {/* Tech stack badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-medium bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-3 mt-5">
                {project.liveUrl && (
                  <Button href={project.liveUrl} size="sm">
                    Live Demo
                  </Button>
                )}
                {project.repoUrl && (
                  <Button href={project.repoUrl} size="sm" variant="outline">
                    GitHub
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

