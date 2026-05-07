import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export type RegistrationProfile = {
  title: 'Mr.' | 'Mrs.';
  fullName: string;
  email: string;
  password: string;
  day: string;
  month: string;
  year: string;
  newsletter: boolean;
  specialOffers: boolean;
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
};

export class RegisterPage extends BasePage {
  readonly signupName: Locator;
  readonly signupEmail: Locator;
  readonly signupButton: Locator;
  readonly accountInfoHeading: Locator;
  readonly accountCreatedHeading: Locator;
  readonly accountDeletedHeading: Locator;
  readonly loggedInAs: (name: string) => Locator;

  constructor(page: Page) {
    super(page);
    this.signupName = page.locator('input[data-qa="signup-name"]');
    this.signupEmail = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.getByRole('button', { name: 'Signup' });
    this.accountInfoHeading = page.getByText(/enter account information/i);
    this.accountCreatedHeading = page.getByText(/account created!/i);
    this.accountDeletedHeading = page.getByText(/account deleted!/i);
    this.loggedInAs = (name: string) => page.getByText(`Logged in as ${name}`, { exact: true });
  }

  async openHomePage(): Promise<void> {
    await this.page.goto('/');
  }

  async expectHomePageVisible(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Automation Exercise' })).toBeVisible();
  }

  async openSignupLogin(): Promise<void> {
    await this.page.getByRole('link', { name: 'Signup / Login' }).click();
  }

  async expectSignupPromptVisible(): Promise<void> {
    await expect(this.page.getByText('New User Signup!', { exact: true })).toBeVisible();
  }

  async createAccount(profile: RegistrationProfile): Promise<void> {
    await this.signupName.fill(profile.fullName);
    await this.signupEmail.fill(profile.email);
    await this.signupButton.click();

    await expect(this.accountInfoHeading).toBeVisible();

    if (profile.title === 'Mr.') {
      await this.page.locator('#id_gender1').check();
    } else {
      await this.page.locator('#id_gender2').check();
    }
    await this.page.locator('#password').fill(profile.password);
    await this.page.locator('#days').selectOption(profile.day);
    await this.page.locator('#months').selectOption({ label: profile.month });
    await this.page.locator('#years').selectOption(profile.year);

    if (profile.newsletter) {
      await this.page.locator('#newsletter').check();
    }

    if (profile.specialOffers) {
      await this.page.locator('#optin').check();
    }

    await this.page.locator('#first_name').fill(profile.firstName);
    await this.page.locator('#last_name').fill(profile.lastName);
    await this.page.locator('#company').fill(profile.company);
    await this.page.locator('#address1').fill(profile.address1);
    await this.page.locator('#address2').fill(profile.address2);
    await this.page.locator('#country').selectOption({ label: profile.country });
    await this.page.locator('#state').fill(profile.state);
    await this.page.locator('#city').fill(profile.city);
    await this.page.locator('#zipcode').fill(profile.zipcode);
    await this.page.locator('#mobile_number').fill(profile.mobileNumber);

    await this.page.getByRole('button', { name: 'Create Account' }).click();
    await expect(this.accountCreatedHeading).toBeVisible();
  }

  async continueAfterAccountCreated(): Promise<void> {
    await this.page.getByRole('link', { name: 'Continue' }).click();
  }

  async deleteAccount(): Promise<void> {
    await this.page.getByRole('link', { name: 'Delete Account' }).click();
    await expect(this.accountDeletedHeading).toBeVisible();
  }

  async continueAfterDeletion(): Promise<void> {
    await this.page.getByRole('link', { name: 'Continue' }).click();
  }
}
