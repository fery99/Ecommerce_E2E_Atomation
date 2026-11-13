import { test, expect, customer } from '../utils/fixtures';
import { products, loadCheckoutData } from '../utils/testData';
import type { InventoryPage } from '../pages/InventoryPage';
import type { CartPage } from '../pages/CartPage';

async function goToCheckout(inv: InventoryPage, cart: CartPage, items: string[] = [products.single]) {
  for (const p of items) await inv.addToCart(p);
  await inv.openCart();
  await cart.checkout();
}

test.describe('Checkout - information', () => {
  // Data-driven dari test-data/checkout.csv
  for (const row of loadCheckoutData()) {
    test(`${row.id} validasi form checkout - ${row.expectedError} @regression`, async ({ loggedIn, cartPage, checkoutPage }) => {
      await goToCheckout(loggedIn, cartPage);
      await checkoutPage.fillInfo(row);
      await expect(checkoutPage.errorMessage).toContainText(row.expectedError);
    });
  }

  test('TC-CHKI-02 Cancel kembali ke cart dan item tetap ada @regression', async ({ loggedIn, cartPage, checkoutPage }) => {
    await goToCheckout(loggedIn, cartPage);
    await checkoutPage.cancelButton.click();
    await cartPage.expectLoaded();
    await cartPage.expectItems([products.single]);
  });

  test('TC-CHKI-03 pesan error hilang setelah klik X @regression', async ({ loggedIn, cartPage, checkoutPage }) => {
    await goToCheckout(loggedIn, cartPage);
    await checkoutPage.continueButton.click();
    await checkoutPage.errorClose.click();
    await expect(checkoutPage.errorMessage).toHaveCount(0);
  });

  test('TC-CHKI-04 nama dengan karakter spesial/unicode diterima @regression', async ({ page, loggedIn, cartPage, checkoutPage }) => {
    await goToCheckout(loggedIn, cartPage);
    await checkoutPage.fillInfo({ firstName: 'José', lastName: "O'Brien-Ñúñez", postalCode: '12345' });
    await expect(page).toHaveURL(/checkout-step-two\.html/);
  });

  test('TC-CHKI-05 postal code berisi huruf seharusnya ditolak @regression @known-bug', async ({ page, loggedIn, cartPage, checkoutPage }) => {
    test.fail(true, 'BUG-010: postal code tidak divalidasi, huruf tetap diterima');
    await goToCheckout(loggedIn, cartPage);
    await checkoutPage.fillInfo({ ...customer, postalCode: 'abcde' });
    await expect(page).toHaveURL(/checkout-step-one\.html/, { timeout: 3000 });
  });

  test('TC-CHKI-06 input sangat panjang (255 karakter) tidak merusak form @regression', async ({ page, loggedIn, cartPage, checkoutPage }) => {
    await goToCheckout(loggedIn, cartPage);
    const long = 'A'.repeat(255);
    await checkoutPage.fillInfo({ firstName: long, lastName: long, postalCode: '12345' });
    await expect(page).toHaveURL(/checkout-step-two\.html/);
  });

  test('TC-CHKI-07 nama berisi spasi saja seharusnya ditolak @regression @known-bug', async ({ page, loggedIn, cartPage, checkoutPage }) => {
    test.fail(true, 'BUG-009: field berisi spasi saja dianggap valid');
    await goToCheckout(loggedIn, cartPage);
    await checkoutPage.fillInfo({ firstName: '   ', lastName: '   ', postalCode: '   ' });
    await expect(checkoutPage.errorMessage).toBeVisible({ timeout: 3000 });
  });
});

