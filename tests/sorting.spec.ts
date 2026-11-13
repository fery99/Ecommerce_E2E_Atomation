import { test, expect } from '../utils/fixtures';
import { products } from '../utils/testData';

test.describe('Product sorting', () => {
  test('TC-SORT-01 default menampilkan semua produk urut A-Z @smoke', async ({ loggedIn }) => {
    const names = await loggedIn.getNames();
    expect(names).toHaveLength(products.totalCount);
    expect(names).toEqual([...names].sort());
  });

  test('TC-SORT-02 sort Name Z-A @regression', async ({ loggedIn }) => {
    await loggedIn.sortBy('za');
    const names = await loggedIn.getNames();
    expect(names).toEqual([...names].sort().reverse());
  });

  test('TC-SORT-03 sort Price low-high @regression', async ({ loggedIn }) => {
    await loggedIn.sortBy('lohi');
    const prices = await loggedIn.getPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('TC-SORT-04 sort Price high-low @regression', async ({ loggedIn }) => {
    await loggedIn.sortBy('hilo');
    const prices = await loggedIn.getPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('TC-SORT-05 dropdown memiliki 4 opsi dengan label benar @regression', async ({ loggedIn }) => {
    await expect(loggedIn.sortDropdown.locator('option')).toHaveText([
      'Name (A to Z)',
      'Name (Z to A)',
      'Price (low to high)',
      'Price (high to low)',
    ]);
  });

  const labels = [
    { value: 'za', label: 'Name (Z to A)' },
    { value: 'lohi', label: 'Price (low to high)' },
    { value: 'hilo', label: 'Price (high to low)' },
  ] as const;
  for (const { value, label } of labels) {
    test(`TC-SORT-06 label aktif sesuai pilihan - ${label} @regression`, async ({ loggedIn }) => {
      await loggedIn.sortBy(value);
      await expect(loggedIn.activeSort).toHaveText(label);
    });
  }

  test('TC-SORT-07 sorting kembali ke A-Z setelah reload @regression', async ({ page, loggedIn }) => {
    await loggedIn.sortBy('za');
    await page.reload();
    await expect(loggedIn.activeSort).toHaveText('Name (A to Z)');
  });

  test('TC-SORT-08 isi cart tidak berubah setelah sorting diganti @regression', async ({ loggedIn }) => {
    for (const p of products.multiple) await loggedIn.addToCart(p);
    await loggedIn.sortBy('hilo');
    await loggedIn.expectCartCount(products.multiple.length);
    for (const p of products.multiple) await expect(loggedIn.removeButton(p)).toBeVisible();
  });
});
