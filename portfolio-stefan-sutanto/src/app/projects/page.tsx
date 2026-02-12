"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectFilter } from "@/components/ProjectFilter";
import {
  getAllTechStacks,
  getAllDomains,
  filterProjects,
  type Project,
} from "@/lib/projects";
import Link from "next/link";

export default function ProjectsPage() {
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

  const availableTech = getAllTechStacks();
  const availableDomains = getAllDomains();

  const filteredProjects = filterProjects(selectedTech, selectedDomains);

  const handleTechToggle = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech)
        ? prev.filter((t) => t !== tech)
        : [...prev, tech]
    );
  };

  const handleDomainToggle = (domain: string) => {
    setSelectedDomains((prev) =>
      prev.includes(domain)
        ? prev.filter((d) => d !== domain)
        : [...prev, domain]
    );
  };

  const handleClearAll = () => {
    setSelectedTech([]);
    setSelectedDomains([]);
  };

  return (
    <main className="min-h-screen bg-neutral-950 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-neutral-400 hover:text-white transition-colors mb-4"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-neutral-100 mb-4">
            All Projects
          </h1>
          <p className="text-neutral-400 max-w-2xl">
            Browse through my portfolio of projects. Filter by technology
            stack or domain to find what interests you.
          </p>
        </div>

        {/* Filter */}
        <ProjectFilter
          availableTech={availableTech}
          availableDomains={availableDomains}
          selectedTech={selectedTech}
          selectedDomains={selectedDomains}
          onTechToggle={handleTechToggle}
          onDomainToggle={handleDomainToggle}
          onClearAll={handleClearAll}
        />

        {/* Results Count */}
        <p className="text-neutral-500 mb-6">
          Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
        </p>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
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
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-500">
              No projects match your filters. Try adjusting your selection.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