test.describe('Checkout - overview & complete', () => {
  test('TC-CHK-01 checkout end-to-end berhasil @smoke', async ({ loggedIn, cartPage, checkoutPage }) => {
    await goToCheckout(loggedIn, cartPage, products.multiple);
    await checkoutPage.fillInfo(customer);
    await checkoutPage.finish();
    await checkoutPage.expectOrderComplete();
    await loggedIn.expectCartCount(0);
  });

  test('TC-CHK-02 kalkulasi subtotal, tax, dan total benar @regression', async ({ loggedIn, cartPage, checkoutPage }) => {
    await goToCheckout(loggedIn, cartPage, products.multiple);
    await checkoutPage.fillInfo(customer);
    const s = await checkoutPage.getSummary();
    expect(s.subtotal).toBeCloseTo(s.itemsSum, 2);
    expect(s.total).toBeCloseTo(s.subtotal + s.tax, 2);
  });

  test('TC-CHKO-01 item di overview sama dengan item di cart @regression', async ({ loggedIn, cartPage, checkoutPage }) => {
    await goToCheckout(loggedIn, cartPage, products.multiple);
    await checkoutPage.fillInfo(customer);
    await expect(checkoutPage.itemNames).toHaveText(products.multiple);
  });

  // Data-driven: kombinasi produk dari products.json
  for (const combo of products.combos) {
    test(`TC-CHKO-02 tax 8% dan total benar - ${combo.case} @regression`, async ({ loggedIn, cartPage, checkoutPage }) => {
      await goToCheckout(loggedIn, cartPage, combo.items);
      await checkoutPage.fillInfo(customer);
      const expectedSubtotal = combo.items
        .map((n) => products.catalog.find((c) => c.name === n)!.price)
        .reduce((a, b) => a + b, 0);
      const expectedTax = Math.round(expectedSubtotal * 0.08 * 100) / 100;
      const s = await checkoutPage.getSummary();
      expect(s.subtotal).toBeCloseTo(expectedSubtotal, 2);
      expect(s.tax).toBeCloseTo(expectedTax, 2);
      expect(s.total).toBeCloseTo(expectedSubtotal + expectedTax, 2);
    });
  }

  test('TC-CHKO-03 info payment dan shipping tampil @regression', async ({ loggedIn, cartPage, checkoutPage }) => {
    await goToCheckout(loggedIn, cartPage);
    await checkoutPage.fillInfo(customer);
    await expect(checkoutPage.paymentInfo).toHaveText('SauceCard #31337');
    await expect(checkoutPage.shippingInfo).toHaveText('Free Pony Express Delivery!');
  });

  test('TC-CHKO-04 Cancel di overview kembali ke inventory dan cart tetap @regression', async ({ loggedIn, cartPage, checkoutPage }) => {
    await goToCheckout(loggedIn, cartPage);
    await checkoutPage.fillInfo(customer);
    await checkoutPage.cancelButton.click();
    await loggedIn.expectLoaded();
    await loggedIn.expectCartCount(1);
  });

  test('TC-CHKO-05 checkout dengan cart kosong seharusnya diblokir @regression @known-bug', async ({ page, loggedIn, cartPage }) => {
    test.fail(true, 'BUG-008: checkout bisa dilanjutkan dengan cart kosong');
    await loggedIn.openCart();
    await cartPage.checkout();
    await expect(page).toHaveURL(/cart\.html/, { timeout: 3000 });
  });

  test('TC-CHKC-01 halaman complete menampilkan ikon, judul, dan teks konfirmasi @regression', async ({ loggedIn, cartPage, checkoutPage }) => {
    await goToCheckout(loggedIn, cartPage);
    await checkoutPage.fillInfo(customer);
    await checkoutPage.finish();
    await expect(checkoutPage.completeImage).toBeVisible();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
    await expect(checkoutPage.completeText).toContainText('dispatched');
  });

  test('TC-CHKC-02 Back Home kembali ke inventory dengan cart kosong @regression', async ({ loggedIn, cartPage, checkoutPage }) => {
    await goToCheckout(loggedIn, cartPage);
    await checkoutPage.fillInfo(customer);
    await checkoutPage.finish();
    await checkoutPage.backHomeButton.click();
    await loggedIn.expectLoaded();
    await loggedIn.expectCartCount(0);
    await expect(loggedIn.addButton(products.single)).toBeVisible();
  });

  test('TC-CHKC-03 checkout semua 6 produk berhasil @regression', async ({ loggedIn, cartPage, checkoutPage }) => {
    await goToCheckout(loggedIn, cartPage, products.catalog.map((p) => p.name));
    await checkoutPage.fillInfo(customer);
    await expect(checkoutPage.itemNames).toHaveCount(6);
    await checkoutPage.finish();
    await checkoutPage.expectOrderComplete();
  });

  test('TC-CHKC-04 halaman complete tidak bisa dibuka tanpa login @regression', async ({ page, loginPage }) => {
    await page.goto('/checkout-complete.html');
    await expect(page).toHaveURL('/');
    await loginPage.expectError('when you are logged in');
  });
});
