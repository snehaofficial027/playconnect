import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "favicon.ico",
        "logo192.png",
        "logo512.png",
      ],

      manifest: {
        name: "PlayConnect",
        short_name: "PlayConnect",

        description:
          "Find Players, Book Venues, Join Tournaments",

        theme_color: "#2563eb",
        background_color: "#ffffff",

        display: "standalone",

        orientation: "portrait",

        start_url: "/",

        icons: [
          {
            src: "logo192.png",
            sizes: "192x192",
            type: "image/png",
          },

          {
            src: "logo512.png",
            sizes: "512x512",
            type: "image/png",
          },

          {
            src: "logo512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});