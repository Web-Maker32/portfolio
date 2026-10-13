import { expect, test } from "@playwright/test";
import path from "node:path";

test("capture portfolio homepage previews", async ({ browser }) => {
  const outputDirectory = path.join(process.cwd(), "public");

  for (const theme of ["light", "dark"] as const) {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      colorScheme: theme,
      reducedMotion: "reduce",
    });
    await page.addInitScript((selectedTheme) => {
      localStorage.setItem("theme", selectedTheme);
    }, theme);

    await page.goto("/");
    await expect(
      page.getByRole("heading", { level: 1, name: /Muhammed Hashir Ali/ }),
    ).toBeVisible();

    const previewImage = page.locator("main img:visible").first();
    await expect(previewImage).toBeVisible();
    await expect
      .poll(() => previewImage.evaluate((image) => (image as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);

    await page.addStyleTag({ content: "nextjs-portal { display: none !important; }" });
    const screenshotPath = path.join(outputDirectory, `portfolio-${theme}.png`);
    await page.screenshot({ path: screenshotPath });
    if (theme === "light") {
      await page.screenshot({ path: path.join(outputDirectory, "portfolio.png") });
    }
    await page.close();
  }
});
