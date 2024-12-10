import { z, defineCollection } from "astro:content"

const stickers = defineCollection({
  type: "data",
  schema: z.object({
    naziv: z.string(),
    slika: z.string(),
    download: z.string(),
    pdf: z.string(),
  }),
})

export const collections = {
  stickers,
}
