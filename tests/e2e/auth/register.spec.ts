import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/register.page';
import { buildRegistrationProfile } from '../../utils/registration-data';

test.use({ baseURL: 'https://automationexercise.com' });

test.describe('Automation Exercise registration', () => {
  test('should register a new user and then delete the account', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const user = buildRegistrationProfile();

    await registerPage.openHomePage();
    await registerPage.expectHomePageVisible();

    await registerPage.openSignupLogin();
    await registerPage.expectSignupPromptVisible();

    await registerPage.createAccount(user);
    await registerPage.continueAfterAccountCreated();

    await expect(registerPage.loggedInAs(user.fullName)).toBeVisible();

    await registerPage.deleteAccount();
    await registerPage.continueAfterDeletion();
    await expect(registerPage.page.getByRole('heading', { name: 'Automation Exercise' })).toBeVisible();
  });
});
