import Button from "../ui/Button";
import { scrollToSection } from "../../lib/utils";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4"
    >
      <div className="text-center max-w-3xl mx-auto">
        {/* Avatar placeholder */}
        <div className="w-28 h-28 rounded-full bg-indigo-100 border-4 border-indigo-200 mx-auto mb-6 overflow-hidden flex items-center justify-center">
          <span className="text-4xl">👤</span>
        </div>

        <p className="text-indigo-600 font-semibold tracking-widest text-sm uppercase mb-3">
          Hello, I'm
        </p>
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight">
          Your Name
        </h1>
        <p className="mt-4 text-xl text-gray-500 font-medium">
          Full-Stack Developer &amp; UI Enthusiast
        </p>
        <p className="mt-6 text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
          I build clean, performant, and accessible web applications. Passionate
          about great user experiences and writing maintainable code.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" onClick={() => scrollToSection("projects")}>
            View My Work
          </Button>
          <Button size="lg" variant="outline" onClick={() => scrollToSection("contact")}>
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  );
}

