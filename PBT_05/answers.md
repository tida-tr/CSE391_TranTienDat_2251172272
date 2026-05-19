# PHẦN A

## CÂU A1

1. `<meta name="viewport" content="width=device-width, initial-scale=1.0">`  
* `width=device-width`: Yêu cầu trình duyệt render chiều rộng trang web bằng đúng chiều rộng vật lý của màn hình thiết bị  
* `initial-scale=1.0`: Đặt mức độ thu phóng (zoom) ban đầu là 100% khi trang vừa tải xong

2. Thiếu dòng này: iPhone giả định trang rộng 980px (như desktop) → thu nhỏ lại → chữ bé xíu → UX tệ.

3. Khác nhau:
* Mobile-First: Viết CSS mặc định cho giao diện màn hình nhỏ (Mobile) trước. Sau đó dùng `@media (min-width)` để bổ sung layout/style cho các màn hình lớn dần (Tablet, Desktop)

* Desktop-First: Viết CSS mặc định cho giao diện màn hình lớn (PC) trước. Sau đó dùng `@media (max-width)` để điều chỉnh và ghi đè layout khi màn hình nhỏ lại

```css
/* --- Mobile-First --- */
.product-item { width: 100%; } /* Mặc định Mobile: 1 cột */

@media (min-width: 768px) {
  .product-item { width: 50%; } /* Từ Tablet trở lên: 2 cột */
}

/* --- Desktop-First --- */
.product-item { width: 50%; } /* Mặc định Desktop: 2 cột */

@media (max-width: 767.98px) {
  .product-item { width: 100%; } /* Dưới Tablet (Mobile): 1 cột */
}
```

**Tại sao Mobile-First được khuyên dùng?** 

* Hiệu suất: Thiết bị di động (vốn yếu hơn) sẽ chỉ tải và đọc các đoạn CSS nhẹ nhàng cốt lõi, không phải mất tài nguyên phân tích các đoạn CSS phức tạp của Desktop rồi mới tiến hành ghi đè.
* Trải nghiệm người dùng (UX): Buộc lập trình viên phải ưu tiên sắp xếp các tính năng và nội dung quan trọng nhất trong không gian chật hẹp, tránh nhồi nhét.

## CÂU A2

1. **Extra small (xs)**
* Kích thước: < 576px
* Thiết bị đại diện: Điện thoại di động (Mobile cầm dọc - Portrait).
* Ví dụ hiển thị lưới sản phẩm: 1 cột (100% width).

2. **Small (sm)**
* Kích thước: >= 576px
* Thiết bị đại diện: Điện thoại cầm ngang (Mobile landscape) hoặc Tablet nhỏ.
* Ví dụ hiển thị lưới sản phẩm: 2 cột.

3. **Medium (md)**
* Kích thước: >= 768px
* Thiết bị đại diện: Máy tính bảng (Tablet - iPad).
* Ví dụ hiển thị lưới sản phẩm: 2 hoặc 3 cột.

4. **Large (lg)**
* Kích thước: >= 992px
* Thiết bị đại diện: Laptop, màn hình Desktop vừa.
* Ví dụ hiển thị lưới sản phẩm: 3 hoặc 4 cột.

5. **Extra large (xl) / Extra extra large (xxl)**
* Kích thước: >= 1200px (xl) và >= 1400px (xxl).
* Thiết bị đại diện: Màn hình Desktop lớn, PC chuyên dụng.
*  Ví dụ hiển thị lưới sản phẩm: 4 đến 6 cột (tùy kích thước sản phẩm).

## Câu A3

| Chiều rộng màn hình | `.container` with | Giải thích chi tiết quy tắc áp dụng
|---|---|---|
| 375px | 100% | Nhỏ hơn 576px, nhận giá trị CSS mặc định ban đầu|
|600px |540px|	Thỏa mãn điều kiện >= 576px nhưng chưa đạt tới 768px|
|800px	|720px|	Thỏa mãn điều kiện >= 768px nhưng chưa đạt tới 992px|
|1000px	|960px|	Thỏa mãn điều kiện >= 992px nhưng chưa đạt tới 1200px|
|1400px	|1140px|Lớn hơn mốc cuối cùng >= 1200px, nhận giá trị lớn nhất|

## CÂU A4

1. **Giải thích 4 tính năng chính của SCSS và ví dụ**
* Variables (Biến): Lưu trữ các giá trị (màu sắc, font, size) để tái sử dụng ở nhiều nơi và dễ cập nhật đồng loạt.
```scss
$primary-color: #007bff;
.button { background-color: $primary-color; }
```
* Nesting (Lồng nhau): Cho phép viết các bộ chọn (selectors) lồng nhau theo đúng cấu trúc hình cây của HTML, giúp code tường minh, dễ quản lý.
```scss
nav {
  background: #333;
  ul { list-style: none; }
  a { text-decoration: none; }
}
```
* Mixins: Gom một nhóm các thuộc tính CSS lại thành một khối. Có thể tái sử dụng thông qua từ khóa `@include` và truyền tham số linh hoạt như một hàm
```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.box { @include flex-center; }
```
* @extend / Inheritance (Kế thừa): Cho phép một selector thừa hưởng lại toàn bộ các thuộc tính đã viết của một selector khác, tránh lặp lại mã nguồn (DRY).
```scss
.alert-box { padding: 15px; border: 1px solid #ccc; }
.alert-danger {
  @extend .alert-box;
  border-color: red; /* Chỉ viết thêm thuộc tính khác biệt */
}
```

**Tại sao trình duyệt KHÔNG đọc được file .scss? Cần bước gì?**
- Do Trình duyệt web (Chrome, Edge, Firefox, Safari,...) chỉ có công cụ phân dịch và đọc hiểu duy nhất ngôn ngữ CSS tiêu chuẩn. SCSS là ngôn ngữ tiền xử lý (CSS Preprocessor) sở hữu các cú pháp nâng cao (biến, hàm, lồng nhau) mà trình duyệt không có khả năng tự giải mã.
- Giải pháp/Bước chuyển đổi: Cần chạy qua một bước gọi là Biên dịch (Compile). Lập trình viên sử dụng các công cụ như extension Live Sass Compiler trên VS Code, hoặc các thư viện Node-Sass/Dart-Sass để dịch toàn bộ mã từ file `.scss` thành file `.css` thuần. Sau đó, nhúng file `.css` đã biên dịch này vào file HTML qua thẻ `<link>`.

# PHẦN B

## CÂU B1

![alt text](./screenshots/B1_1.png)

![alt text](./screenshots/B1_2.png)

![alt text](./screenshots/B1_3.png)

## CÂU B2

![alt text](./screenshots/B2_1.png)

![alt text](./screenshots/B2_2.png)

## CÂU B3

### Lệnh biên dịch SCSS sang CSS
```scss
Để biên dịch file `style.scss` trong thư mục `scss` ra file `style.css` ở thư mục gốc, sử dụng lệnh sau (yêu cầu đã cài đặt Dart Sass hoặc Node Sass):

```bash
sass scss/style.scss style.css
```