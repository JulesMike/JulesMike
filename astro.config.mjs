import { defineConfig } from "astro/config"

import uno from "astro-uno"
import { presetUno, presetTypography, presetAttributify } from "unocss"
import presetIcons from "@unocss/preset-icons"
import compress from "astro-compress"
import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
import netlify from '@astrojs/netlify/functions'

// Icons
import technologies from "./data/cv/technologies.json" assert {type: "json"}
import awards from "./data/cv/awards.json" assert {type: "json"}
import languages from "./data/cv/languages.json" assert {type: "json"}
import interests from "./data/cv/interests.json" assert {type: "json"}

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
  output: "server",
  site: "https://mgjules.dev",
  experimental: { integrations: true },
  integrations: [
    uno({
      safelist: [
        ...Array.from(technologies.technologies, tech => `i-${tech.icon}`),
        ...Array.from(awards.awards, aw => `i-${aw.icon}`),
        ...Array.from(languages.languages, lang => `i-${lang.icon}`),
        ...Array.from(interests.interests, int => `i-${int.icon}`),
        ...["i-ooui:article-not-found-ltr", "i-carbon:document"],
        ...["text-xl", "font-semibold", "font-light", "sm:mt-2", "text-red"]
      ],
      presets: [
        presetAttributify(),
        presetUno(),
        presetTypography({
          cssExtend: {
            'h1,h2,h3,h4,a,code': {
              color: '#0891b2',
            },
            'a:hover': {
              color: '#22d3ee',
            },
          },
        }),
        presetIcons({
          autoInstall: true
        })
      ],
    }),
    svelte(),
    compress(),
    sitemap()
  ],
  vite: {
    build: {
      ssr: true
    }
  },
})