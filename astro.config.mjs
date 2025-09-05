import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://westgroupfinancial.com',
  base: '/',
  output: 'static',
  
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      }
    }),
    sitemap()
  ],
  
  build: {
    inlineStylesheets: 'auto',
  },
  
  server: {
    port: 3000,
    host: true
  },
  
  vite: {
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[hash][extname]',
        }
      }
    }
  }
});
