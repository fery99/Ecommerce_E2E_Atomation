# 🛒 SauceDemo E2E Automation: Playwright + TypeScript

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![CI](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)

Portofolio QA automation untuk alur bisnis e-commerce di [SauceDemo](https://www.saucedemo.com): login, sorting produk, cart, dan checkout end-to-end.

## ✨ Highlights
- **Page Object Model** + custom fixtures (`loggedIn`) agar test bersih dan reusable
- **Data-driven testing** dari **JSON** (login negatif) dan **CSV** (validasi checkout)
- **22 test case**, ditandai `@smoke` / `@regression`
- Screenshot, video, dan trace otomatis saat test gagal
- Report **Playwright HTML** + **Allure**
- **CI/CD** GitHub Actions dengan Allure report yang di-publish ke GitHub Pages
- Dokumen QA: [Test Plan](docs/TEST_PLAN.md) · [Test Cases](docs/TEST_CASES.md) · [Bug Report](docs/BUG_REPORT.md)

## 📁 Struktur
```
├── pages/               # Page Objects (Login, Inventory, Cart, Checkout)
├── tests/               # Spec files per fitur
├── test-data/           # users.json, products.json, checkout.csv
├── utils/               # fixtures & data loader
├── docs/                # Test plan, test cases, bug report
├── .github/workflows/   # CI pipeline
└── playwright.config.ts
```

## 🚀 Cara Menjalankan
```bash
npm install
npx playwright install chromium

npm test                  # semua test
npm run test:smoke        # hanya @smoke
npm run test:regression   # hanya @regression
npm run test:headed       # dengan browser terlihat
npm run report            # buka HTML report

npm run allure:generate && npm run allure:open   # Allure (butuh Java)
```

## 📊 Coverage
| Modul | Jumlah TC |
|---|---|
| Login | 8 |
| Sorting | 4 |
| Cart | 5 |
| Checkout | 5 |
| **Total** | **22 (100% automated)** |

## 🧰 Tech Stack
Playwright · TypeScript · Allure · csv-parse · GitHub Actions
