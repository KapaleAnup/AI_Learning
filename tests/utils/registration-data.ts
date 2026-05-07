import type { RegistrationProfile } from '../pages/register.page';
import { randomInt } from 'node:crypto';

export function buildRegistrationProfile(): RegistrationProfile {
  const unique = `${Date.now()}${randomInt(1000, 9999)}`;
  const firstName = `Codex${randomInt(100, 999)}`;
  const lastName = `User${randomInt(100, 999)}`;
  const city = `City${randomInt(10, 99)}`;
  const state = `State${randomInt(10, 99)}`;

  return {
    title: 'Mr.',
    fullName: `${firstName} ${lastName}`,
    email: `codex.test.user.${unique}@example.com`,
    password: 'SecurePass123!',
    day: '10',
    month: 'May',
    year: '1995',
    newsletter: true,
    specialOffers: true,
    firstName,
    lastName,
    company: 'OpenAI',
    address1: `${randomInt(100, 999)} Automation Street`,
    address2: `Suite ${randomInt(1, 999)}`,
    country: 'India',
    state,
    city,
    zipcode: `${randomInt(100000, 999999)}`,
    mobileNumber: `9${randomInt(100000000, 999999999)}`,
  };
}
