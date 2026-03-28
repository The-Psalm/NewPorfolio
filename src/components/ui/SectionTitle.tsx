interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionTitle({
  title,
  subtitle,
  centered = true,
}: SectionTitleProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">{subtitle}</p>
      )}
      <div className={`mt-4 h-1 w-16 bg-indigo-600 rounded-full ${centered ? "mx-auto" : ""}`} />
    </div>
  );
}

