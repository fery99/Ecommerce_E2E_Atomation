import { test, expect } from '../utils/fixtures';
import { products, loadCheckoutData } from '../utils/testData';

const customer = { firstName: 'John', lastName: 'Doe', postalCode: '12345' };

test.describe('Checkout', () => {
  test('TC-CHK-01 checkout end-to-end berhasil @smoke', async ({ loggedIn, cartPage, checkoutPage }) => {
    for (const p of products.multiple) await loggedIn.addToCart(p);
    await loggedIn.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInfo(customer);
    await checkoutPage.finish();
    await checkoutPage.expectOrderComplete();
    await loggedIn.expectCartCount(0);
  });

  test('TC-CHK-02 kalkulasi subtotal, tax, dan total benar @regression', async ({ loggedIn, cartPage, checkoutPage }) => {
    for (const p of products.multiple) await loggedIn.addToCart(p);
    await loggedIn.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInfo(customer);
    const s = await checkoutPage.getSummary();
    expect(s.subtotal).toBeCloseTo(s.itemsSum, 2);
    expect(s.total).toBeCloseTo(s.subtotal + s.tax, 2);
  });

  // Data-driven dari test-data/checkout.csv
  for (const row of loadCheckoutData()) {
    test(`${row.id} validasi form checkout - ${row.expectedError} @regression`, async ({ loggedIn, cartPage, checkoutPage }) => {
      await loggedIn.addToCart(products.single);
      await loggedIn.openCart();
      await cartPage.checkout();
      await checkoutPage.fillInfo(row);
      await expect(checkoutPage.errorMessage).toContainText(row.expectedError);
    });
  }
});
