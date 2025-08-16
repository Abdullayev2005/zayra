// app/page.tsx
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Hero />
      <About /> {/* 🔗 shu qo‘shildi */}
      <Services />
      <Contact />
      <Footer />
    </>
  );
}
