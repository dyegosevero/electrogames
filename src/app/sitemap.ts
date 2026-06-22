import type { MetadataRoute } from "next";

const BASE = "https://www.electrogames.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/servicos/consoles`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/servicos/controles`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/servicos/headsets`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/servicos/jogos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
