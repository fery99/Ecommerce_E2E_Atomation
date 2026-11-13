import { Page, Locator, expect } from '@playwright/test';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export const slug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

export class InventoryPage {
  readonly title: Locator;
  readonly sortDropdown: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.itemPrices = page.getByTestId('inventory-item-price');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.getByTestId('logout-sidebar-link');
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

  async addToCart(name: string) {
    await this.page.getByTestId(`add-to-cart-${slug(name)}`).click();
  }

  async removeFromCart(name: string) {
    await this.page.getByTestId(`remove-${slug(name)}`).click();
  }

  async expectCartCount(count: number) {
    if (count === 0) await expect(this.cartBadge).toHaveCount(0);
    else await expect(this.cartBadge).toHaveText(String(count));
  }

  async openCart() {
    await this.cartLink.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
