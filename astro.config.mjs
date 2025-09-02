// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import compress from 'astro-compress';
import critters from 'astro-critters';

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
        } else if (item.url.includes('/locations/')) {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/contact/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        }
        return item;
      }
    }),
    
    // Optimize third-party scripts
    partytown({
      config: {
        forward: ['dataLayer.push']
      }
    }),
    
    // Extract and inline critical CSS
    critters({
      path: './dist',
      logger: 1
    }),
    
    // Compress output files
    compress({
      CSS: true,
      HTML: {
        'remove-tag-whitespace': false,
        'collapse-whitespace': true,
        'minify-css': true,
        'minify-js': true,
        'remove-comments': true
      },
      Image: true,
      JavaScript: true,
      SVG: true,
    })
  ],
  
  // SEO and performance optimizations
  compressHTML: true,
  
  build: {
    // Optimize build output
    inlineStylesheets: 'auto',
    assets: '_assets',
  },
  
  // Image optimization
  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.westgroupfinancial.com',
      },
    ],
  },
  
  // Server configuration
  server: {
    port: 3000,
    host: true
  },
  
  // Vite configuration for additional optimizations
  vite: {
    build: {
      // Code splitting for better performance
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunk for third-party libraries
            vendor: ['astro'],
          }
        }
      }
    },
    
    // CSS optimization
    css: {
      transformer: 'postcss',
    },
    
    // Asset optimization
    assetsInclude: ['**/*.woff2', '**/*.woff'],
    
    // Define environment variables
    define: {
      __SITE_URL__: '"https://westgroupfinancial.com"',
      __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
    }
  },
  
  // Markdown configuration (if using blog/content)
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },
  
  // Experimental features for performance
  experimental: {
    assets: true,
    viewTransitions: true
  }
});
