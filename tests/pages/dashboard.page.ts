import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class DashboardPage extends BasePage {
  readonly heading: Locator;
  readonly statsCard: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Dashboard' });
    this.statsCard = page.getByTestId('stats-card');
  }

  async goto(): Promise<void> {
    await this.navigate('/dashboard');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.heading).toBeVisible();
    await expect(this.statsCard).toBeVisible();
  }
}
