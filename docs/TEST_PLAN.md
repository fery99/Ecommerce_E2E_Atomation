# Test Plan: SauceDemo E-commerce

## 1. Objective
Memastikan alur bisnis utama e-commerce (login, browsing produk, cart, checkout) berfungsi dengan benar dan terlindungi dari input tidak valid.

## 2. Scope
| In scope | Out of scope |
|---|---|
| Login & logout (positif/negatif) | Payment gateway sungguhan |
| Sorting produk (nama & harga) | Performance / load test |
| Add / remove cart, persistensi cart | Mobile native app |
| Checkout E2E, validasi form, kalkulasi total | Cross-browser selain Chromium (dapat ditambah) |

## 3. Test Approach
- **Automation**: Playwright + TypeScript, Page Object Model, custom fixtures.
- **Data-driven**: kredensial negatif dari `users.json`, validasi form dari `checkout.csv`.
- **Tagging**: `@smoke` (critical path, setiap commit), `@regression` (full suite).
- **Evidence**: screenshot, video, dan trace otomatis saat gagal.

## 4. Environment
- URL: https://www.saucedemo.com
- Browser: Chromium (Desktop Chrome)
- CI: GitHub Actions (ubuntu-latest, Node 20)

## 5. Entry / Exit Criteria
- **Entry**: environment dapat diakses, data test tersedia.
- **Exit**: 100% smoke test lulus, ≥95% regression lulus, tidak ada bug Critical/High yang masih open.

## 6. Risks
| Risiko | Mitigasi |
|---|---|
| Situs demo down / lambat | Retry 1x di CI, timeout 30s |
| Perubahan locator | Gunakan atribut `data-test` yang stabil |

## 7. Deliverables
Test cases (`docs/TEST_CASES.md`), automation scripts, HTML & Allure report, bug report (`docs/BUG_REPORT.md`).
