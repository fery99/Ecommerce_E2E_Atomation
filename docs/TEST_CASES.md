# Test Cases

Generated from the automated suite (`npx playwright test --list`). Total **121** automated test cases.

Legend: `@smoke` = critical path | `@regression` = full suite | `@known-bug` = asserts correct behavior, expected to fail until the bug is fixed (see [Bug Report](BUG_REPORT.md)).

## Summary

| Module | Test Cases |
|---|---|
| Login | 22 |
| User Types | 7 |
| Inventory | 12 |
| Sorting | 10 |
| Product Detail | 13 |
| Cart | 14 |
| Checkout | 24 |
| Menu & Navigation | 10 |
| Known Bugs | 9 |
| **Total** | **121** |

## Login

| ID | Scenario | Tags | Status |
|---|---|---|---|
| TC-LOGIN-01 | login dengan standard_user berhasil | @smoke | Pass |
| TC-LOGIN-02 | logout kembali ke halaman login | @regression | Pass |
| TC-LOGIN-03 | login gagal - locked out user | @regression | Pass |
| TC-LOGIN-04 | login gagal - wrong password | @regression | Pass |
| TC-LOGIN-05 | login gagal - unregistered user | @regression | Pass |
| TC-LOGIN-06 | login gagal - empty username | @regression | Pass |
| TC-LOGIN-07 | login gagal - empty password | @regression | Pass |
| TC-LOGIN-08 | akses inventory tanpa login ditolak | @regression | Pass |
| TC-LOGIN-09 | login gagal - empty username and password | @regression | Pass |
| TC-LOGIN-10 | login gagal - username is case-sensitive | @regression | Pass |
| TC-LOGIN-11 | login gagal - username with surrounding spaces | @regression | Pass |
| TC-LOGIN-12 | tombol X menutup pesan error | @regression | Pass |
| TC-LOGIN-13 | login dengan tombol Enter | @regression | Pass |
| TC-LOGIN-14 | field password tersamarkan | @regression | Pass |
| TC-LOGIN-15 | setelah logout tombol Back tidak membuka inventory | @regression | Pass |
| TC-LOGIN-16 | akses /cart.html tanpa login ditolak | @regression | Pass |
| TC-LOGIN-16 | akses /checkout-step-one.html tanpa login ditolak | @regression | Pass |
| TC-LOGIN-16 | akses /checkout-step-two.html tanpa login ditolak | @regression | Pass |
| TC-LOGIN-16 | akses /inventory-item.html?id=4 tanpa login ditolak | @regression | Pass |
| TC-LOGIN-17 | highlight merah field hilang setelah error ditutup | @regression @known-bug | Known bug |
| TC-SEC-01 | login gagal - SQL injection in username | @regression | Pass |
| TC-SEC-02 | login gagal - XSS payload in username | @regression | Pass |

## User Types

| ID | Scenario | Tags | Status |
|---|---|---|---|
| TC-USER-01 | standard_user bisa login ke halaman Products | @regression | Pass |
| TC-USER-02 | problem_user bisa login ke halaman Products | @regression | Pass |
| TC-USER-03 | performance_glitch_user bisa login ke halaman Products | @regression | Pass |
| TC-USER-04 | error_user bisa login ke halaman Products | @regression | Pass |
| TC-USER-05 | visual_user bisa login ke halaman Products | @regression | Pass |
| TC-USER-06 | performance_glitch_user login selesai < 10 detik | @regression | Pass |
| TC-USER-07 | halaman login menampilkan daftar username yang tersedia | @regression | Pass |

## Inventory

| ID | Scenario | Tags | Status |
|---|---|---|---|
| TC-INV-01 | menampilkan tepat 6 produk | @smoke | Pass |
| TC-INV-02 | setiap produk punya nama, deskripsi, harga, gambar, dan tombol | @regression | Pass |
| TC-INV-03 | semua harga berformat $xx.xx dan bernilai > 0 | @regression | Pass |
| TC-INV-04 | semua gambar produk berhasil dimuat | @regression | Pass |
| TC-INV-05 | tidak ada nama produk yang duplikat | @regression | Pass |
| TC-INV-06 | nama dan harga produk sesuai data referensi | @regression | Pass |
| TC-INV-07 | klik nama produk membuka halaman detail | @regression | Pass |
| TC-INV-08 | klik gambar produk membuka halaman detail | @regression | Pass |
| TC-INV-09 | tombol berubah menjadi Remove setelah Add to cart | @smoke | Pass |
| TC-INV-10 | tombol kembali menjadi Add to cart setelah Remove | @regression | Pass |
| TC-INV-11 | judul Products dan logo Swag Labs tampil | @regression | Pass |
| TC-INV-12 | status tombol Remove tetap ada setelah reload | @regression | Pass |

