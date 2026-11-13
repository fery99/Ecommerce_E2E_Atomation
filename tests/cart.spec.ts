import { test } from '../utils/fixtures';
import { products } from '../utils/testData';

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
});
