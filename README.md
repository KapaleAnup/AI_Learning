# AI_Learning

This repository now includes a starter Playwright E2E framework scaffold based on the `playwright-e2e` QA skill.

## What Is Included

- TypeScript Playwright config
- Page Object Model base classes
- Reusable auth fixtures
- Example auth and dashboard specs
- Automation Exercise registration flow
- Basic project scripts and ignore rules

## Project Layout

```text
tests/
  e2e/
    auth/login.spec.ts
    dashboard/dashboard.spec.ts
  fixtures/auth.fixture.ts
  pages/base.page.ts
  pages/login.page.ts
  pages/dashboard.page.ts
  utils/test-data.ts
playwright.config.ts
```

## Getting Started

1. Install dependencies with `npm install`.
2. Run the test suite with `npm test`.
3. Open the report with `npm run report`.

The default `baseURL` is `https://automationexercise.com`, and the registration test lives at [`tests/e2e/auth/register.spec.ts`](C:/Users/Anup%20Kapale/Documents/learAi/codexcode/AI_Learning/tests/e2e/auth/register.spec.ts).

## Notes

- The scaffold is intentionally small and can be connected to a real app by setting `BASE_URL`.
- `playwright.config.ts` targets Chromium, Firefox, and WebKit.
