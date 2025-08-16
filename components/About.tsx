"use client";

import dynamic from "next/dynamic";

const SceneGlobe3D = dynamic(() => import("./SceneGlobe3D"), { ssr: false });

export default function About() {
  return (
    <section id="about" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* CHAP — 3D */}
        <div className="relative h-[300px] sm:h-[380px] lg:h-[440px]">
          <SceneGlobe3D className="absolute inset-0" />
        </div>

        {/* O‘NG — Premium matn */}
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-white/50 mb-3">
            Biz haqimizda
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-5">
            Premium segment uchun texnologik hamkor
          </h2>
          <p className="text-white/70 leading-relaxed mb-6 max-w-[52ch]">
            <span className="text-white">Zayra</span> — enterprise darajadagi
            kompaniyalarga mo‘ljallangan strategik IT hamkor. Biznes
            jarayonlarni transformatsiya qiluvchi, xavfsiz va barqaror
            yechimlarni ishlab chiqamiz.
          </p>

          {/* premium bullet points */}
          <ul className="space-y-3 mb-8 text-white/80">
            <li className="flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-2"></span>
              Global standartlarga mos arxitektura
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-2"></span>
              Enterprise-level xavfsizlik va barqarorlik
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-2"></span>
              Strategik natijaga yo‘naltirilgan hamkorlik
            </li>
          </ul>

          {/* CTA bitta (portfolio o‘rniga “Contact”) */}
          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-medium bg-emerald-500 text-black hover:opacity-90 transition"
            >
              Biz bilan bog‘laning
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
