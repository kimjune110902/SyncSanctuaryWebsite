import { test, expect } from '@playwright/test';

test('login page has expected fields', async ({ page }) => {
  await page.goto('/en/auth/login');
  await expect(page.locator('h1')).toContainText('Welcome back.');

  const idInput = page.locator('input[name="identifier"]');
  const pwdInput = page.locator('input[name="password"]');

  await expect(idInput).toBeVisible();
  await expect(pwdInput).toBeVisible();
});
