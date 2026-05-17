import { test, expect } from '@playwright/test';

test('signup flow works correctly', async ({ page }) => {
  await page.goto('/en/auth/signup');
  await expect(page.locator('h1')).toContainText('Enter your phone number');

  // Basic rendering sanity check since we're not hooking into real SMS provider in CI
  const phoneInput = page.locator('input[name="phone_number"]');
  await expect(phoneInput).toBeVisible();
});
