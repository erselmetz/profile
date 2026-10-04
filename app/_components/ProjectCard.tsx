import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card reveal">
      <div className="project-card-topline">
        <span className="project-symbol" aria-hidden="true">{project.language.slice(0, 2).toUpperCase()}</span>
        <span className="project-category">{project.category}</span>
        {project.featured && <span className="featured-badge">Selected</span>}
      </div>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <div className="project-tags">
        {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <div className="project-card-footer">
        <span className="project-language"><i aria-hidden="true" />{project.language}</span>
        <div className="project-links">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              Live <span aria-hidden="true">↗</span>
            </a>
          )}
          <a href={`https://github.com/erselmetz/${project.repository}`} target="_blank" rel="noopener noreferrer">
            Source <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}
