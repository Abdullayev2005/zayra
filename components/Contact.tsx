"use client";

export default function Contact() {
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

        <form className="mx-auto max-w-2xl space-y-6">
          <div>
            <input
              type="text"
              placeholder="Ism va familiya"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-emerald-400 transition"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email manzilingiz"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-emerald-400 transition"
            />
          </div>
          <div>
            <textarea
              placeholder="Xabaringiz..."
              rows={5}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-emerald-400 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition"
          >
            Yuborish
          </button>
        </form>
      </div>
    </section>
  );
}
