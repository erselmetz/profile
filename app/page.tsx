import Link from "next/link";
import { AmbientCanvas } from "@/app/_components/AmbientCanvas";
import { ProjectCard } from "@/app/_components/ProjectCard";
import { featuredProjects } from "@/lib/projects";
import { profile } from "@/lib/profile";

export default function HomePage() {
  return (
    <main id="page-top" className="page-shell">
      <section className="hero-section">
        <AmbientCanvas />
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> SOFTWARE ENGINEER <span className="eyebrow-divider">/</span> RIZAL, PH</p>
          <h1>
            I build software<br />
            that <span className="gradient-text">moves ideas forward.</span>
          </h1>
          <p className="hero-description">
            Hey, I&apos;m <strong>{profile.personal.name}</strong> — an engineer working across
            web, backend, AI systems, and desktop tools. I like turning complex challenges
            into clear, useful products. I use AI to support my development workflow, from
            research and debugging to faster iteration.
          </p>
          <div className="hero-actions">
            <Link href="/projects" className="button button-primary">Explore my work <span aria-hidden="true">↗</span></Link>
            <Link href="/about#contact" className="button button-quiet">Let&apos;s connect <span aria-hidden="true">→</span></Link>
          </div>
          <div className="hero-meta">
            <span>PHP · Python · C# · JavaScript</span>
            <a href={profile.social.github} target="_blank" rel="noopener noreferrer">github.com/erselmetz ↗</a>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <div className="visual-core">
            <span>EM</span>
            <i />
          </div>
          <span className="orbit-label label-code">&lt;code /&gt;</span>
          <span className="orbit-label label-build">BUILD · LEARN · SHIP</span>
        </div>
        <a className="scroll-cue" href="#selected-work"><span /> Scroll to explore</a>
      </section>

      <section className="ai-workflow" aria-label="AI-assisted development workflow">
        <span className="ai-workflow-mark" aria-hidden="true">AI</span>
        <div>
          <p className="eyebrow">AI-ASSISTED, ENGINEER-LED</p>
          <p>
            I use AI tools to research, debug, and iterate faster — then review, test,
            and take responsibility for the software I build.
          </p>
        </div>
        <span className="workflow-steps">THINK <i>→</i> BUILD <i>→</i> VERIFY</span>
      </section>

      <section className="content-section selected-work" id="selected-work">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A FEW THINGS I&apos;VE BUILT</p>
            <h2>Selected work<span className="accent-period">.</span></h2>
          </div>
          <Link href="/projects" className="text-link">All projects <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="project-grid featured-grid">
          {featuredProjects.slice(0, 3).map((project) => (
            <ProjectCard key={project.repository} project={project} />
          ))}
        </div>
      </section>

      <section className="closing-banner">
        <p className="eyebrow">HAVE A PROJECT IN MIND?</p>
        <h2>Let&apos;s make something<br /><span className="gradient-text">meaningful.</span></h2>
        <Link href="/about#contact" className="button button-primary">Get in touch <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
