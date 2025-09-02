// astro.config.mjs - Fixed version
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://westgroupfinancial.com',
  base: '/',
  output: 'static',
  
  integrations: [
    tailwind({
      applyBaseStyles: false, // We have our own global styles
    }),
    
    // Generate sitemap automatically
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      entryLimit: 45000,
      customPages: [
        'https://westgroupfinancial.com/about/',
        'https://westgroupfinancial.com/testimonials/',
        'https://westgroupfinancial.com/blog/',
        'https://westgroupfinancial.com/contact/',
        'https://westgroupfinancial.com/services/comprehensive-financial-planning/',
        'https://westgroupfinancial.com/services/tax-efficient-investment-strategies/',
        'https://westgroupfinancial.com/services/retirement-income-planning/',
        'https://westgroupfinancial.com/services/estate-planning-strategies/',
        'https://westgroupfinancial.com/services/business-succession-planning/',
        'https://westgroupfinancial.com/services/investment-portfolio-management/',
        'https://westgroupfinancial.com/locations/vancouver/',
        'https://westgroupfinancial.com/locations/burnaby/',
        'https://westgroupfinancial.com/locations/richmond/',
        'https://westgroupfinancial.com/locations/surrey/'
      ],
      serialize(item) {
        // Set custom priorities for different page types
        if (item.url === 'https://westgroupfinancial.com/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/services/')) {
          item.priority = 0.9;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/calculator/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/about/') || item.url.includes('/testimonials/') || item.url.includes('/blog/')) {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/contact/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        }
        return item;
      }
    })
  ],
  
  // Build optimizations
  build: {
    inlineStylesheets: 'auto',
    assets: '_assets',
  },
  
  // Server configuration
  server: {
    port: 3000,
    host: true
  },
  
  // Vite configuration for optimizations
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['astro'],
          }
        }
      }
    },
    
    // Define environment variables
    define: {
      __SITE_URL__: '"https://westgroupfinancial.com"',
      __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
    }
  },
  
  // Image optimization
  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.westgroupfinancial.com',
      },
    ],
  }
});
