import { test, expect } from '../utils/fixtures';
import { products } from '../utils/testData';

test.describe('Menu & navigasi', () => {
  test('TC-NAV-01 burger menu menampilkan semua item menu @regression', async ({ loggedIn, menu }) => {
    await menu.open();
    await expect(menu.allItems).toBeVisible();
    await expect(menu.about).toBeVisible();
    await expect(menu.logout).toBeVisible();
    await expect(menu.reset).toBeVisible();
  });

  test('TC-NAV-02 tombol X menutup menu @regression', async ({ loggedIn, menu }) => {
    await menu.open();
    await menu.closeButton.click();
    await expect(menu.allItems).toBeHidden();
  });

  test('TC-NAV-03 All Items kembali ke inventory dari halaman cart @regression', async ({ loggedIn, cartPage, menu }) => {
    await loggedIn.openCart();
    await menu.click(menu.allItems);
    await loggedIn.expectLoaded();
  });

  test('TC-NAV-04 link About mengarah ke saucelabs.com @regression', async ({ loggedIn, menu }) => {
    await menu.open();
    await expect(menu.about).toHaveAttribute('href', /saucelabs\.com/);
  });

  test('TC-NAV-05 Reset App State mengosongkan cart @regression', async ({ loggedIn, menu }) => {
    for (const p of products.multiple) await loggedIn.addToCart(p);
    await menu.click(menu.reset);
    await loggedIn.expectCartCount(0);
  });

  test('TC-NAV-06 Reset App State mengembalikan tombol ke Add to cart @regression @known-bug', async ({ loggedIn, menu }) => {
    test.fail(true, 'BUG-007: tombol tetap "Remove" setelah reset sampai halaman di-reload');
    await loggedIn.addToCart(products.single);
    await menu.click(menu.reset);
    await expect(loggedIn.addButton(products.single)).toBeVisible({ timeout: 3000 });
  });

  const socials = [
    { id: 'TC-NAV-07', name: 'X', key: 'socialX', url: /x\.com\/saucelabs/ },
    { id: 'TC-NAV-08', name: 'Facebook', key: 'socialFacebook', url: /facebook\.com\/saucelabs/ },
    { id: 'TC-NAV-09', name: 'LinkedIn', key: 'socialLinkedin', url: /linkedin\.com\/company\/sauce-labs/ },
  ] as const;
  for (const s of socials) {
    test(`${s.id} footer link ${s.name} benar dan terbuka di tab baru @regression`, async ({ loggedIn, menu }) => {
      await expect(menu[s.key]).toHaveAttribute('href', s.url);
      await expect(menu[s.key]).toHaveAttribute('target', '_blank');
    });
  }

  test('TC-NAV-10 footer menampilkan copyright tahun berjalan @regression', async ({ loggedIn, menu }) => {
    await expect(menu.footerCopy).toContainText('Sauce Labs');
    await expect(menu.footerCopy).toContainText(/©\s*\d{4}/);
  });
});
