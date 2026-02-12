/**
 * Hero Section - Personal introduction
 */
export function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Stefan Sutanto
        </h1>
        <p className="text-xl md:text-2xl text-neutral-400 mb-8">
          Business/System Analyst with Engineering Skills
        </p>

        {/* Skills Summary */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            "Business Analysis",
            "System Architecture",
            "Python",
            "React",
            "FastAPI",
            "Data Science",
            "Machine Learning",
          ].map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-full text-sm text-neutral-300"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="#projects"
          className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          View Projects
        </a>
      </div>
    </section>
  );
}
