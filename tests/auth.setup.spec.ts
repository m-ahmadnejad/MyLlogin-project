import {test} from '@playwright/test'

test('authentication', async ({ page }) => {
 await page.goto('https://www.saucedemo.com/');
await page.fill('[data-test="username"]', 'standard_user');
await page.fill('[data-test="password"]', 'secret_sauce');
await page.click('[data-test="login-button"]');

// 🔥 THIS IS THE KEY LINE
await page.waitForURL('**/inventory.html');

await page.context().storageState({ path: 'playwright/.auth/user.json' });
})