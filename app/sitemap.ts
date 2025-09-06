import { MetadataRoute } from "next";

// NAV massivini komponentdan import qilish mumkin emas,
// chunki bu server fayl. Shu sababli qo‘lda yozib chiqamiz.
const NAV = [
  { id: "about", label: "Biz haqimizda" },
  { id: "services", label: "Xizmatlar" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Aloqa" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://zayra.uz";

  const pages = NAV.map((item) => ({
    url: `${baseUrl}/${item.id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...pages,
  ];
}
