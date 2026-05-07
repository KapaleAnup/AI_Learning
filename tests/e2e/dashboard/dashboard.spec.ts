import { Page } from '@playwright/test';
import { test, expect } from '../../fixtures/auth.fixture';

async function mountDashboardPage(page: Page) {
  await page.setContent(`
    <main>
      <h1>Dashboard</h1>
      <section data-testid="stats-card">Active users: 24</section>
    </main>
  `);
}

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await mountDashboardPage(page);
  });

  test('should render the dashboard shell', async ({ dashboardPage }) => {
    await dashboardPage.expectLoaded();
    await expect(dashboardPage.statsCard).toContainText('Active users: 24');
  });
});
