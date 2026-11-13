import { test, expect, loginAs } from '../utils/fixtures';
import { products, users } from '../utils/testData';

const allNames = products.catalog.map((p) => p.name);

test.describe('Cart', () => {
  test('TC-CART-01 tambah satu produk ke cart @smoke', async ({ loggedIn, cartPage }) => {
    await loggedIn.addToCart(products.single);
    await loggedIn.expectCartCount(1);
    await loggedIn.openCart();
    await cartPage.expectLoaded();
    await cartPage.expectItems([products.single]);
  });

  test('TC-CART-02 tambah beberapa produk ke cart @regression', async ({ loggedIn, cartPage }) => {
    for (const p of products.multiple) await loggedIn.addToCart(p);
    await loggedIn.expectCartCount(products.multiple.length);
    await loggedIn.openCart();
    await cartPage.expectItems(products.multiple);
  });

  test('TC-CART-03 hapus produk dari halaman inventory @regression', async ({ loggedIn }) => {
    await loggedIn.addToCart(products.single);
    await loggedIn.removeFromCart(products.single);
    await loggedIn.expectCartCount(0);
  });

  test('TC-CART-04 hapus produk dari halaman cart @regression', async ({ loggedIn, cartPage }) => {
    const [first, ...rest] = products.multiple;
    for (const p of products.multiple) await loggedIn.addToCart(p);
    await loggedIn.openCart();
    await cartPage.remove(first);
    await cartPage.expectItems(rest);
  });

  test('TC-CART-05 isi cart tetap ada setelah reload @regression', async ({ page, loggedIn }) => {
    await loggedIn.addToCart(products.single);
    await page.reload();
    await loggedIn.expectCartCount(1);
  });

  test('TC-CART-06 tambah semua 6 produk, badge = 6 @regression', async ({ loggedIn, cartPage }) => {
    for (const p of allNames) await loggedIn.addToCart(p);
    await loggedIn.expectCartCount(6);
    await loggedIn.openCart();
    await expect(cartPage.items).toHaveCount(6);
  });

  test('TC-CART-07 hapus semua item, cart kosong dan badge hilang @regression', async ({ loggedIn, cartPage }) => {
    for (const p of products.multiple) await loggedIn.addToCart(p);
    await loggedIn.openCart();
    for (const p of products.multiple) await cartPage.remove(p);
    await expect(cartPage.items).toHaveCount(0);
    await loggedIn.expectCartCount(0);
  });

  test('TC-CART-08 cart kosong tetap bisa dibuka @regression', async ({ loggedIn, cartPage }) => {
    await loggedIn.openCart();
    await cartPage.expectLoaded();
    await expect(cartPage.items).toHaveCount(0);
    await expect(cartPage.continueShoppingButton).toBeVisible();
  });

  test('TC-CART-09 quantity setiap item = 1 @regression', async ({ loggedIn, cartPage }) => {
    for (const p of products.multiple) await loggedIn.addToCart(p);
    await loggedIn.openCart();
    await expect(cartPage.quantities).toHaveText(products.multiple.map(() => '1'));
  });

  test('TC-CART-10 harga di cart sama dengan harga di katalog @regression', async ({ loggedIn, cartPage }) => {
    for (const p of products.multiple) await loggedIn.addToCart(p);
    await loggedIn.openCart();
    const expected = products.multiple.map((n) => `$${products.catalog.find((c) => c.name === n)!.price}`);
    await expect(cartPage.itemPrices).toHaveText(expected);
  });

  test('TC-CART-11 Continue Shopping kembali ke inventory dan cart tetap @regression', async ({ loggedIn, cartPage }) => {
    await loggedIn.addToCart(products.single);
    await loggedIn.openCart();
    await cartPage.continueShoppingButton.click();
    await loggedIn.expectLoaded();
    await loggedIn.expectCartCount(1);
  });

  test('TC-CART-12 cart tetap tersimpan setelah logout lalu login lagi @regression', async ({ page, loggedIn }) => {
    await loggedIn.addToCart(products.single);
    await loggedIn.logout();
    await loginAs(page, users.standard);
    await loggedIn.expectCartCount(1);
  });

  test('TC-CART-13 urutan item di cart sesuai urutan ditambahkan @regression', async ({ loggedIn, cartPage }) => {
    const order = [allNames[3], allNames[0], allNames[5]];
    for (const p of order) await loggedIn.addToCart(p);
    await loggedIn.openCart();
    await cartPage.expectItems(order);
  });

  test('TC-CART-14 klik nama item di cart membuka halaman detail @regression', async ({ loggedIn, cartPage, productPage }) => {
    await loggedIn.addToCart(products.single);
    await loggedIn.openCart();
    await cartPage.itemNames.first().click();
    await expect(productPage.name).toHaveText(products.single);
  });
});
