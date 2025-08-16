"use client";

import { FaCloud, FaLock, FaChartLine, FaCogs } from "react-icons/fa";

export default function Services() {
  const services = [
    {
      icon: <FaCloud className="w-5 h-5" />,
      title: "Cloud Transformation",
      desc: "Bulutli arxitektura, migratsiya va SRE amaliyotlari bilan global masshtabga chiqing.",
    },
    {
      icon: <FaLock className="w-5 h-5" />,
      title: "Cybersecurity",
      desc: "Enterprise darajadagi IAM, Zero-Trust, audit va doimiy monitoring.",
    },
    {
      icon: <FaChartLine className="w-5 h-5" />,
      title: "Data & Analytics",
      desc: "Real-time analitika va ML pipeline’lar bilan tez va ishonchli qarorlar.",
    },
    {
      icon: <FaCogs className="w-5 h-5" />,
      title: "Custom Enterprise Solutions",
      desc: "Murakkab tizimlar uchun moslashuvchan, barqaror va kengayadigan yechimlar.",
    },
  ];

  return (
    <section id="services" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.22em] text-white/50 mb-3">
            Bizning yo‘nalishlar
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white">
            Xizmatlarimiz
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mt-4">
            Premium segment uchun enterprise-level xizmatlar. Dizayn emas —
            natija va barqarorlik.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:gap-7 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <div
              key={i}
              className={[
                "group relative rounded-2xl border border-white/10",
                "p-5 md:p-6 transition-all",
                "hover:border-white/20 hover:shadow-[0_18px_60px_-20px_rgba(0,0,0,0.6)]",
                "hover:translate-y-[-2px]",
                "focus-within:border-white/25 focus-within:shadow-[0_18px_60px_-20px_rgba(0,0,0,0.7)]",
              ].join(" ")}
            >
              {/* Yuqori aksent chiziq (hoverda jonlanadi) */}
              <span
                className="absolute left-5 right-5 top-0 h-[2px] bg-gradient-to-r from-emerald-400/60 via-cyan-300/50 to-indigo-400/60
                           opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
              />

              {/* Icon chip */}
              <div
                className="inline-flex items-center justify-center rounded-xl ring-1 ring-white/10 text-emerald-300/90
                           h-11 w-11 mb-4 bg-transparent group-hover:ring-white/20 transition"
                aria-hidden
              >
                {s.icon}
              </div>

              {/* Title */}
              <h3 className="text-base md:text-[17px] font-semibold text-white mb-2">
                {s.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-white/70 leading-relaxed">{s.desc}</p>

              {/* Past indikator chiziq */}
              <span
                className="block mt-5 h-px w-0 bg-emerald-400/90 group-hover:w-full transition-[width] duration-300"
                aria-hidden
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
