import { test } from '../utils/fixtures';
import { users, invalidLogins } from '../utils/testData';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('TC-LOGIN-01 login dengan standard_user berhasil @smoke', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.expectLoaded();
  });

  test('TC-LOGIN-02 logout kembali ke halaman login @regression', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.logout();
    await test.expect(page).toHaveURL('/');
    await test.expect(loginPage.loginButton).toBeVisible();
  });

  // Data-driven dari test-data/users.json
  for (const data of invalidLogins) {
    test(`${data.id} login gagal - ${data.case} @regression`, async ({ loginPage }) => {
      await loginPage.login(data.username, data.password);
      await loginPage.expectError(data.error);
    });
  }

  test('TC-LOGIN-08 akses inventory tanpa login ditolak @regression', async ({ page, loginPage }) => {
    await page.goto('/inventory.html');
    await loginPage.expectError("You can only access '/inventory.html' when you are logged in.");
  });
});
