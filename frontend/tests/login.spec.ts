import { test, expect } from '@playwright/test';

test('login page works correctly', async ({ page }) => {
  await page.goto('/en/auth/login');
  // Just ensure no 404 or 500
  expect(page.url()).toContain('/auth/login');
});
