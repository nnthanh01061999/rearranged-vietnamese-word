// app/sitemap.ts
import { MetadataRoute } from "next";

const locales = ["vi", "en"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.tratudao.online";

  const staticPages = [""];

  const allPages = [...staticPages];

  return allPages.flatMap((page) => {
    return locales.map((locale) => {
      return {
        url: `${baseUrl}/${locale}${page ? `/${page}` : ""}`,
        lastModified: new Date(),
      };
    });
  });
}
