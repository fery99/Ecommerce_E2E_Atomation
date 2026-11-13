import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly name: Locator;
  readonly desc: Locator;
  readonly price: Locator;
  readonly image: Locator;
  readonly addButton: Locator;
  readonly removeButton: Locator;
  readonly backButton: Locator;

  constructor(private readonly page: Page) {
    this.name = page.getByTestId('inventory-item-name');
    this.desc = page.getByTestId('inventory-item-desc');
    this.price = page.getByTestId('inventory-item-price');
    this.image = page.locator('img.inventory_details_img');
    this.addButton = page.getByTestId('add-to-cart');
    this.removeButton = page.getByTestId('remove');
    this.backButton = page.getByTestId('back-to-products');
  }

  async goto(id: number | string) {
    await this.page.goto(`/inventory-item.html?id=${id}`);
  }
}
