import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"

import vercel from "@astrojs/vercel"

import react from "@astrojs/react";

export default defineConfig({
  site: "https://www.uzimam.com/",
  integrations: [sitemap(), react()],
  adapter: vercel(),
})