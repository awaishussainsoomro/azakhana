"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Nohakhans", href: "/nohakhans" },
  { label: "Munasabat", href: "/munasabat" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 px-4 pt-4">
      <nav className="flex items-center justify-between px-5 py-3 max-w-5xl mx-auto rounded-2xl border border-border bg-bg/70 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="AzaKhana" className="w-7 h-7 object-contain" />
          <span className="text-base font-semibold text-text-primary">
            AzaKhana
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7 text-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? "relative text-text-primary after:absolute after:-bottom-0.5 after:left-0 after:right-0 after:h-0.5 after:bg-accent after:rounded-full"
                    : "text-text-secondary hover:text-text-primary transition-colors"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/search"
            aria-label="Search"
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            className="md:hidden flex flex-col gap-1"
          >
            <span className="w-4.5 h-0.5 bg-text-primary rounded-full" />
            <span className="w-4.5 h-0.5 bg-text-primary rounded-full" />
            <span className="w-4.5 h-0.5 bg-text-primary rounded-full" />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden max-w-5xl mx-auto mt-2 rounded-2xl border border-border bg-bg/95 backdrop-blur-md overflow-hidden">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={
                  isActive
                    ? "block px-5 py-3 text-sm text-text-primary border-l-2 border-accent bg-surface"
                    : "block px-5 py-3 text-sm text-text-secondary border-l-2 border-transparent"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}