## Sorting

| ID | Scenario | Tags | Status |
|---|---|---|---|
| TC-SORT-01 | default menampilkan semua produk urut A-Z | @smoke | Pass |
| TC-SORT-02 | sort Name Z-A | @regression | Pass |
| TC-SORT-03 | sort Price low-high | @regression | Pass |
| TC-SORT-04 | sort Price high-low | @regression | Pass |
| TC-SORT-05 | dropdown memiliki 4 opsi dengan label benar | @regression | Pass |
| TC-SORT-06 | label aktif sesuai pilihan - Name (Z to A) | @regression | Pass |
| TC-SORT-06 | label aktif sesuai pilihan - Price (low to high) | @regression | Pass |
| TC-SORT-06 | label aktif sesuai pilihan - Price (high to low) | @regression | Pass |
| TC-SORT-07 | sorting kembali ke A-Z setelah reload | @regression | Pass |
| TC-SORT-08 | isi cart tidak berubah setelah sorting diganti | @regression | Pass |

## Product Detail

| ID | Scenario | Tags | Status |
|---|---|---|---|
| TC-PDP-01 | nama, deskripsi, dan harga di detail sama dengan di list | @smoke | Pass |
| TC-PDP-02 | add to cart dari halaman detail | @regression | Pass |
| TC-PDP-03 | remove dari halaman detail | @regression | Pass |
| TC-PDP-04 | Back to products kembali ke list | @regression | Pass |
| TC-PDP-05 | detail produk id=4 - Sauce Labs Backpack | @regression | Pass |
| TC-PDP-05 | detail produk id=0 - Sauce Labs Bike Light | @regression | Pass |
| TC-PDP-05 | detail produk id=1 - Sauce Labs Bolt T-Shirt | @regression | Pass |
| TC-PDP-05 | detail produk id=5 - Sauce Labs Fleece Jacket | @regression | Pass |
| TC-PDP-05 | detail produk id=2 - Sauce Labs Onesie | @regression | Pass |
| TC-PDP-05 | detail produk id=3 - Test.allTheThings() T-Shirt (Red) | @regression | Pass |
| TC-PDP-06 | id produk tidak valid menampilkan ITEM NOT FOUND | @regression | Pass |
| TC-PDP-07 | status cart konsisten antara list dan detail | @regression | Pass |
| TC-PDP-08 | gambar detail sesuai dengan produk | @regression | Pass |

## Cart

| ID | Scenario | Tags | Status |
|---|---|---|---|
| TC-CART-01 | tambah satu produk ke cart | @smoke | Pass |
| TC-CART-02 | tambah beberapa produk ke cart | @regression | Pass |
| TC-CART-03 | hapus produk dari halaman inventory | @regression | Pass |
| TC-CART-04 | hapus produk dari halaman cart | @regression | Pass |
| TC-CART-05 | isi cart tetap ada setelah reload | @regression | Pass |
| TC-CART-06 | tambah semua 6 produk, badge = 6 | @regression | Pass |
| TC-CART-07 | hapus semua item, cart kosong dan badge hilang | @regression | Pass |
| TC-CART-08 | cart kosong tetap bisa dibuka | @regression | Pass |
| TC-CART-09 | quantity setiap item = 1 | @regression | Pass |
| TC-CART-10 | harga di cart sama dengan harga di katalog | @regression | Pass |
| TC-CART-11 | Continue Shopping kembali ke inventory dan cart tetap | @regression | Pass |
| TC-CART-12 | cart tetap tersimpan setelah logout lalu login lagi | @regression | Pass |
| TC-CART-13 | urutan item di cart sesuai urutan ditambahkan | @regression | Pass |
| TC-CART-14 | klik nama item di cart membuka halaman detail | @regression | Pass |

## Checkout

