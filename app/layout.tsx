import type { Metadata } from "next";
import Link from "next/link";
import "./../css/style.css";
import { Navigation } from "@/app/_components/Navigation";
import { SiteInteractions } from "@/app/_components/SiteInteractions";
import { profile, siteUrl } from "@/lib/profile";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.personal.name} | Software Engineer in Rizal, Philippines`,
  description: profile.personal.bio,
  authors: [{ name: profile.personal.name }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: `${profile.personal.name} | Software Engineer`,
    title: `${profile.personal.name} | Software Engineer in Rizal, Philippines`,
    description: profile.personal.bio,
    images: ["/img/profile.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.personal.name} | Software Engineer in Rizal, Philippines`,
    description: profile.personal.bio,
    images: ["/img/profile.jpg"],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.personal.name,
    jobTitle: profile.personal.profession,
    email: profile.personal.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.personal.city,
      addressCountry: profile.personal.country,
    },
    url: siteUrl,
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${profile.personal.name} - Portfolio`,
    url: siteUrl,
  };

  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="color-scheme" content="dark light" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var t=localStorage.getItem("portfolio-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}',
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <Navigation />
        {children}
        <div className="w3-main" style={{ marginLeft: 250 }}>
          <footer id="myFooter">
            <div className="site-footer">
              <Link href="/" className="brand footer-brand">
                <span className="brand-mark">EM</span>
                <span className="brand-name">{profile.personal.name}</span>
              </Link>
              <p>Building useful things, one thoughtful detail at a time.</p>
              <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="footer-github">
                Find me on GitHub <span aria-hidden="true">↗</span>
              </a>
              <span className="footer-copy">© {new Date().getFullYear()} {profile.personal.name}</span>
            </div>
          </footer>
        </div>
        <SiteInteractions
          emailConfiguration={{
            publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
            serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          }}
        />
      </body>
    </html>
  );
}
