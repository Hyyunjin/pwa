import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";

const routes = ["/", "/a", "/b", "/c"]; // ✅ 프리렌더할 라우트들

const distDir = path.resolve(process.cwd(), "dist");
const baseUrl = process.env.PRERENDER_BASE_URL || "http://localhost:4173"; // vite preview 기본

function ensureDir(p) {
    fs.mkdirSync(p, { recursive: true });
}

async function main() {
    const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // 일부 크롤러 흉내 내고 싶으면 UA 설정 가능(선택)
    // await page.setUserAgent("Mozilla/5.0 (compatible; bot/1.0)");

    for (const route of routes) {
        const url = `${baseUrl}${route}`;
        console.log("[prerender]", url);

        await page.goto(url, { waitUntil: "networkidle0" });

        // Helmet 반영 타이밍이 늦는 경우가 있어 한 박자 주기(가끔 필요)
        await page.waitForTimeout(200);

        const html = await page.content();

        // ✅ /a -> dist/a/index.html 형태로 생성 (Vercel 정적 호스팅에서 잘 먹힘)
        const outDir =
            route === "/"
                ? distDir
                : path.join(distDir, route.replace(/^\//, "")); // "a", "b", "c"
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
