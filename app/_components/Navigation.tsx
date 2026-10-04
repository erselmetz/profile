"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { profile } from "@/lib/profile";
import { ThemeToggle } from "@/app/_components/ThemeToggle";

export function Navigation() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  function closeSidebar() {
    setSidebarOpen(false);
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" onClick={closeSidebar} aria-label={`${profile.personal.name} home`}>
          <span className="brand-mark">EM</span>
          <span className="brand-name">{profile.personal.name}</span>
        </Link>
        <button
          className="mobile-menu-button"
          type="button"
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          aria-expanded={sidebarOpen}
          aria-controls="main-navigation"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <span aria-hidden="true">{sidebarOpen ? "×" : "☰"}</span>
        </button>
        <nav
          className={`main-navigation${sidebarOpen ? " is-open" : ""}`}
          id="main-navigation"
          aria-label="Main navigation"
        >
          <Link href="/" aria-current={pathname === "/" ? "page" : undefined} onClick={closeSidebar}>Home</Link>
          <Link href="/projects" aria-current={pathname === "/projects" ? "page" : undefined} onClick={closeSidebar}>Projects</Link>
          <Link href="/about" aria-current={pathname === "/about" ? "page" : undefined} onClick={closeSidebar}>About</Link>
          <a href={`${profile.social.github}?tab=repositories`} target="_blank" rel="noopener noreferrer" onClick={closeSidebar}>GitHub ↗</a>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
