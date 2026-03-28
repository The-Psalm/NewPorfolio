import { useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up to your preferred email/form service (e.g. Formspree, EmailJS)
    console.log("Form submitted:", form);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-white px-4">
      <div className="max-w-2xl mx-auto">
        <SectionTitle
          title="Get In Touch"
          subtitle="Have a project in mind or just want to say hi? I'd love to hear from you."
        />

        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {submitted ? (
            <div className="text-center py-12">
              <p className="text-2xl mb-2">🎉</p>
              <p className="text-lg font-semibold text-gray-900">Message sent!</p>
              <p className="text-gray-500 text-sm mt-1">
                Thanks for reaching out. I'll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or just say hello..."
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition resize-none"
                />
              </div>

              <Button type="submit" size="lg" className="w-full justify-center">
                Send Message
              </Button>
            </form>
          )}

          {/* Alternative contact */}
          <div className="mt-10 pt-8 border-t border-gray-100 text-center text-sm text-gray-500">
            Or reach me directly at{" "}
            <a
              href="mailto:you@example.com"
              className="text-indigo-600 font-medium hover:underline"
            >
              you@example.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

