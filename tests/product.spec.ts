import { test, expect } from '../utils/fixtures';
import { products } from '../utils/testData';

test.describe('Product detail', () => {
  test('TC-PDP-01 nama, deskripsi, dan harga di detail sama dengan di list @smoke', async ({ loggedIn, productPage }) => {
    const first = loggedIn.items.first();
    const name = await first.getByTestId('inventory-item-name').textContent();
    const desc = await first.getByTestId('inventory-item-desc').textContent();
    const price = await first.getByTestId('inventory-item-price').textContent();
    await loggedIn.openProductByName(name!);
    await expect(productPage.name).toHaveText(name!);
    await expect(productPage.desc).toHaveText(desc!);
    await expect(productPage.price).toHaveText(price!);
  });

  test('TC-PDP-02 add to cart dari halaman detail @regression', async ({ loggedIn, productPage }) => {
    await productPage.goto(4);
    await productPage.addButton.click();
    await expect(productPage.removeButton).toBeVisible();
    await loggedIn.expectCartCount(1);
  });

  test('TC-PDP-03 remove dari halaman detail @regression', async ({ loggedIn, productPage }) => {
    await productPage.goto(4);
    await productPage.addButton.click();
    await productPage.removeButton.click();
    await expect(productPage.addButton).toBeVisible();
    await loggedIn.expectCartCount(0);
  });

  test('TC-PDP-04 Back to products kembali ke list @regression', async ({ loggedIn, productPage }) => {
    await productPage.goto(4);
    await productPage.backButton.click();
    await loggedIn.expectLoaded();
  });

  // Data-driven: semua produk di katalog
  for (const p of products.catalog) {
    test(`TC-PDP-05 detail produk id=${p.id} - ${p.name} @regression`, async ({ loggedIn, productPage }) => {
      await productPage.goto(p.id);
      await expect(productPage.name).toHaveText(p.name);
      await expect(productPage.price).toHaveText(`$${p.price}`);
      await expect(productPage.desc).not.toBeEmpty();
    });
  }

  test('TC-PDP-06 id produk tidak valid menampilkan ITEM NOT FOUND @regression', async ({ loggedIn, productPage }) => {
    await productPage.goto(99);
    await expect(productPage.name).toHaveText('ITEM NOT FOUND');
  });

  test('TC-PDP-07 status cart konsisten antara list dan detail @regression', async ({ loggedIn, productPage }) => {
    await loggedIn.addToCart(products.single);
    await loggedIn.openProductByName(products.single);
    await expect(productPage.removeButton).toBeVisible();
    await productPage.removeButton.click();
    await productPage.backButton.click();
    await expect(loggedIn.addButton(products.single)).toBeVisible();
  });

  test('TC-PDP-08 gambar detail sesuai dengan produk @regression', async ({ loggedIn, productPage }) => {
    await productPage.goto(4);
    await expect(productPage.image).toHaveAttribute('alt', products.single);
    await expect(productPage.image).toHaveAttribute('src', /backpack/i);
  });
});
