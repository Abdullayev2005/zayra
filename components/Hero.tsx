"use client";
import dynamic from "next/dynamic";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";

const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });

export default function Hero() {
  // subtle glow background (mouse)
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const dx = useSpring(x, { stiffness: 120, damping: 20 });
  const dy = useSpring(y, { stiffness: 120, damping: 20 });
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      x.set(e.clientX - r.left - r.width / 2);
      y.set(e.clientY - r.top - r.height / 2);
    };
    el.addEventListener("mousemove", onMove, { passive: true });
    return () => el.removeEventListener("mousemove", onMove);
  }, [x, y]);

  const glow = useMotionTemplate`radial-gradient(600px 600px at calc(50% + ${dx}px) calc(50% + ${dy}px), rgba(16,185,129,0.12), transparent 70%)`;
  const fade = (d = 0) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: d },
  });

  return (
    <section className="relative">
      {/* yumshoq glow */}
      <div
        className="absolute inset-0 -z-10"
        ref={ref}
        style={{ background: glow as unknown as string }}
      />

      <div className="mx-auto max-w-6xl px-5 pt-24 lg:pt-32 pb-14">
        <div className="grid lg:grid-cols-2 items-center gap-10">
          {/* Chap matn */}
          <motion.div {...fade(0)} className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
              IT kompaniyasi
            </p>
            <h1 className="text-4xl sm:text-5xl/tight lg:text-6xl/tight font-semibold">
              Zayra: <span className="text-emerald-400">Jiddiy</span> &
              Minimalistik IT yechimlar
            </h1>
            <p className="mt-5 text-gray-300 max-w-xl">
              Web, mobil, AI — strategiyadan implementatsiyagacha. Tez,
              ishonchli, premium natija.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium bg-emerald-500 text-black hover:opacity-90 transition"
              >
                Bog‘lanish
              </Link>
              <Link
                href="#portfolio"
                className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium border border-white/15 hover:border-emerald-500/60 transition"
              >
                Portfolio
              </Link>
            </div>
          </motion.div>

          {/* O‘ng — RAMKASIZ 3D KARTA */}
          <motion.div
            {...fade(0.05)}
            className="relative w-full h-[300px] sm:h-[360px] lg:h-[420px] rounded-2xl overflow-hidden"
          >
            <Scene3D className="absolute inset-0" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
