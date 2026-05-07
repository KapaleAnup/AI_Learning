import { Page } from '@playwright/test';
import { test, expect } from '../../fixtures/auth.fixture';
import { credentials } from '../../utils/test-data';

async function mountLoginPage(page: Page) {
  await page.setContent(`
    <main>
      <h1 hidden>Welcome</h1>
      <form aria-label="Login form">
        <label>
          Email
          <input type="email" aria-label="Email" />
        </label>
        <label>
          Password
          <input type="password" aria-label="Password" />
        </label>
        <button type="submit">Sign in</button>
        <a href="/forgot-password">Forgot password?</a>
      </form>
      <p role="alert" hidden>Invalid email or password</p>
    </main>
    <script>
      const form = document.querySelector('form');
      const alert = document.querySelector('[role="alert"]');
      const welcome = document.querySelector('h1');

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]').value;

        if (email === 'user@example.com' && password === 'SecurePass123!') {
          alert.hidden = true;
          welcome.hidden = false;
          location.hash = 'dashboard';
        } else {
          alert.hidden = false;
          welcome.hidden = true;
        }
      });
    </script>
  `);
}

test.describe('Login functionality', () => {
  test.beforeEach(async ({ page }) => {
    await mountLoginPage(page);
  });

  test('should login with valid credentials', async ({ page, loginPage }) => {
    await loginPage.login(credentials.validUser.email, credentials.validUser.password);
    await expect(page).toHaveURL(/#dashboard/);
    await loginPage.expectWelcome();
  });

  test('should show error for invalid credentials', async ({ loginPage }) => {
    await loginPage.login(credentials.invalidUser.email, credentials.invalidUser.password);
    await loginPage.expectErrorMessage('Invalid email or password');
  });
});
