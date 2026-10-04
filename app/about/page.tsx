import type { Metadata } from "next";
import { getAboutMarkup } from "@/lib/legacy-content";
import { profile, siteUrl } from "@/lib/profile";

export const metadata: Metadata = {
  title: `About | ${profile.personal.name}`,
  description: `About ${profile.personal.name}, a Software Engineer building web applications, backend systems, and software tools.`,
  alternates: { canonical: `${siteUrl}/about` },
};

export default function AboutPage() {
  return (
    <main id="page-top" className="page-shell subpage-shell legacy-page">
      <section className="subpage-hero">
        <p className="eyebrow">THE PERSON BEHIND THE PROJECTS</p>
        <h1>About me<span className="accent-period">.</span></h1>
        <p>Software engineer, curious builder, and lifelong learner based in Rizal, Philippines.</p>
      </section>
      <div
        id="content"
        className="legacy-content"
        dangerouslySetInnerHTML={{ __html: getAboutMarkup() }}
      />
    </main>
  );
}
