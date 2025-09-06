// components/BackgroundFX.tsx
"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useEffect } from "react";

export default function BackgroundFX() {
  const prefersReducedMotion = useReducedMotion();

  // cursor spotlight (yumshoq)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);
  const sx = useSpring(mx, { stiffness: 50, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 50, damping: 20, mass: 0.6 });

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base: chuqur gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(1100px_650px_at_50%_-10%,rgba(11,15,22,0.9),#000_60%),linear-gradient(180deg,#080c12_0%,#000_100%)]" />

      {/* Subtle grain */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'160\\' height=\\'160\\'><filter id=\\'n\\'><feTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.8\\' numOctaves=\\'3\\' stitchTiles=\\'stitch\\'/></filter><rect width=\\'100%\\' height=\\'100%\\' filter=\\'url(%23n)\\' opacity=\\'0.35\\'/></svg>')]" />

      {/* --- ADDED: Soft vignette (markazga diqqati jamlaydi) --- */}
      <div className="absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)] bg-black/40" />

      {/* Aurora sweep #1 — katta lenta, past opacity */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute -top-48 -left-1/3 h-[75vh] w-[120vw] -rotate-[18deg] blur-3xl"
          initial={{ x: -120 }}
          animate={{ x: 120 }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 28,
            ease: "linear",
          }}
          style={{
            background:
              "linear-gradient(90deg, rgba(16,185,129,0) 0%, rgba(16,185,129,0.22) 35%, rgba(6,182,212,0.15) 55%, rgba(99,102,241,0.12) 70%, rgba(16,185,129,0) 100%)",
          }}
        />
      )}

      {/* Aurora sweep #2 — pastroq qatlam, teskariga oqadi */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute bottom-[-30%] -right-1/3 h-[65vh] w-[120vw] rotate-[14deg] blur-3xl opacity-70"
          initial={{ x: 140 }}
          animate={{ x: -140 }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 36,
            ease: "linear",
          }}
          style={{
            background:
              "linear-gradient(90deg, rgba(34,197,94,0) 0%, rgba(34,197,94,0.16) 30%, rgba(99,102,241,0.10) 55%, rgba(6,182,212,0.14) 75%, rgba(34,197,94,0) 100%)",
          }}
        />
      )}

      {/* Diagonal shimmer — juda yengil chiziqlar harakati */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]">
            <div className="absolute -inset-[25%] -rotate-[20deg]">
              <div className="h-full w-full bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_12px)] animate-[slideDiag_22s_linear_infinite]" />
            </div>
          </div>
        </div>
      )}

      {/* Cursor spotlight (kichik radius, past opacity) */}
      {!prefersReducedMotion && (
        <motion.div
          style={{ left: sx, top: sy, translateX: "-50%", translateY: "-50%" }}
          className="absolute h-[480px] w-[480px] rounded-full"
        >
          <div
            className="h-full w-full rounded-full opacity-[0.10] blur-[80px]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(16,185,129,0.55), rgba(16,185,129,0.0) 70%)",
            }}
          />
        </motion.div>
      )}

      {/* --- ADDED: Edge glows (brand palitrasi) --- */}
      <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="absolute right-0 -top-16 h-56 w-56 rounded-full bg-cyan-400/12 blur-[80px]" />
      <div className="absolute -bottom-16 left-1/3 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

      {/* --- ADDED: Beams (nihoyatda hushyor, brand ranglarida) --- */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute left-[-10%] top-1/3 h-px w-[120%] opacity-[0.12]"
            initial={{ x: "-15%" }}
            animate={{ x: "5%" }}
            transition={{
              duration: 26,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "linear",
            }}
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(16,185,129,0.55), rgba(34,211,238,0.45), rgba(99,102,241,0.45), transparent)",
              filter: "saturate(1.1)",
            }}
          />
          <motion.div
            className="absolute left-[-10%] top-[60%] h-px w-[120%] opacity-[0.10]"
            initial={{ x: "8%" }}
            animate={{ x: "-8%" }}
            transition={{
              duration: 32,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "linear",
            }}
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(99,102,241,0.45), rgba(6,182,212,0.45), rgba(16,185,129,0.55), transparent)",
              filter: "saturate(1.05)",
            }}
          />
        </>
      )}

      {/* Local keyframes (configsiz Tailwind) */}
      <style jsx global>{`
        @keyframes slideDiag {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-240px);
          }
        }

        /* Mobil energiya tejamkorligi: juda katta blurlarni kamaytirish */
        @media (max-width: 640px) {
          .blur-3xl {
            filter: blur(40px) !important;
          }
        }
      `}</style>
    </div>
  );
}
