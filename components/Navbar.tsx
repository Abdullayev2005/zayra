// components/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const NAV = [
  { id: "about", label: "Biz haqimizda" },
  { id: "services", label: "Xizmatlar" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Aloqa" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const linksRef = useRef<Record<string, HTMLAnchorElement | null>>({});

  // Scroll holati
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Aktiv bo‘lim treki
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      Boolean
    ) as HTMLElement[];
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Ekran kengaysa, drawer yopilsin
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Smooth scroll
  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50">
      <div
        className={[
          "transition-colors",
          scrolled
            ? "bg-black/65 backdrop-blur-md border-b border-white/10"
            : "bg-transparent border-transparent",
        ].join(" ")}
      >
        <nav className="mx-auto max-w-6xl h-16 px-5 flex items-center justify-between">
          {/* Brand (logo + text) */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png" // 🔥 public/logo.png
              alt="Zayra Logo"
              width={80}
              height={80}
              priority
            />
          </Link>

          {/* Linklar (desktop) */}
          <div className="hidden lg:flex items-center gap-6 text-[13px]">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={go(n.id)}
                className={[
                  "relative text-white/80 hover:text-white transition-colors",
                  "after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:scale-x-0 after:origin-left",
                  "after:bg-white/60 after:transition-transform hover:after:scale-x-100",
                  active === n.id ? "text-white after:scale-x-100" : "",
                ].join(" ")}
              >
                {n.label}
              </a>
            ))}
          </div>

          {/* CTA + burger (o‘ng) */}
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={go("contact")}
              className="hidden sm:inline-flex items-center rounded-lg px-3.5 py-2 text-xs font-medium border border-white/15 text-white/90 hover:bg-white/5 transition"
            >
              Biz bilan bog‘laning
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden p-2 rounded-md border border-white/10"
              aria-label="Menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  d="M4 7h16M4 12h16M4 17h16"
                />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="fixed top-0 right-0 z-50 h-full w-[82%] xs:w-3/4 sm:w-2/3 max-w-xs bg-[#0a0f16] border-l border-white/10">
            <div className="flex items-center justify-between h-16 px-5 border-b border-white/10">
              <span className="text-sm font-medium text-white/90">Menyu</span>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-md border border-white/10"
                aria-label="Yopish"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    d="M6 6l12 12M18 6L6 18"
                  />
                </svg>
              </button>
            </div>
            <div className="px-5 py-4 flex flex-col">
              {NAV.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={go(n.id)}
                  className={[
                    "rounded-md px-3 py-3 text-sm text-white/85 hover:bg-white/5 transition",
                    active === n.id ? "text-white" : "",
                  ].join(" ")}
                >
                  {n.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={go("contact")}
                className="mt-3 inline-flex items-center justify-center rounded-lg px-4 py-2 text-xs font-medium border border-white/15 text-white/90 hover:bg-white/5 transition"
              >
                Biz bilan bog‘laning
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
