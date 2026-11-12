import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/how-it-works", "/results", "/reviews", "/faq", "/quote", "/privacy", "/terms"];
  return pages.map((p) => ({ url: `${SITE.url}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : p === "/quote" ? 0.9 : 0.7 }));
}
