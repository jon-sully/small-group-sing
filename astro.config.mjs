import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import { defineConfig, envField } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: process.env.URL,
  integrations: [svelte(), tailwind(), sitemap()],
  experimental: {
    env: {
      schema: {
        /**
         * @see https://docs.netlify.com/configure-builds/environment-variables/#deploy-urls-and-metadata
         * */
        URL: envField.string({
          context: "server",
          access: "public",
          optional: true,
        }),
      },
    },
  },
});
