import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import { defineConfig, envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: process.env.URL,
  integrations: [svelte(), tailwind()],
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
