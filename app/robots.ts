import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://zayra.uz";
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
