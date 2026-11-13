import { test, expect, loginAs } from '../utils/fixtures';
import { users } from '../utils/testData';

test.describe('Login dengan semua jenis user', () => {
  const ids: Record<string, string> = {
    standard: 'TC-USER-01',
    problem: 'TC-USER-02',
    performance: 'TC-USER-03',
    error: 'TC-USER-04',
    visual: 'TC-USER-05',
  };

  for (const [key, user] of Object.entries(users)) {
    test(`${ids[key]} ${user.username} bisa login ke halaman Products @regression`, async ({ page, inventoryPage }) => {
      await loginAs(page, user);
      await inventoryPage.expectLoaded();
    });
  }

  test('TC-USER-06 performance_glitch_user login selesai < 10 detik @regression', async ({ page, inventoryPage }) => {
    const start = Date.now();
    await loginAs(page, users.performance);
    await inventoryPage.expectLoaded();
    const duration = Date.now() - start;
    test.info().annotations.push({ type: 'login duration (ms)', description: String(duration) });
    expect(duration).toBeLessThan(10_000);
  });

  test('TC-USER-07 halaman login menampilkan daftar username yang tersedia @regression', async ({ page, loginPage }) => {
    await loginPage.goto();
    const list = page.getByTestId('login-credentials');
    for (const user of [...Object.values(users).map((u) => u.username), 'locked_out_user']) {
      await expect(list).toContainText(user);
    }
  });
});
