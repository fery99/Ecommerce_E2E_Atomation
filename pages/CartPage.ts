import { Page, Locator, expect } from '@playwright/test';
import { slug } from './InventoryPage';

export class CartPage {
  readonly itemNames: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(private readonly page: Page) {
    this.itemNames = page.getByTestId('inventory-item-name');
    this.checkoutButton = page.getByTestId('checkout');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/cart\.html/);
  }

  async expectItems(names: string[]) {
    await expect(this.itemNames).toHaveText(names);
  }

  async remove(name: string) {
    await this.page.getByTestId(`remove-${slug(name)}`).click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
