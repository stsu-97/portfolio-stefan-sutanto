"use client";

import { useState } from "react";
import Link from "next/link";
import { DocViewer } from "@/components/DocViewer";
import type { Project } from "@/lib/projects";

type TabType = "summary" | "brs" | "architecture";

export function ProjectDetailClient({ project }: { project: Project }) {
  const [activeTab, setActiveTab] = useState<TabType>("summary");

  const tabs: { id: TabType; label: string }[] = [
    { id: "summary", label: "Summary" },
    { id: "brs", label: "BRS" },
    { id: "architecture", label: "Architecture" },
  ];

  const getTabContent = () => {
    switch (activeTab) {
      case "summary":
        return project.summary || "No summary available.";
      case "brs":
        return (
          project.brsContent ||
          `# Business Requirements Specification

## Document Status: Pending

The comprehensive BRS document for this project is currently being prepared. It will include:

1. **Executive Summary** - Business problem, stakeholders, success criteria
2. **Business Context** - Domain analysis, market/industry background
3. **Functional Requirements** - Detailed feature specifications
4. **Non-Functional Requirements** - Performance, security, scalability
5. **Data Requirements** - Data sources, entities, relationships
6. **Integration Requirements** - APIs, third-party services
7. **Constraints & Assumptions** - Technical and business constraints
8. **Risk Analysis** - Identification and mitigation strategies
9. **Testing Strategy** - UAT scenarios, acceptance criteria

Please check back soon for the complete documentation.`
        );
      case "architecture":
        return (
          project.archContent ||
          `# Architecture Document

## Document Status: Pending

The detailed architecture document for this project is currently being prepared. It will include:

1. **System Overview** - High-level architecture diagram
2. **Component Architecture** - Modules, layers, responsibilities
3. **Data Architecture** - Database schema, data flow diagrams
4. **API Design** - Endpoint specifications
5. **Technology Stack Rationale** - Tool selection justification
6. **Deployment Architecture** - Infrastructure, hosting, CI/CD
7. **Security Considerations** - Authentication, authorization
8. **Scalability & Performance** - Load handling, optimization
9. **Diagrams** - Sequence diagrams, ERDs, flowcharts

Please check back soon for the complete documentation.`
        );
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center text-sm text-neutral-400 hover:text-white transition-colors mb-8"
        >
          ← Back to Projects
        </Link>

        {/* Project Header */}
        <header className="mb-8 pb-8 border-b border-neutral-800">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-blue-900/30 border border-blue-800 rounded-md text-sm text-blue-400">
              {project.domain}
            </span>
            <span className="px-3 py-1 bg-neutral-800 rounded-md text-sm text-neutral-400">
              {project.status === "completed" ? "Completed" : "In Progress"}
            </span>
            <span className="text-sm text-neutral-500">{project.date}</span>
          </div>

          <h1 className="text-4xl font-bold text-neutral-100 mb-4">
            {project.title}
          </h1>

          <p className="text-lg text-neutral-400 mb-6">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-md text-sm text-neutral-400"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-md text-sm text-neutral-300 hover:border-neutral-600 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            )}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm text-white transition-colors"
              >
                Live Demo →
              </a>
            )}
          </div>
        </header>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-neutral-900 p-1 rounded-lg w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-neutral-800 text-white"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <DocViewer content={getTabContent()} title={tabs.find(t => t.id === activeTab)?.label || "Content"} />
      </div>
    </main>
  );
}
