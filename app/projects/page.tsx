import type { Metadata } from "next";
import { ProjectCard } from "@/app/_components/ProjectCard";
import { projects } from "@/lib/projects";
import { profile, siteUrl } from "@/lib/profile";

export const metadata: Metadata = {
  title: `Projects | ${profile.personal.name}`,
  description: `Software, systems, and experiments by ${profile.personal.name}.`,
  alternates: { canonical: `${siteUrl}/projects` },
};

export default function ProjectsPage() {
  return (
    <main id="page-top" className="page-shell subpage-shell">
      <section className="subpage-hero">
        <p className="eyebrow">SELECTED WORK & EXPERIMENTS</p>
        <h1>Projects<span className="accent-period">.</span></h1>
        <p>A mix of shipped tools, software systems, and experiments from my journey as an engineer.</p>
      </section>
      <section className="content-section projects-section" aria-label="Projects">
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.repository} project={project} />
          ))}
        </div>
        <div className="github-more">
          <p>More experiments and repositories on GitHub.</p>
          <a className="button button-secondary" href={`${profile.social.github}?tab=repositories`} target="_blank" rel="noopener noreferrer">
            Browse all repositories <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
