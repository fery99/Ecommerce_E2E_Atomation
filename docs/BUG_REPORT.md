# Bug Report (Exploratory: `problem_user`)

SauceDemo sengaja menyediakan `problem_user` yang berisi bug. Berikut contoh format laporan bug standar dari hasil exploratory testing. **Verifikasi ulang secara manual sebelum dipublikasikan**, karena perilaku situs demo bisa berubah.

---

### BUG-001: Semua gambar produk sama untuk problem_user
| Field | Value |
|---|---|
| Severity | Medium |
| Priority | Medium |
| Environment | Chrome, https://www.saucedemo.com |
| User | problem_user / secret_sauce |

**Steps to reproduce**
1. Login sebagai `problem_user`
2. Amati gambar produk di halaman Products

**Expected:** Setiap produk menampilkan gambarnya masing-masing.
**Actual:** Semua produk menampilkan gambar yang sama.
**Evidence:** _(lampirkan screenshot)_

---

### BUG-002: Field Last Name di checkout tidak bisa diisi (problem_user)
| Field | Value |
|---|---|
| Severity | High (memblokir checkout) |
| Priority | High |

**Steps to reproduce**
1. Login sebagai `problem_user`, tambahkan produk, buka Cart, lalu klik Checkout
2. Isi First Name, lalu isi Last Name

**Expected:** Last Name terisi sesuai input.
**Actual:** Input malah menimpa field First Name, sehingga Last Name tetap kosong dan checkout gagal.
**Evidence:** _(lampirkan screenshot / video)_
