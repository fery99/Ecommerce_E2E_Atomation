import { test, expect } from '../utils/fixtures';
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
    await expect(page).toHaveURL('/');
    await expect(loginPage.loginButton).toBeVisible();
  });

  // Data-driven dari test-data/users.json (termasuk input security)
  for (const data of invalidLogins) {
    test(`${data.id} login gagal - ${data.case} @regression`, async ({ page, loginPage }) => {
      await loginPage.login(data.username, data.password);
      await loginPage.expectError(data.error);
      await expect(page).toHaveURL('/');
    });
  }

  test('TC-LOGIN-08 akses inventory tanpa login ditolak @regression', async ({ page, loginPage }) => {
    await page.goto('/inventory.html');
    await loginPage.expectError("You can only access '/inventory.html' when you are logged in.");
  });

  test('TC-LOGIN-12 tombol X menutup pesan error @regression', async ({ loginPage, page }) => {
    await loginPage.login('', '');
    await expect(loginPage.username).toHaveClass(/error/);
    await page.getByTestId('error-button').click();
    await expect(loginPage.errorMessage).toHaveCount(0);
  });

  test('TC-LOGIN-17 highlight merah field hilang setelah error ditutup @regression @known-bug', async ({ loginPage, page }) => {
    test.fail(true, 'BUG-013: field tetap ber-highlight merah setelah pesan error ditutup');
    await loginPage.login('', '');
    await page.getByTestId('error-button').click();
    await expect(loginPage.username).not.toHaveClass(/error/, { timeout: 3000 });
  });

  test('TC-LOGIN-13 login dengan tombol Enter @regression', async ({ loginPage, inventoryPage }) => {
    await loginPage.username.fill(users.standard.username);
    await loginPage.password.fill(users.standard.password);
    await loginPage.password.press('Enter');
    await inventoryPage.expectLoaded();
  });

  test('TC-LOGIN-14 field password tersamarkan @regression', async ({ loginPage }) => {
    await expect(loginPage.password).toHaveAttribute('type', 'password');
  });

  test('TC-LOGIN-15 setelah logout tombol Back tidak membuka inventory @regression', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.logout();
    await page.goBack();
    await expect(loginPage.errorMessage).toContainText('when you are logged in');
  });

  for (const path of ['/cart.html', '/checkout-step-one.html', '/checkout-step-two.html', '/inventory-item.html?id=4']) {
    test(`TC-LOGIN-16 akses ${path} tanpa login ditolak @regression`, async ({ page, loginPage }) => {
      await page.goto(path);
      await expect(page).toHaveURL('/');
      await loginPage.expectError('when you are logged in');
    });
  }
});
