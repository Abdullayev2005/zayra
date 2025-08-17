"use client";

import { useState } from "react";
// types kerak bo'lmaydi, lekin React tiplari ishlatamiz
import InputMask from "react-input-mask";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

// Mask render-prop uchun qulay tip
type MaskInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

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
  const cleanPhone = (v: string) => v.replace(/[^\d+]/g, "");
  const isUzPhone = (v: string) => /^\+998(9[0-9]|7[1-5]|33|88)\d{7}$/.test(v);

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setData((p) => ({ ...p, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOk(null);
    setErr(null);

    const phone = cleanPhone(data.phone);

    if (!data.name.trim()) return setErr("Ism va familiya kiritilmadi.");
    if (!isEmail(data.email)) return setErr("Email manzili noto‘g‘ri.");
    if (!isUzPhone(phone)) return setErr("Telefon raqam formati noto‘g‘ri.");
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
          phone,
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
      // ❌ any o'rniga xavfsiz tip-guard
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

          <div>
            <label className="block text-sm text-white/60 mb-2">Telefon</label>
            <InputMask
              mask="+998 (99) 999-99-99"
              maskChar="_"
              value={data.phone}
              onChange={onChange("phone")}
            >
              {(inputProps: MaskInputProps) => (
                <input
                  {...inputProps}
                  type="tel"
                  inputMode="tel"
                  placeholder="+998 (__) ___-__-__"
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-emerald-400 transition"
                />
              )}
            </InputMask>
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
