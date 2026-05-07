import type { RegistrationProfile } from '../pages/register.page';

export function buildRegistrationProfile(): RegistrationProfile {
  const unique = Date.now();

  return {
    title: 'Mr.',
    fullName: 'Codex Test User',
    email: `codex.test.user.${unique}@example.com`,
    password: 'SecurePass123!',
    day: '10',
    month: 'May',
    year: '1995',
    newsletter: true,
    specialOffers: true,
    firstName: 'Codex',
    lastName: 'User',
    company: 'OpenAI',
    address1: '123 Automation Street',
    address2: 'Suite 42',
    country: 'India',
    state: 'Maharashtra',
    city: 'Pune',
    zipcode: '411001',
    mobileNumber: '9876543210',
  };
}
