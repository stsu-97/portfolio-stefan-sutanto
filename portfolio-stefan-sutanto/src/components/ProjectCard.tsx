/**
 * Project Card Component
 */
interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  domain: string;
  slug: string;
}

export function ProjectCard({ title, description, techStack, domain, slug }: ProjectCardProps) {
  return (
    <article className="group p-6 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-neutral-600 transition-all hover:shadow-lg hover:shadow-blue-900/10">
      <h3 className="text-xl font-semibold text-neutral-100 mb-2 group-hover:text-blue-400 transition-colors">
        <a href={`/projects/${slug}`}>{title}</a>
      </h3>
      <p className="text-neutral-400 mb-4 line-clamp-3">{description}</p>

      {/* Domain Badge */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-blue-900/30 border border-blue-800 rounded-md text-xs text-blue-400">
          {domain}
        </span>
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-4">
        {techStack.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 bg-neutral-800 rounded text-xs text-neutral-400"
          >
            {tech}
          </span>
        ))}
        {techStack.length > 5 && (
          <span className="px-2 py-1 text-xs text-neutral-500">
            +{techStack.length - 5} more
          </span>
        )}
      </div>

      {/* Link */}
      <a
        href={`/projects/${slug}`}
        className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
      >
        View Details →
      </a>
    </article>
  );
}
