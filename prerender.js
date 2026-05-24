import puppeteer from "puppeteer";
import express from "express";
import fs from "fs";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "dist");
const sitemapPath = path.resolve(distDir, "sitemap.xml");

async function main() {
  if (!fs.existsSync(distDir)) {
    console.error("dist directory not found. Please build the project first.");
    process.exit(1);
  }

  // Parse sitemap
  const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");
  const urls = [];
  const regex = /<loc>(https:\/\/mgsalvage\.com[^<]*)<\/loc>/g;
  let match;
  while ((match = regex.exec(sitemapContent)) !== null) {
    let route = match[1].replace("https://mgsalvage.com", "");
    if (route === "") route = "/";
    urls.push(route);
  }

  console.log(`Found ${urls.length} routes to prerender.`);

  // Start a local server to serve the SPA
  const app = express();
  app.use(express.static(distDir));

  // SPA fallback
  app.use((req, res) => {
    res.sendFile(path.resolve(distDir, "index.html"));
  });

  const server = app.listen(0, async () => {
    const port = server.address().port;
    console.log(`Local server started on port ${port}`);

    try {
      const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        headless: "new",
      });
      const page = await browser.newPage();

      for (const route of urls) {
        console.log(`Prerendering ${route}...`);
        await page.goto(`http://localhost:${port}${route}`, {
          waitUntil: "networkidle0",
        });

        // Wait for React to hydrate and SEOHead to update the document
        // Poll for up to 10 seconds for the title to change from the default
        const defaultTitle = "MG Salvage - Junk Car Removal & Cash for Cars in Sanford, NC";
        let titleChanged = false;
        for (let i = 0; i < 50; i++) {
          await new Promise(r => setTimeout(r, 200));
          const currentTitle = await page.title();
          if (currentTitle && currentTitle !== defaultTitle && currentTitle.includes("| MG Salvage")) {
            titleChanged = true;
            break;
          }
        }
        if (!titleChanged) {
          console.warn(`  WARNING: Title did not change from default for ${route}`);
        }

        // Wait for schema scripts to be injected by SEOHead's useEffect
        console.log("  Waiting for schema scripts...");
        const schemaFound = await page.waitForFunction(() => {
          const scripts = document.querySelectorAll('script[data-seo="true"]');
          return scripts.length > 0;
        }, { timeout: 8000 }).then(() => true).catch(() => false);

        if (!schemaFound) {
          console.warn(`  WARNING: Schema scripts NOT found for ${route}`);
        } else {
          console.log(`  Schema scripts found!`);
        }

        // Final wait for stability
        await new Promise(r => setTimeout(r, 500));

        const html = await page.content();

        // Verify meta tags are present
        const hasOgTitle = html.includes('property="og:title"');
        const hasOgDescription = html.includes('property="og:description"');
        const hasTwitterCard = html.includes('name="twitter:card"');
        const hasRobots = html.includes('name="robots"');
        const hasCanonical = html.includes('rel="canonical"');
        const hasSchema = html.includes('application/ld+json');

        if (!hasOgTitle || !hasOgDescription || !hasTwitterCard || !hasRobots) {
          console.warn(
            `  WARNING: Missing meta tags for ${route}: og:title=${hasOgTitle}, og:description=${hasOgDescription}, twitter:card=${hasTwitterCard}, robots=${hasRobots}`
          );
        } else {
          console.log(`  Meta tags OK: og:title, og:description, twitter:card, robots`);
        }

        const isRoot = route === "/";
        const fileDir = isRoot ? distDir : path.join(distDir, route);
        const filePath = path.join(fileDir, "index.html");

        if (!isRoot) {
          fs.mkdirSync(fileDir, { recursive: true });
        }

        fs.writeFileSync(filePath, html);
        console.log(`  Saved ${filePath}`);
      }

      await browser.close();
      console.log("Prerendering completed successfully.");
    } catch (e) {
      console.error("Error during prerendering:", e);
    } finally {
      server.close();
      process.exit(0);
    }
  });
}

main();