"use client";

import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string; // formatted (e.g. "+998 (90) 123-45-67")
  message: string;
};

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [data, setData] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  // faqat RAQAMLAR (plusni ham olib tashlaymiz)
  const cleanPhone = (v: string) => v.replace(/\D/g, "");
  // +998 va undan keyin 9 ta raqam (universal)
  const isUzPhone = (v: string) => /^\+998\d{9}$/.test(v);

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setData((p) => ({ ...p, [key]: e.target.value }));

  // ---- Telefon formatlash (kutubxonasiz) ----
  const formatUzPhone = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    const local = digits.replace(/^998/, "").slice(0, 9); // 9 digit: XX XXX XX XX

    let f = "+998";
    if (local.length > 0) {
      f += " (" + local.slice(0, 2);
      if (local.length >= 2) f += ")";
    }
    if (local.length > 2) f += " " + local.slice(2, 5);
    if (local.length > 5) f += "-" + local.slice(5, 7);
    if (local.length > 7) f += "-" + local.slice(7, 9);
    return f;
  };

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatUzPhone(e.target.value);
    setData((p) => ({ ...p, phone: formatted }));
  };

  const onPhoneFocus = () => {
    if (!data.phone) {
      setData((p) => ({ ...p, phone: "+998 " }));
    }
  };

  const onPhonePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    setData((p) => ({ ...p, phone: formatUzPhone(text) }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOk(null);
    setErr(null);

    const digits = cleanPhone(data.phone); // "998901234567" yoki "901234567"
    const normalized = digits.startsWith("998") ? digits : "998" + digits; // har holda 998 bilan boshlansin
    const phoneForCheck = "+" + normalized; // +998901234567

    if (!data.name.trim()) return setErr("Ism va familiya kiritilmadi.");
    if (!isEmail(data.email)) return setErr("Email manzili noto‘g‘ri.");
    if (!isUzPhone(phoneForCheck))
      return setErr("Telefon raqam formati noto‘g‘ri.");
    if (!data.message.trim())
      return setErr("Xabar bo‘sh bo‘lishi mumkin emas.");

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim(),
          phone: phoneForCheck, // serverga tozalangan formatda
          message: data.message.trim(),
        }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({} as { error?: string }));
        throw new Error(j?.error || "Yuborishda xatolik yuz berdi.");
      }

      setOk("Xabar muvaffaqiyatli yuborildi!");
      setData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      if (error instanceof Error) setErr(error.message);
      else setErr("Server xatosi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-28 border-t border-white/10"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.22em] text-white/50 mb-3">
            Aloqa
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white">
            Biz bilan bog‘laning
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mt-4">
            Strategik hamkorlik va loyihalaringizni biz bilan boshlash uchun
            quyidagi formani to‘ldiring.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mx-auto max-w-2xl space-y-6">
          {/* Honeypot anti-bot */}
          <input
            type="text"
            name="company"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-white/60 mb-2">
                Ism va familiya
              </label>
              <input
                type="text"
                placeholder="Ism va familiya"
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-emerald-400 transition"
                value={data.name}
                onChange={onChange("name")}
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-2">Email</label>
              <input
                type="email"
                placeholder="Email manzilingiz"
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-emerald-400 transition"
                value={data.email}
                onChange={onChange("email")}
              />
            </div>
          </div>

          {/* Telefon (kutubxonasiz mask) */}
          <div>
            <label className="block text-sm text-white/60 mb-2">Telefon</label>
            <input
              type="tel"
              inputMode="tel"
              placeholder="+998 (__) ___-__-__"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-emerald-400 transition"
              value={data.phone}
              onChange={onPhoneChange}
              onFocus={onPhoneFocus}
              onPaste={onPhonePaste}
            />
            <p className="text-xs text-white/40 mt-2">
              Format: +998 (90) 123-45-67 — faqat O‘zbekiston raqamlari qabul
              qilinadi
            </p>
          </div>

          <div>
            <label className="block text-sm text-white/60 mb-2">Xabar</label>
            <textarea
              placeholder="Xabaringiz..."
              rows={5}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-emerald-400 transition"
              value={data.message}
              onChange={onChange("message")}
            />
          </div>

          {err && <div className="text-red-400 text-sm">{err}</div>}
          {ok && <div className="text-emerald-400 text-sm">{ok}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 disabled:opacity-60 transition"
          >
            {loading ? "Yuborilmoqda..." : "Yuborish"}
          </button>
        </form>
      </div>
    </section>
  );
}
