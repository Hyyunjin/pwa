import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(), prerender({
      routes: generatePerformanceRoutes(),
      renderer: "@prerenderer/renderer-puppeteer",
      rendererOptions: {
        maxConcurrentRoutes: 1,
        renderAfterTime: 500,
      },
    }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ['logo180.png', 'pwa-192x192.png', 'pwa-512x512.png', 'pwa-512x512.png'],
      manifest: {
        short_name: "KK Delivery",
        name: "KOKKOK Delivery",
        start_url: "/",
        display: "standalone",
        theme_color: "#ffffff",
        background_color: "#171717",
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]

      },
    }),
  ],
});
