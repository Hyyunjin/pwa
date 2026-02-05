import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";

const routes = ["/", "/a", "/b", "/c"];
const distDir = path.resolve(process.cwd(), "dist");
const baseUrl = process.env.PRERENDER_BASE_URL || "http://localhost:4173";

function ensureDir(p) {
    fs.mkdirSync(p, { recursive: true });
}

async function main() {
    const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    for (const route of routes) {
        const url = `${baseUrl}${route}`;
        console.log("[prerender]", url);

        const expected = {
            "/a": "id/320",
            "/b": "id/951",
            "/c": "id/488",
        };

        await page.goto(url, { waitUntil: "networkidle0" });

        if (expected[route]) {
            await page.waitForFunction(
                (needle) => {
                    const el = document.querySelector('meta[property="og:image"]');
                    const v = el?.getAttribute("content") ?? "";
                    return v.includes(needle);
                },
                { timeout: 15000 },
                expected[route]
            );
        } else {
            await page.waitForSelector('meta[property="og:image"][content]', { timeout: 15000 });
        }

        const html = await page.content();

        const outDir =
            route === "/"
                ? distDir
                : path.join(distDir, route.replace(/^\//, "")); // a, b, c

        ensureDir(outDir);
        fs.writeFileSync(path.join(outDir, "index.html"), html, "utf-8");
    }

    await browser.close();
    console.log("[prerender] done");
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
