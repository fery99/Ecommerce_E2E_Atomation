import { test, expect } from '../utils/fixtures';
import { products } from '../utils/testData';

test.describe('Inventory / Product list', () => {
  test('TC-INV-01 menampilkan tepat 6 produk @smoke', async ({ loggedIn }) => {
    await expect(loggedIn.items).toHaveCount(products.totalCount);
  });

  test('TC-INV-02 setiap produk punya nama, deskripsi, harga, gambar, dan tombol @regression', async ({ loggedIn }) => {
    const count = await loggedIn.items.count();
    for (let i = 0; i < count; i++) {
      const item = loggedIn.items.nth(i);
      await expect(item.getByTestId('inventory-item-name')).not.toBeEmpty();
      await expect(item.getByTestId('inventory-item-desc')).not.toBeEmpty();
      await expect(item.getByTestId('inventory-item-price')).not.toBeEmpty();
      await expect(item.locator('img.inventory_item_img')).toBeVisible();
      await expect(item.getByRole('button', { name: 'Add to cart' })).toBeVisible();
    }
  });

  test('TC-INV-03 semua harga berformat $xx.xx dan bernilai > 0 @regression', async ({ loggedIn }) => {
    for (const text of await loggedIn.itemPrices.allTextContents()) {
      expect(text).toMatch(/^\$\d+\.\d{2}$/);
      expect(parseFloat(text.slice(1))).toBeGreaterThan(0);
    }
  });

  test('TC-INV-04 semua gambar produk berhasil dimuat @regression', async ({ loggedIn }) => {
    const widths = await loggedIn.itemImages.evaluateAll((imgs) =>
      imgs.map((img) => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth),
    );
    expect(widths).toHaveLength(products.totalCount);
    for (const w of widths) expect(w).toBeGreaterThan(0);
  });

  test('TC-INV-05 tidak ada nama produk yang duplikat @regression', async ({ loggedIn }) => {
    const names = await loggedIn.getNames();
    expect(new Set(names).size).toBe(names.length);
  });

  test('TC-INV-06 nama dan harga produk sesuai data referensi @regression', async ({ loggedIn }) => {
    const names = await loggedIn.getNames();
    const prices = await loggedIn.getPrices();
    const actual = names.map((name, i) => ({ name, price: prices[i] }));
    const expected = products.catalog.map(({ name, price }) => ({ name, price }));
    expect(actual).toEqual(expect.arrayContaining(expected));
  });

  test('TC-INV-07 klik nama produk membuka halaman detail @regression', async ({ page, loggedIn, productPage }) => {
    await loggedIn.openProductByName(products.single);
    await expect(page).toHaveURL(/inventory-item\.html\?id=4/);
    await expect(productPage.name).toHaveText(products.single);
  });

  test('TC-INV-08 klik gambar produk membuka halaman detail @regression', async ({ page, loggedIn, productPage }) => {
    await loggedIn.openProductByImage(products.single);
    await expect(page).toHaveURL(/inventory-item\.html/);
    await expect(productPage.name).toHaveText(products.single);
  });

  test('TC-INV-09 tombol berubah menjadi Remove setelah Add to cart @smoke', async ({ loggedIn }) => {
    await loggedIn.addToCart(products.single);
    await expect(loggedIn.removeButton(products.single)).toHaveText('Remove');
    await expect(loggedIn.addButton(products.single)).toHaveCount(0);
  });

  test('TC-INV-10 tombol kembali menjadi Add to cart setelah Remove @regression', async ({ loggedIn }) => {
    await loggedIn.addToCart(products.single);
    await loggedIn.removeFromCart(products.single);
    await expect(loggedIn.addButton(products.single)).toHaveText('Add to cart');
  });

  test('TC-INV-11 judul Products dan logo Swag Labs tampil @regression', async ({ page, loggedIn }) => {
    await expect(loggedIn.title).toHaveText('Products');
    await expect(page.locator('.app_logo')).toHaveText('Swag Labs');
    await expect(page).toHaveTitle('Swag Labs');
  });

  test('TC-INV-12 status tombol Remove tetap ada setelah reload @regression', async ({ page, loggedIn }) => {
    await loggedIn.addToCart(products.single);
    await page.reload();
    await expect(loggedIn.removeButton(products.single)).toBeVisible();
  });
});
