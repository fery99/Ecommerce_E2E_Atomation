# E-commerce E2E Automation: Playwright + TypeScript

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
[![E2E Tests](https://github.com/fery99/Ecommerce_E2E_Atomation/actions/workflows/playwright.yml/badge.svg)](https://github.com/fery99/Ecommerce_E2E_Atomation/actions/workflows/playwright.yml)

**Live test report:** [Allure Report](https://fery99.github.io/Ecommerce_E2E_Atomation/) (updated automatically on every push and daily at 08:00 WIB)

End-to-end test automation for the business flows of an e-commerce site ([SauceDemo](https://www.saucedemo.com)): login, product sorting, cart, and checkout.

## Demo


https://github.com/user-attachments/assets/da9a734f-2c65-4179-928d-cdf90142e44d



## Highlights
- **Page Object Model** + custom fixtures (`loggedIn`) for clean, reusable tests
- **Data-driven testing** from **JSON** (negative login) and **CSV** (checkout validation)
- **121 automated test cases**, tagged `@smoke` / `@regression` / `@known-bug`
- **13 real bugs found and documented**, each guarded by a `@known-bug` test
- Covers all SauceDemo user types (standard, problem, error, visual, performance_glitch, locked_out)
- Basic security checks (SQL injection, XSS input, direct URL access without login)
- Automatic screenshot, video, and trace on failure
- **Playwright HTML** + **Allure** reports
- **CI/CD** with GitHub Actions, Allure report published to GitHub Pages
- QA documents: [Test Plan](docs/TEST_PLAN.md) | [Test Cases](docs/TEST_CASES.md) | [Bug Report](docs/BUG_REPORT.md)

## Project Structure
```
├── pages/                     # Page Objects (Login, Inventory, Cart, Checkout)
├── tests/                     # Spec files per feature
├── test-data/                 # users.json, products.json, checkout.csv
├── utils/                     # fixtures & data loader
├── docs/                      # Test plan, test cases, bug report
├── .github/workflows/         # CI pipeline
├── playwright.config.ts
└── playwright.demo.config.ts  # slow-motion + video recording for demo
```

## How to Run
```bash
npm install
npx playwright install chromium

npm test                  # all tests
npm run test:smoke        # @smoke only
npm run test:regression   # @regression only
npx playwright test --grep @known-bug   # bug reproduction tests only
npm run test:headed       # with visible browser
npx playwright test --ui  # interactive UI mode
npm run report            # open HTML report
npm run demo:record       # record demo video (slow motion)

npm run allure:generate && npm run allure:open   # Allure (requires Java)
```

## Coverage
| Module | Test Cases |
|---|---|
| Login & Security | 22 |
| User Types | 7 |
| Inventory | 12 |
| Sorting | 10 |
| Product Detail | 13 |
| Cart | 14 |
| Checkout | 24 |
| Menu & Navigation | 10 |
| Known Bugs (special users) | 9 |
| **Total** | **121 (100% automated)** |

Full list: [docs/TEST_CASES.md](docs/TEST_CASES.md) | Bugs found: [docs/BUG_REPORT.md](docs/BUG_REPORT.md)

## Tech Stack
Playwright | TypeScript | Allure | csv-parse | GitHub Actions
