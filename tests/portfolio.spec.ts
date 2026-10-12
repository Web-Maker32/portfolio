import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("home page presents the developer and primary project links", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Muhammed Hashir Ali/);
  await expect(page.getByRole("heading", { level: 1, name: /Muhammed Hashir Ali/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "Explore my projects" })).toHaveAttribute("href", "/projects");
});

test("legacy project list URL redirects to the current projects route", async ({ page }) => {
  await page.goto("/about/projects");
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole("heading", { name: "Personal projects" })).toBeVisible();
});

test("project case study shows project details and source links", async ({ page }) => {
  await page.goto("/projects/next-finance");
  await expect(page.getByRole("heading", { level: 1, name: "Next Finance" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Project focus" })).toBeVisible();
  await expect(page.getByText("Project snapshot")).toBeVisible();
  await expect(page.getByRole("link", { name: "View source code" })).toHaveAttribute(
    "href",
    "https://github.com/Web-Maker32/next-finance",
  );
});

test("contact form validates message fields in the browser", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Your Name").fill("A");
  await page.getByLabel("Your Name").blur();
  await expect(page.getByText("Name must be at least 2 characters")).toBeVisible();

  await page.getByLabel("Email Address").fill("not-an-email");
  await page.getByLabel("Email Address").blur();
  await expect(page.getByText("Please enter a valid email address")).toBeVisible();

  await page.getByLabel("Your Message").fill("This is a sufficiently long message.");
  await page.getByLabel("Your Message").blur();
  await expect(page.getByLabel("Your Message")).toHaveAttribute("aria-invalid", "false");
});

test("@a11y key pages have no serious WCAG 2.1 A/AA axe violations", async ({ page }) => {
  for (const route of ["/", "/projects", "/projects/next-finance", "/about", "/contact"]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations, `${route}: ${JSON.stringify(results.violations)}`).toEqual([]);
  }
});

test("mobile navigation closes on Escape and exposes its dialog state", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const openButton = page.getByRole("button", { name: "Open menu" });
  await openButton.click();
  await expect(page.getByRole("dialog", { name: "Site navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Site navigation" })).toBeHidden();
});
