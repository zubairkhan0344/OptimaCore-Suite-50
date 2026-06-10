import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { UTILITIES } from "./src/data";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Helper to dynamically build structured data (JSON-LD) for a given utility id
  function getStructuredDataForUtility(utilId: number, baseUrl: string) {
    const activeUtil = UTILITIES.find(u => u.id === utilId) || UTILITIES[0];
    const specificMarkup = activeUtil?.aeo?.schemaMarkup || {};

    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${baseUrl}/#website`,
          "url": `${baseUrl}/`,
          "name": "OptimaCore Systems",
          "description": "50 high-opportunity, premium micro-utilities optimized for high-density calculations and Generative Engine Optimization (AEO/GEO)."
        },
        {
          "@type": "Organization",
          "@id": `${baseUrl}/#organization`,
          "name": "OptimaCore Systems",
          "url": `${baseUrl}/`,
          "logo": `${baseUrl}/assets/logo.png`,
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "support@optimacore.systems",
            "contactType": "customer service"
          }
        },
        {
          "@type": "WebApplication",
          "@id": `${baseUrl}/?id=${activeUtil.id}#webapp`,
          "name": activeUtil.name,
          "category": activeUtil.category,
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "All",
          "browserRequirements": "Requires JavaScript. Requires HTML5.",
          "url": `${baseUrl}/?id=${activeUtil.id}`,
          "description": activeUtil.purpose,
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD"
          }
        },
        specificMarkup
      ]
    };
  }

  // Host API or specialized backend routes first
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", count: UTILITIES.length });
  });

  // Dynamic XML Sitemap Generator endpoint
  app.get("/sitemap.xml", (req, res) => {
    try {
      const protocol = req.headers["x-forwarded-proto"] || req.protocol || "https";
      const host = req.get("host") || "localhost:3000";
      const baseUrl = `${protocol}://${host}`;

      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
      xml += `        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n`;
      xml += `        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/sitemap.xsd">\n`;

      // 1. Add Homepage
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/</loc>\n`;
      xml += `    <lastmod>2026-06-10</lastmod>\n`;
      xml += `    <changefreq>daily</changefreq>\n`;
      xml += `    <priority>1.0</priority>\n`;
      xml += `  </url>\n`;

      // 2. Add each of the 50 individual micro-utilities
      UTILITIES.forEach((util) => {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/?id=${util.id}</loc>\n`;
        xml += `    <lastmod>2026-06-10</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += `  </url>\n`;
      });

      xml += `</urlset>\n`;

      res.header("Content-Type", "application/xml; charset=utf-8");
      res.status(200).send(xml);
    } catch (err: any) {
      console.error("Sitemap generation error:", err);
      res.status(500).send("Error generating sitemap");
    }
  });

  // Robots.txt Generator endpoint optimized for LLM conversational search agents
  app.get("/robots.txt", (req, res) => {
    try {
      const protocol = req.headers["x-forwarded-proto"] || req.protocol || "https";
      const host = req.get("host") || "localhost:3000";
      const baseUrl = `${protocol}://${host}`;

      let robots = `# =========================================================================\n`;
      robots += `# OptimaCore Systems - Generative Engine Optimization (GEO/AEO) Protocol\n`;
      robots += `# Authorized Crawler Directives for Conversational Search Discovery\n`;
      robots += `# =========================================================================\n\n`;

      // Explicitly optimize for OpenAI's web crawlers (ChatGPT / Search GPT)
      robots += `# OpenAI / ChatGPT Systems\n`;
      robots += `User-agent: GPTBot\n`;
      robots += `Allow: /\n`;
      robots += `Crawl-delay: 1\n\n`;

      robots += `User-agent: ChatGPT-User\n`;
      robots += `Allow: /\n\n`;

      // Explicitly optimize for Google's Gemini / Search AI
      robots += `# Google / Gemini Systems\n`;
      robots += `User-agent: Google-Extended\n`;
      robots += `Allow: /\n\n`;

      robots += `User-agent: Googlebot\n`;
      robots += `Allow: /\n\n`;

      // Explicitly optimize for Anthropic's Claude chatbot
      robots += `# Anthropic / Claude Systems\n`;
      robots += `User-agent: ClaudeBot\n`;
      robots += `Allow: /\n`;
      robots += `Crawl-delay: 1\n\n`;

      robots += `User-agent: Anthropic-ai\n`;
      robots += `Allow: /\n\n`;

      // Explicitly optimize for Perplexity AI conversational engine
      robots += `# Perplexity AI Systems\n`;
      robots += `User-agent: PerplexityBot\n`;
      robots += `Allow: /\n`;
      robots += `Crawl-delay: 1\n\n`;

      // Explicitly optimize for Moonshot / Kimi Chatbot
      robots += `# Moonshot AI / Kimi Chat Systems\n`;
      robots += `User-agent: MoonshotBot\n`;
      robots += `Allow: /\n`;
      robots += `Crawl-delay: 1\n\n`;

      // Explicitly optimize for Minimax AI chatbot
      robots += `# Minimax Systems\n`;
      robots += `User-agent: MinimaxBot\n`;
      robots += `Allow: /\n`;
      robots += `Crawl-delay: 1\n\n`;

      // Explicitly optimize for Manus AI agent
      robots += `# Manus AI Agent Systems\n`;
      robots += `User-agent: ManusBot\n`;
      robots += `Allow: /\n`;
      robots += `Crawl-delay: 1\n\n`;

      // General Fallback for standard search indexing bots
      robots += `# General Search Indexing\n`;
      robots += `User-agent: *\n`;
      robots += `Allow: /\n`;
      robots += `Crawl-delay: 2\n\n`;

      // Universal Sitemap link mapping
      robots += `# Sitemap Allocation\n`;
      robots += `Sitemap: ${baseUrl}/sitemap.xml\n`;

      res.header("Content-Type", "text/plain; charset=utf-8");
      res.status(200).send(robots);
    } catch (err: any) {
      console.error("Robots.txt generation error:", err);
      res.status(500).send("Error generating robots.txt");
    }
  });

  // Hot module & server compilation configs
  let vite: any = null;
  if (process.env.NODE_ENV !== "production") {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
  }

  // Render homepage dynamically, injecting dynamic JSON-LD structured data on-the-fly!
  app.get("/", async (req, res, next) => {
    try {
      const protocol = req.headers["x-forwarded-proto"] || req.protocol || "https";
      const host = req.get("host") || "localhost:3000";
      const baseUrl = `${protocol}://${host}`;

      const idParam = req.query.id;
      const selectedId = idParam ? parseInt(idParam as string, 10) : 1;
      const activeUtil = UTILITIES.find(u => u.id === selectedId) || UTILITIES[0];

      const schema = getStructuredDataForUtility(activeUtil.id, baseUrl);
      const schemaScript = `\n    <script type="application/ld+json" id="backend-schema-markup">\n      ${JSON.stringify(schema, null, 2)}\n    </script>\n`;

      if (process.env.NODE_ENV !== "production" && vite) {
        let html = fs.readFileSync(path.resolve(process.cwd(), "index.html"), "utf-8");
        html = await vite.transformIndexHtml(req.originalUrl, html);
        html = html.replace("</head>", `${schemaScript}</head>`);
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } else {
        const distIndexPath = path.join(process.cwd(), "dist", "index.html");
        if (fs.existsSync(distIndexPath)) {
          let html = fs.readFileSync(distIndexPath, "utf-8");
          html = html.replace("</head>", `${schemaScript}</head>`);
          res.status(200).set({ "Content-Type": "text/html" }).end(html);
        } else {
          res.status(503).send("Development server is building static sources... please reload in 5 seconds.");
        }
      }
    } catch (err) {
      next(err);
    }
  });

  // Set up Vite development server middleware OR serve static build files
  if (process.env.NODE_ENV !== "production" && vite) {
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[OptimaCore Server] Full-stack application running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
