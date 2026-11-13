import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage, CustomerInfo } from '../pages/CheckoutPage';
import { ProductPage } from '../pages/ProductPage';
import { MenuComponent } from '../pages/MenuComponent';
import { users } from './testData';

type Pages = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  productPage: ProductPage;
  menu: MenuComponent;
  /** Inventory page yang sudah login sebagai standard_user */
  loggedIn: InventoryPage;
};

export const customer: CustomerInfo = { firstName: 'John', lastName: 'Doe', postalCode: '12345' };

export async function loginAs(page: Page, user: { username: string; password: string }) {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(user.username, user.password);
}

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
  productPage: async ({ page }, use) => use(new ProductPage(page)),
  menu: async ({ page }, use) => use(new MenuComponent(page)),
  loggedIn: async ({ page, inventoryPage }, use) => {
    await loginAs(page, users.standard);
    await inventoryPage.expectLoaded();
    await use(inventoryPage);
  },
});

export { expect } from '@playwright/test';
