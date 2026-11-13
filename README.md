# E-commerce E2E Automation: Playwright + TypeScript

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![CI](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)

End-to-end test automation for the business flows of an e-commerce site ([SauceDemo](https://www.saucedemo.com)): login, product sorting, cart, and checkout.

## Demo


https://github.com/user-attachments/assets/da9a734f-2c65-4179-928d-cdf90142e44d



## Highlights
- **Page Object Model** + custom fixtures (`loggedIn`) for clean, reusable tests
- **Data-driven testing** from **JSON** (negative login) and **CSV** (checkout validation)
- **22 test cases**, tagged `@smoke` / `@regression`
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
npm run test:headed       # with visible browser
npx playwright test --ui  # interactive UI mode
npm run report            # open HTML report
npm run demo:record       # record demo video (slow motion)

npm run allure:generate && npm run allure:open   # Allure (requires Java)
```

## Coverage
| Module | Test Cases |
|---|---|
| Login | 8 |
| Sorting | 4 |
| Cart | 5 |
| Checkout | 5 |
| **Total** | **22 (100% automated)** |

## Tech Stack
Playwright | TypeScript | Allure | csv-parse | GitHub Actions
