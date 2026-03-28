import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function About() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-24 bg-white px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="About Me"
          subtitle="A little background on who I am and what I do."
        />

        <div
          ref={ref}
          className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Image placeholder */}
          <div className="w-full aspect-square max-w-sm mx-auto rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
            <span className="text-8xl">🧑‍💻</span>
          </div>

          {/* Text content */}
          <div className="space-y-5">
            <h3 className="text-2xl font-bold text-gray-900">
              Hi, I'm <span className="text-indigo-600">Your Name</span>
            </h3>
            <p className="text-gray-600 leading-relaxed">
              I'm a passionate software developer with X years of experience building
              web applications. I love turning complex problems into simple, beautiful,
              and intuitive designs.
            </p>
            <p className="text-gray-600 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing
              to open source, or enjoying [your hobbies]. I'm always looking for new
              challenges and opportunities to grow.
            </p>

            {/* Quick facts */}
            <ul className="space-y-2 text-sm text-gray-600">
              <li><span className="font-semibold text-gray-800">Location:</span> Your City, Country</li>
              <li><span className="font-semibold text-gray-800">Education:</span> B.Sc. Computer Science, University Name</li>
              <li><span className="font-semibold text-gray-800">Available for:</span> Freelance &amp; Full-time roles</li>
            </ul>

            <Button href="/resume.pdf" variant="outline">
              Download Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

