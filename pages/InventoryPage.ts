import { Page, Locator, expect } from '@playwright/test';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export const slug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

export class InventoryPage {
  readonly title: Locator;
  readonly sortDropdown: Locator;
  readonly activeSort: Locator;
  readonly items: Locator;
  readonly itemNames: Locator;
  readonly itemDescs: Locator;
  readonly itemPrices: Locator;
  readonly itemImages: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.activeSort = page.getByTestId('active-option');
    this.items = page.getByTestId('inventory-item');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.itemDescs = page.getByTestId('inventory-item-desc');
    this.itemPrices = page.getByTestId('inventory-item-price');
    this.itemImages = page.locator('img.inventory_item_img');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.title).toHaveText('Products');
  }

  async sortBy(option: SortOption) {
    await this.sortDropdown.selectOption(option);
  }

  async getNames() {
    return this.itemNames.allTextContents();
  }

  async getPrices() {
    const raw = await this.itemPrices.allTextContents();
    return raw.map((p) => parseFloat(p.replace('$', '')));
  }

  addButton(name: string) {
    return this.page.getByTestId(`add-to-cart-${slug(name)}`);
  }

  removeButton(name: string) {
    return this.page.getByTestId(`remove-${slug(name)}`);
  }

  async addToCart(name: string) {
    await this.addButton(name).click();
  }

  async removeFromCart(name: string) {
    await this.removeButton(name).click();
  }

  async openProductByName(name: string) {
    await this.itemNames.filter({ hasText: name }).click();
  }

  async openProductByImage(name: string) {
    await this.page.getByTestId(`inventory-item-${slug(name)}-img`).click();
  }

  async expectCartCount(count: number) {
    if (count === 0) await expect(this.cartBadge).toHaveCount(0);
    else await expect(this.cartBadge).toHaveText(String(count));
  }

  async openCart() {
    await this.cartLink.click();
  }

  /** Kompatibel dengan test lama */
  async logout() {
    await this.page.getByRole('button', { name: 'Open Menu' }).click();
    await this.page.getByTestId('logout-sidebar-link').click();
  }
}
