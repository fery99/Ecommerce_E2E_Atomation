/**
 * Bug hunting dengan user khusus SauceDemo.
 * Test di sini menyatakan PERILAKU YANG BENAR dan ditandai test.fail(),
 * jadi bug terdokumentasi di report tanpa membuat CI merah.
 * Kalau suatu hari bug diperbaiki, test akan "unexpectedly passed" dan CI memberi tahu kita.
 */
import { test, expect, loginAs, customer } from '../utils/fixtures';
import { users, products } from '../utils/testData';

test.describe('Known bugs - problem_user', () => {
  test.beforeEach(async ({ page, inventoryPage }) => {
    await loginAs(page, users.problem);
    await inventoryPage.expectLoaded();
  });

  test('TC-BUG-01 setiap produk seharusnya memiliki gambar berbeda @known-bug', async ({ inventoryPage }) => {
    test.fail(true, 'BUG-001: semua gambar produk identik');
    const srcs = await inventoryPage.itemImages.evaluateAll((imgs) => imgs.map((i) => i.getAttribute('src')));
    expect(new Set(srcs).size).toBe(srcs.length);
  });

  test('TC-BUG-02 sort Z-A seharusnya mengurutkan produk @known-bug', async ({ inventoryPage }) => {
    test.fail(true, 'BUG-003: sorting tidak berfungsi');
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.getNames();
    expect(names).toEqual([...names].sort().reverse());
  });

  test('TC-BUG-03 semua produk seharusnya bisa ditambahkan ke cart @known-bug', async ({ inventoryPage }) => {
    test.fail(true, 'BUG-004: beberapa produk tidak bisa di-add to cart');
    for (const p of products.catalog) await inventoryPage.addToCart(p.name);
    await inventoryPage.expectCartCount(6);
  });

  test('TC-BUG-04 field Last Name seharusnya bisa diisi saat checkout @known-bug', async ({ inventoryPage, cartPage, checkoutPage }) => {
    test.fail(true, 'BUG-002: input Last Name menimpa First Name');
    await inventoryPage.addToCart(products.single);
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.lastName.fill(customer.lastName);
    await expect(checkoutPage.lastName).toHaveValue(customer.lastName, { timeout: 3000 });
  });

  test('TC-BUG-05 detail produk seharusnya sesuai produk yang diklik @known-bug', async ({ inventoryPage, productPage }) => {
    test.fail(true, 'BUG-005: halaman detail menampilkan produk lain');
    await inventoryPage.openProductByName(products.single);
    await expect(productPage.name).toHaveText(products.single, { timeout: 3000 });
  });
});

test.describe('Known bugs - error_user', () => {
  test.beforeEach(async ({ page, inventoryPage }) => {
    await loginAs(page, users.error);
    await inventoryPage.expectLoaded();
  });

  test('TC-BUG-06 produk seharusnya bisa di-remove dari inventory @known-bug', async ({ inventoryPage }) => {
    test.fail(true, 'BUG-006: tombol Remove tidak berfungsi');
    await inventoryPage.addToCart(products.single);
    await inventoryPage.removeFromCart(products.single);
    await inventoryPage.expectCartCount(0);
  });

  test('TC-BUG-07 tombol Finish seharusnya menyelesaikan order @known-bug', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    test.fail(true, 'BUG-011: tombol Finish tidak menyelesaikan checkout');
    await inventoryPage.addToCart(products.single);
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInfo(customer);
    await checkoutPage.finish();
    await expect(page).toHaveURL(/checkout-complete\.html/, { timeout: 3000 });
  });
});

test.describe('Special users - stability', () => {
  test('TC-BUG-08 visual_user harga produk seharusnya sama dengan katalog @known-bug', async ({ page, inventoryPage }) => {
    test.fail(true, 'BUG-012: harga produk tampil berbeda untuk visual_user');
    await loginAs(page, users.visual);
    const prices = await inventoryPage.getPrices();
    const names = await inventoryPage.getNames();
    const actual = names.map((name, i) => ({ name, price: prices[i] }));
    expect(actual).toEqual(expect.arrayContaining(products.catalog.map(({ name, price }) => ({ name, price }))));
  });

  test('TC-BUG-09 performance_glitch_user tetap bisa checkout end-to-end @regression', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    test.setTimeout(60_000);
    await loginAs(page, users.performance);
    await inventoryPage.expectLoaded();
    await inventoryPage.addToCart(products.single);
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInfo(customer);
    await checkoutPage.finish();
    await checkoutPage.expectOrderComplete();
  });
});
