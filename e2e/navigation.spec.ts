import { test, expect } from "@playwright/test";

test("public home page renders correctly and has navigation links", async ({ page }) => {
  await page.goto("/");

  // Verify the page title matches
  await expect(page).toHaveTitle(/TMP Law Firm/i);

  // Verify key heading text is present
  await expect(page.locator("h1")).toContainText(/TAO MANULLANG/i);

  // Check presence of navigation links
  await expect(page.locator('nav a:has-text("Home")').first()).toBeVisible();
  await expect(page.locator('nav a:has-text("About")').first()).toBeVisible();
  await expect(page.locator('nav a:has-text("Services")').first()).toBeVisible();
  await expect(page.locator('nav a:has-text("Lawyers")').first()).toBeVisible();
  await expect(page.locator('nav a:has-text("News")').first()).toBeVisible();
  await expect(page.locator('nav a:has-text("Contact")').first()).toBeVisible();
});

test("can navigate to admin login page and check inputs", async ({ page }) => {
  await page.goto("/admin/login");

  // Verify page title / heading is displayed
  await expect(page.locator("h1")).toContainText(/Admin Access/i);

  // Verify form inputs exist
  const emailInput = page.locator('input[type="email"]');
  const passwordInput = page.locator('input[type="password"]');
  const submitButton = page.locator('button[type="submit"]');

  await expect(emailInput).toBeVisible();
  await expect(passwordInput).toBeVisible();
  await expect(submitButton).toBeVisible();
});
