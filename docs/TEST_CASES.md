# Test Cases

| ID | Modul | Skenario | Expected Result | Prioritas | Tag | Automated |
|---|---|---|---|---|---|---|
| TC-LOGIN-01 | Login | Login dengan `standard_user` | Masuk ke halaman Products | High | smoke | ✅ |
| TC-LOGIN-02 | Login | Logout dari menu | Kembali ke halaman login | Medium | regression | ✅ |
| TC-LOGIN-03 | Login | Login dengan `locked_out_user` | Error "user has been locked out" | High | regression | ✅ |
| TC-LOGIN-04 | Login | Password salah | Error "do not match" | High | regression | ✅ |
| TC-LOGIN-05 | Login | User tidak terdaftar | Error "do not match" | Medium | regression | ✅ |
| TC-LOGIN-06 | Login | Username kosong | Error "Username is required" | Medium | regression | ✅ |
| TC-LOGIN-07 | Login | Password kosong | Error "Password is required" | Medium | regression | ✅ |
| TC-LOGIN-08 | Login | Akses `/inventory.html` tanpa login | Diarahkan ke login dengan pesan error | High | regression | ✅ |
| TC-SORT-01 | Sorting | Default sort | 6 produk urut A-Z | Medium | smoke | ✅ |
| TC-SORT-02 | Sorting | Sort Name Z-A | Urut Z-A | Low | regression | ✅ |
| TC-SORT-03 | Sorting | Sort Price low-high | Harga naik | Medium | regression | ✅ |
| TC-SORT-04 | Sorting | Sort Price high-low | Harga turun | Medium | regression | ✅ |
| TC-CART-01 | Cart | Tambah 1 produk | Badge = 1, produk ada di cart | High | smoke | ✅ |
| TC-CART-02 | Cart | Tambah 3 produk | Badge = 3, semua produk di cart | High | regression | ✅ |
| TC-CART-03 | Cart | Remove dari inventory | Badge hilang | Medium | regression | ✅ |
| TC-CART-04 | Cart | Remove dari halaman cart | Produk terhapus dari list | Medium | regression | ✅ |
| TC-CART-05 | Cart | Reload halaman | Isi cart tetap tersimpan | Medium | regression | ✅ |
| TC-CHK-01 | Checkout | Checkout E2E | "Thank you for your order!", cart kosong | Critical | smoke | ✅ |
| TC-CHK-02 | Checkout | Kalkulasi harga | Subtotal = Σ item; Total = subtotal + tax | Critical | regression | ✅ |
| TC-CHK-03 | Checkout | First name kosong | Error "First Name is required" | Medium | regression | ✅ |
| TC-CHK-04 | Checkout | Last name kosong | Error "Last Name is required" | Medium | regression | ✅ |
| TC-CHK-05 | Checkout | Postal code kosong | Error "Postal Code is required" | Medium | regression | ✅ |

**Total: 22 test case, 22 automated (100%)**, 22 passed pada run lokal.