| ID | Scenario | Tags | Status |
|---|---|---|---|
| TC-CHK-01 | checkout end-to-end berhasil | @smoke | Pass |
| TC-CHK-02 | kalkulasi subtotal, tax, dan total benar | @regression | Pass |
| TC-CHK-03 | validasi form checkout - First Name is required | @regression | Pass |
| TC-CHK-04 | validasi form checkout - Last Name is required | @regression | Pass |
| TC-CHK-05 | validasi form checkout - Postal Code is required | @regression | Pass |
| TC-CHKC-01 | halaman complete menampilkan ikon, judul, dan teks konfirmasi | @regression | Pass |
| TC-CHKC-02 | Back Home kembali ke inventory dengan cart kosong | @regression | Pass |
| TC-CHKC-03 | checkout semua 6 produk berhasil | @regression | Pass |
| TC-CHKC-04 | halaman complete tidak bisa dibuka tanpa login | @regression | Pass |
| TC-CHKI-01 | validasi form checkout - First Name is required | @regression | Pass |
| TC-CHKI-02 | Cancel kembali ke cart dan item tetap ada | @regression | Pass |
| TC-CHKI-03 | pesan error hilang setelah klik X | @regression | Pass |
| TC-CHKI-04 | nama dengan karakter spesial/unicode diterima | @regression | Pass |
| TC-CHKI-05 | postal code berisi huruf seharusnya ditolak | @regression @known-bug | Known bug |
| TC-CHKI-06 | input sangat panjang (255 karakter) tidak merusak form | @regression | Pass |
| TC-CHKI-07 | nama berisi spasi saja seharusnya ditolak | @regression @known-bug | Known bug |
| TC-CHKO-01 | item di overview sama dengan item di cart | @regression | Pass |
| TC-CHKO-02 | tax 8% dan total benar - cheapest only | @regression | Pass |
| TC-CHKO-02 | tax 8% dan total benar - most expensive only | @regression | Pass |
| TC-CHKO-02 | tax 8% dan total benar - two shirts | @regression | Pass |
| TC-CHKO-02 | tax 8% dan total benar - all products | @regression | Pass |
| TC-CHKO-03 | info payment dan shipping tampil | @regression | Pass |
| TC-CHKO-04 | Cancel di overview kembali ke inventory dan cart tetap | @regression | Pass |
| TC-CHKO-05 | checkout dengan cart kosong seharusnya diblokir | @regression @known-bug | Known bug |

## Menu & Navigation

| ID | Scenario | Tags | Status |
|---|---|---|---|
| TC-NAV-01 | burger menu menampilkan semua item menu | @regression | Pass |
| TC-NAV-02 | tombol X menutup menu | @regression | Pass |
| TC-NAV-03 | All Items kembali ke inventory dari halaman cart | @regression | Pass |
| TC-NAV-04 | link About mengarah ke saucelabs.com | @regression | Pass |
| TC-NAV-05 | Reset App State mengosongkan cart | @regression | Pass |
| TC-NAV-06 | Reset App State mengembalikan tombol ke Add to cart | @regression @known-bug | Known bug |
| TC-NAV-07 | footer link X benar dan terbuka di tab baru | @regression | Pass |
| TC-NAV-08 | footer link Facebook benar dan terbuka di tab baru | @regression | Pass |
| TC-NAV-09 | footer link LinkedIn benar dan terbuka di tab baru | @regression | Pass |
| TC-NAV-10 | footer menampilkan copyright tahun berjalan | @regression | Pass |

## Known Bugs

| ID | Scenario | Tags | Status |
|---|---|---|---|
| TC-BUG-01 | setiap produk seharusnya memiliki gambar berbeda | @known-bug | Known bug |
| TC-BUG-02 | sort Z-A seharusnya mengurutkan produk | @known-bug | Known bug |
| TC-BUG-03 | semua produk seharusnya bisa ditambahkan ke cart | @known-bug | Known bug |
| TC-BUG-04 | field Last Name seharusnya bisa diisi saat checkout | @known-bug | Known bug |
| TC-BUG-05 | detail produk seharusnya sesuai produk yang diklik | @known-bug | Known bug |
| TC-BUG-06 | produk seharusnya bisa di-remove dari inventory | @known-bug | Known bug |
| TC-BUG-07 | tombol Finish seharusnya menyelesaikan order | @known-bug | Known bug |
| TC-BUG-08 | visual_user harga produk seharusnya sama dengan katalog | @known-bug | Known bug |
| TC-BUG-09 | performance_glitch_user tetap bisa checkout end-to-end | @regression | Pass |
