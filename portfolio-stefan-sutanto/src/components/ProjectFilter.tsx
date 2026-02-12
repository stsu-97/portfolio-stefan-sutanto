"use client";

/**
 * Project Filter Component
 */
interface ProjectFilterProps {
  availableTech: string[];
  availableDomains: string[];
  selectedTech: string[];
  selectedDomains: string[];
  onTechToggle: (tech: string) => void;
  onDomainToggle: (domain: string) => void;
  onClearAll: () => void;
}

export function ProjectFilter({
  availableTech,
  availableDomains,
  selectedTech,
  selectedDomains,
  onTechToggle,
  onDomainToggle,
  onClearAll,
}: ProjectFilterProps) {
  return (
    <div className="sticky top-4 z-10 p-4 bg-neutral-900/95 backdrop-blur border border-neutral-800 rounded-xl mb-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h2 className="text-lg font-semibold text-neutral-200">Filter Projects</h2>

        {selectedTech.length > 0 || selectedDomains.length > 0 ? (
          <button
            onClick={onClearAll}
            className="px-3 py-1 text-sm text-neutral-400 hover:text-white transition-colors"
          >
            Clear All ({selectedTech.length + selectedDomains.length})
          </button>
        ) : null}
      </div>

      {/* Domain Filter */}
      <div className="mb-4">
        <label className="block text-sm text-neutral-500 mb-2">Domain</label>
        <div className="flex flex-wrap gap-2">
          {availableDomains.map((domain) => (
            <button
              key={domain}
              onClick={() => onDomainToggle(domain)}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                selectedDomains.includes(domain)
                  ? "bg-blue-600 text-white"
                  : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
              }`}
            >
              {domain}
            </button>
          ))}
        </div>
      </div>

      {/* Tech Stack Filter */}
      <div>
        <label className="block text-sm text-neutral-500 mb-2">Technology</label>
        <div className="flex flex-wrap gap-2">
          {availableTech.map((tech) => (
            <button
              key={tech}
              onClick={() => onTechToggle(tech)}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                selectedTech.includes(tech)
                  ? "bg-blue-600 text-white"
                  : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
