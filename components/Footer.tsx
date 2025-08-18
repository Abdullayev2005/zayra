"use client";

import Image from "next/image";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: bu yerda haqiqiy APIga yuborasiz (fetch / action)
    alert("Subscribed!"); // vaqtincha
    setEmail("");
  }

  return (
    <footer className="border-t border-white/10 bg-transparent">
      {/* Upper */}
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-12">
        <div className="grid gap-10 lg:gap-12 md:grid-cols-4">
          {/* Brand + Founder + Social */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Zayra"
                width={70}
                height={70}
                className="rounded"
                priority
              />
            </div>

            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              Premium segment uchun enterprise darajadagi texnologik hamkor.
            </p>

            <p className="mt-3 text-xs text-white/60">
              Founder:{" "}
              <a
                href="https://ozodbek-abdullayev.uz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline"
              >
                Ozodbek Abdullayev
              </a>
            </p>

            {/* Socials */}
            <div className="mt-5 flex gap-3">
              <a
                aria-label="Telegram"
                href="https://t.me/zayra_uz_company"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg ring-1 ring-white/10 hover:ring-white/20 transition"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/80">
                  <path
                    fill="currentColor"
                    d="M9.84 15.54l-.15 3.06c.21 0 .3-.09.41-.2l1.97-1.89 4.09 3c.75.41 1.28.2 1.48-.69l2.68-12.6v-.01c.24-1.11-.4-1.54-1.12-1.27L2.24 9.74c-1.09.42-1.07 1.01-.19 1.27l4.63 1.44 10.77-6.78c.51-.32.98-.14.6.18"
                  />
                </svg>
              </a>
              {/* <a
                aria-label="LinkedIn"
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg ring-1 ring-white/10 hover:ring-white/20 transition"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/80">
                  <path
                    fill="currentColor"
                    d="M6.94 6.5A1.94 1.94 0 1 1 3.06 6.5a1.94 1.94 0 0 1 3.88 0zM4 8.89h4v10.61H4zM14.6 8.78c-2.02 0-3.02 1.11-3.53 1.89V8.89H7.2V19.5h3.88v-5.7c0-1.51.67-2.41 1.94-2.41 1.17 0 1.73.83 1.73 2.41v5.7h3.88v-6.39c0-3.23-1.72-4.73-4.03-4.73z"
                  />
                </svg>
              </a> */}
              <a
                aria-label="X (Twitter)"
                href="https://x.com/Zayra_uz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg ring-1 ring-white/10 hover:ring-white/20 transition"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/80">
                  <path
                    fill="currentColor"
                    d="M20.06 3H16.9l-3.7 5.21L8.3 3H3.94l6.03 8.38L3.7 21h3.18l4.11-5.77L15.3 21h4.36l-6.43-8.94L20.06 3z"
                  />
                </svg>
              </a>
              <a
                aria-label="Instagram"
                href="https://www.instagram.com/zayra.uz/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg ring-1 ring-white/10 hover:ring-white/20 transition"
              >
                <svg
                  className="h-5 w-5 text-white/80"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10 5 5 0 000-10zm6.5-2a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
              </a>

              {/* <a
                aria-label="GitHub"
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg ring-1 ring-white/10 hover:ring-white/20 transition"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/80">
                  <path
                    fill="currentColor"
                    d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.14-1.1-1.45-1.1-1.45-.9-.61.07-.6.07-.6 1 .07 1.52 1.03 1.52 1.03.9 1.53 2.36 1.09 2.93.83.09-.66.35-1.1.64-1.36-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-2 1.03-2.7-.11-.26-.45-1.29.1-2.68 0 0 .84-.27 2.75 1.03a9.49 9.49 0 0 1 5 0c1.9-1.3 2.74-1.03 2.74-1.03.56 1.39.22 2.42.11 2.68.64.7 1.03 1.61 1.03 2.7 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .26.18.58.69.48A10 10 0 0 0 12 2z"
                  />
                </svg>
              </a> */}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              Navigatsiya
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <a href="#about" className="hover:text-white transition">
                  Biz haqimizda
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition">
                  Xizmatlar
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition">
                  Aloqa
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Xizmatlar</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li>Cloud Transformation</li>
              <li>Cybersecurity</li>
              <li>Data &amp; Analytics</li>
              <li>Custom Enterprise Solutions</li>
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Aloqa</h4>
            <ul className="space-y-3 text-sm text-white/70 mb-5">
              <li>
                <a
                  href="mailto:contact@zayra.uz"
                  className="hover:text-white transition"
                >
                  contact@zayra.uz
                </a>
              </li>
              <li>
                <a
                  href="tel:+998901234567"
                  className="hover:text-white transition"
                >
                  +998 (95) 034-00-34
                </a>
              </li>
              <li className="text-white/60">Toshkent, O‘zbekiston</li>
            </ul>

            <form onSubmit={handleSubmit} className="space-y-3">
              <label
                htmlFor="newsletter"
                className="text-sm text-white/80 block"
              >
                Yangiliklarga obuna bo‘ling
              </label>
              <div className="flex gap-2">
                <input
                  id="newsletter"
                  type="email"
                  required
                  placeholder="Email manzilingiz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-emerald-400 transition"
                />
                <button
                  type="submit"
                  className="whitespace-nowrap rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-black hover:opacity-90 transition"
                >
                  Obuna
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Divider row */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/60">Til:</span>
            <select
              aria-label="Til tanlang"
              defaultValue="uz"
              className="rounded-md bg-white/5 border border-white/10 px-2.5 py-1.5 text-sm text-white/80 hover:border-white/20 focus:outline-none"
            >
              <option value="uz">O‘zbekcha</option>
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </select>
          </div>

          <nav className="flex flex-wrap justify-center gap-4 text-sm text-white/60">
            <a href="#" className="hover:text-white transition">
              Maxfiylik siyosati
            </a>
            <a href="#" className="hover:text-white transition">
              Foydalanish shartlari
            </a>
            <a href="#" className="hover:text-white transition">
              DPA
            </a>
            <a href="#" className="hover:text-white transition">
              Xavfsizlik
            </a>
          </nav>
        </div>
      </div>

      {/* Bottom mini-bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Zayra. Barcha huquqlar himoyalangan.
          </p>
          <p className="text-xs text-white/50">
            Built for premium enterprises — Web • Mobile • AI
          </p>
        </div>
      </div>
    </footer>
  );
}
