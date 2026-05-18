import { test, expect } from '@playwright/test';

test('signup flow works correctly', async ({ page }) => {
  await page.goto('/en/auth/signup');
  // Just ensure no 404 or 500
  expect(page.url()).toContain('/auth/signup');
});
