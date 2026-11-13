import { Page, Locator } from '@playwright/test';

/** Burger menu + footer, tersedia di semua halaman setelah login */
export class MenuComponent {
  readonly openButton: Locator;
  readonly closeButton: Locator;
  readonly links: Locator;
  readonly allItems: Locator;
  readonly about: Locator;
  readonly logout: Locator;
  readonly reset: Locator;
  readonly socialX: Locator;
  readonly socialFacebook: Locator;
  readonly socialLinkedin: Locator;
  readonly footerCopy: Locator;

  constructor(private readonly page: Page) {
    this.openButton = page.getByRole('button', { name: 'Open Menu' });
    this.closeButton = page.getByRole('button', { name: 'Close Menu' });
    this.links = page.locator('.bm-item-list a');
    this.allItems = page.getByTestId('inventory-sidebar-link');
    this.about = page.getByTestId('about-sidebar-link');
    this.logout = page.getByTestId('logout-sidebar-link');
    this.reset = page.getByTestId('reset-sidebar-link');
    this.socialX = page.getByTestId('social-x');
    this.socialFacebook = page.getByTestId('social-facebook');
    this.socialLinkedin = page.getByTestId('social-linkedin');
    this.footerCopy = page.getByTestId('footer-copy');
  }

  async open() {
    await this.openButton.click();
  }

  async click(item: Locator) {
    await this.open();
    await item.click();
  }
}
