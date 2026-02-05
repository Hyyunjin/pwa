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

        await page.goto(url, { waitUntil: "networkidle0" });

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
