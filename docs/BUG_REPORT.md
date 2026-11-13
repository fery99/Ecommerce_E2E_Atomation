# Bug Report

All bugs below were **reproduced by the automated suite**. Each one has a test tagged `@known-bug` that asserts the *correct* behavior and is marked `test.fail()`. The bug is documented in every run without turning CI red, and if a bug is ever fixed, the test reports "unexpectedly passed".

Environment: Chromium (Desktop Chrome), https://www.saucedemo.com, password `secret_sauce`.

## Summary

| ID | Title | User | Severity | Priority | Test |
|---|---|---|---|---|---|
| BUG-001 | All product images are identical | problem_user | Medium | Medium | TC-BUG-01 |
| BUG-002 | Typing in Last Name overwrites First Name at checkout | problem_user | High | High | TC-BUG-04 |
| BUG-003 | Product sorting does not work | problem_user | Medium | Medium | TC-BUG-02 |
| BUG-004 | Some products cannot be added to cart | problem_user | High | High | TC-BUG-03 |
| BUG-005 | Product detail page shows a different product than clicked | problem_user | High | Medium | TC-BUG-05 |
| BUG-006 | Remove button on inventory does not remove the product | error_user | High | High | TC-BUG-06 |
| BUG-007 | Buttons stay "Remove" after Reset App State until page reload | all users | Low | Low | TC-NAV-06 |
| BUG-008 | Checkout can proceed with an empty cart | all users | High | High | TC-CHKO-05 |
| BUG-009 | Checkout accepts whitespace-only name and postal code | all users | Medium | Medium | TC-CHKI-07 |
| BUG-010 | Postal code accepts letters (no format validation) | all users | Low | Low | TC-CHKI-05 |
| BUG-011 | Finish button does not complete the order | error_user | Critical | High | TC-BUG-07 |
| BUG-012 | Product prices differ from catalog | visual_user | High | Medium | TC-BUG-08 |
| BUG-013 | Red field highlight remains after login error is dismissed | all users | Low | Low | TC-LOGIN-17 |

---

## Details

### BUG-002: Typing in Last Name overwrites First Name at checkout
**Steps**
1. Login as `problem_user`.
2. Add any product to the cart, open the cart, and click Checkout.
3. Type a value into Last Name.

**Expected:** Last Name contains the typed value.
**Actual:** The value goes into First Name; Last Name stays empty, so checkout cannot continue.

### BUG-008: Checkout can proceed with an empty cart
**Steps**
1. Login as `standard_user` without adding any product.
2. Open the cart and click Checkout.

**Expected:** Checkout is blocked or a message says the cart is empty.
**Actual:** User reaches the Checkout: Your Information page and can complete an order with zero items.

### BUG-009: Checkout accepts whitespace-only input
**Steps**
1. Add a product, open the cart, and click Checkout.
2. Enter only spaces in First Name, Last Name, and Postal Code, then click Continue.

**Expected:** Validation error, "First Name is required".
**Actual:** User proceeds to the overview page.

### BUG-011: Finish button does not complete the order (error_user)
**Steps**
1. Login as `error_user`, add a product, and proceed through checkout with valid data.
2. Click Finish on the overview page.

**Expected:** Redirect to "Thank you for your order!".
**Actual:** User stays on the overview page; the order is not completed.

*Evidence (screenshots, video, trace) for each run is available in the [Allure Report](https://fery99.github.io/-ecommerce-e2e-automation/) and in the CI artifacts.*
