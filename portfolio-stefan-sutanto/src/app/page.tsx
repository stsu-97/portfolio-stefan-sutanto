import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stefan Sutanto - Business/System Analyst",
  description:
    "Portfolio of Stefan Sutanto, a Business/System Analyst with engineering skills specializing in full-stack development, data science, and machine learning.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <Hero />

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-neutral-100 mb-4 text-center">
            Projects
          </h2>
          <p className="text-neutral-400 mb-12 text-center max-w-2xl mx-auto">
            A selection of projects showcasing my expertise in business
            analysis, system architecture, and software development.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                description={project.description}
                techStack={project.techStack}
                domain={project.domain}
                slug={project.slug}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 text-center text-neutral-500 text-sm">
          <p>© 2025 Stefan Sutanto. Built with Next.js and Tailwind CSS.</p>
        </div>
      </footer>
    </main>
  );
}
