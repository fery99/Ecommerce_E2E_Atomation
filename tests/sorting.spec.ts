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
});
