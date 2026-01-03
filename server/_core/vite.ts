import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { getPrerenderedContent, getPageMetadata } from "../ssr";

// List of known crawler user agents
const CRAWLER_USER_AGENTS = [
  'googlebot',
  'adsbot-google',
  'mediapartners-google',
  'bingbot',
  'slurp',
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'embedly',
  'quora link preview',
  'showyoubot',
  'outbrain',
  'pinterest',
  'applebot',
  'semrushbot',
  'ahrefsbot',
  'mj12bot',
  'petalbot',
  'dotbot',
  'rogerbot',
  'screaming frog',
  'curl',
  'wget',
  'python-requests',
  'go-http-client',
  'java/',
  'headlesschrome',
  'lighthouse',
  'pagespeed',
  'gtmetrix',
];

/**
 * Check if the request is from a crawler/bot
 */
function isCrawler(userAgent: string | undefined): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return CRAWLER_USER_AGENTS.some(crawler => ua.includes(crawler));
}

/**
 * Inject SSR content and meta tags into HTML template
 */
function injectSSRContent(template: string, url: string): string {
  const metadata = getPageMetadata(url);
  const ssrContent = getPrerenderedContent(url);
  
  // Inject meta tags
  let html = template;
  
  // Update title
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${metadata.title}</title>`
  );
  
  // Add meta description if not present, or update it
  if (html.includes('name="description"')) {
    html = html.replace(
      /<meta name="description" content=".*?">/,
      `<meta name="description" content="${metadata.description}">`
    );
  } else {
    html = html.replace(
      '</head>',
      `  <meta name="description" content="${metadata.description}">\n  </head>`
    );
  }
  
  // Add meta keywords
  if (!html.includes('name="keywords"')) {
    html = html.replace(
      '</head>',
      `  <meta name="keywords" content="${metadata.keywords}">\n  </head>`
    );
  }
  
  // Add Open Graph tags
  const ogTags = `
  <meta property="og:title" content="${metadata.title}">
  <meta property="og:description" content="${metadata.description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://khelosmart.com${url}">
  <meta property="og:site_name" content="Khelosmart">
  <meta property="og:image" content="https://khelosmart.com/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${metadata.title}">
  <meta name="twitter:description" content="${metadata.description}">
  <meta name="twitter:image" content="https://khelosmart.com/og-image.png">
  `;
  
  if (!html.includes('property="og:title"')) {
    html = html.replace('</head>', `${ogTags}\n  </head>`);
  }
  
  // Inject pre-rendered content into the root div
  // This content will be visible to crawlers and replaced by React on hydration
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${ssrContent}</div>`
  );
  
  // Add a noscript fallback
  const noscriptContent = `
  <noscript>
    <style>
      #ssr-content { display: block !important; }
    </style>
    <div style="padding: 20px; text-align: center; background: #f0fdf4; border: 1px solid #bbf7d0; margin: 20px;">
      <h2>JavaScript Required</h2>
      <p>Please enable JavaScript to use Khelosmart. Our fantasy cricket platform requires JavaScript for the best experience.</p>
      <p>Khelosmart is a FREE-TO-PLAY fantasy cricket platform. No real money involved.</p>
    </div>
  </noscript>
  `;
  
  if (!html.includes('<noscript>')) {
    html = html.replace('</body>', `${noscriptContent}\n</body>`);
  }
  
  return html;
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    const userAgent = req.headers['user-agent'];

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      
      // Inject SSR content for crawlers and all users for better SEO
      // The React app will hydrate and take over on the client side
      const page = await vite.transformIndexHtml(url, template);
      const ssrPage = injectSSRContent(page, url);
      
      // Log crawler detection for debugging
      if (isCrawler(userAgent)) {
        console.log(`[SSR] Crawler detected: ${userAgent?.substring(0, 50)}... serving SSR content for ${url}`);
      }
      
      res.status(200).set({ "Content-Type": "text/html" }).end(ssrPage);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  // Serve static files EXCEPT index.html (we handle that with SSR)
  app.use(express.static(distPath, {
    index: false  // Don't serve index.html automatically for directory requests
  }));

  // Handle ALL routes with SSR-injected HTML (including root /)
  app.use("*", (req, res, next) => {
    // Don't serve index.html for API routes
    if (req.originalUrl.startsWith("/api")) {
      return next();
    }
    
    const url = req.originalUrl;
    const indexPath = path.resolve(distPath, "index.html");
    
    // Read the built index.html and inject SSR content
    fs.readFile(indexPath, 'utf-8', (err, template) => {
      if (err) {
        console.error('[SSR] Error reading index.html:', err);
        return res.sendFile(indexPath);
      }
      
      try {
        const ssrPage = injectSSRContent(template, url);
        console.log(`[SSR] Serving SSR content for: ${url}`);
        res.status(200).set({ "Content-Type": "text/html" }).end(ssrPage);
      } catch (ssrError) {
        console.error('[SSR] Error injecting SSR content:', ssrError);
        res.sendFile(indexPath);
      }
    });
  });
}
