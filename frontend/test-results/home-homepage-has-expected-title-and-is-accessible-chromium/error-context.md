# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> homepage has expected title and is accessible
- Location: tests/home.spec.ts:4:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:3000/
Call log:
  - navigating to "http://127.0.0.1:3000/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import AxeBuilder from '@axe-core/playwright';
  3  |
  4  | test('homepage has expected title and is accessible', async ({ page }) => {
> 5  |   await page.goto('/');
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:3000/
  6  |   await expect(page).toHaveTitle(/SyncSanctuary/);
  7  |
  8  |   // Analyze accessibility
  9  |   const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  10 |   expect(accessibilityScanResults.violations).toEqual([]);
  11 | });
  12 |
```