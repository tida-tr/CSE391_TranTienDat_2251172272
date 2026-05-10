# PHẦN A

## Câu A1 - HTTP & Browser
> Tài liệu tham chiếu: tuan_1_html5/01_introduction_html_universe.md - phần đầu tiên
1. Khi gõ https://shopee.vn sẽ xảy ra:
- Request từ laptop -> router wifi
- qua nhà mạng qua cáp quang
- đến data center của trụ sở shopee
- server xử lý request
- response ngược lại cho laptop
- trình duyệt nhận data HTML, CSS, JS -> hiển thị giao diện
  
2. Vào trang shopee.vn, mở DevTools -> tab Network sẽ thấy như ảnh
![alt text](image.png)

## Câu A2
Các l lỗi semantic
1. Dùng `<div>` vô nghĩa cho header
2. Dùng `<div>` vô nghĩa cho main
3. Không có `<nav>` để điều hướng menu
4. Không dùng `<article>` trong main cho 1 sản phẩm
5. Nên sử dụng các thẻ `<h2>` cho tiêu đề, `<p>` cho thẻ text và `<img>` cho ảnh
5. Dùng `<div>` vô nghĩa cho footer

Sửa lại:

```html
<header>
    <div class="logo">ShopTLU</div>
    <nav class="menu">
        <a href="/">Trang chủ</a>
        <a href="/products">Sản phẩm</a>
    </nav>
</header>
<main>
    <article class="product">
        <h2 class="title">iPhone 16 Pro</h2>
        <p class="price">25.990.000đ</p>
        <img src="iphone.jpg">
    </article>
</main>

<footer>
    <p>© 2026 ShopTLU</p>
</footer>
```

## Câu A3
```text
Hộp 1
Text A Text B
Hộp 2
Text C Text D
Hộp 3
```
Giải thích: `<div>` thẻ này là thẻ dạng block chiếm hết chiều ngang, thẻ sau đó sẽ tự bị đẩy xuống dòng; `<span>` và `<strong>` thì dạng inline-block không chiếm hết dòng, hết thẻ không xuống dòng

## Câu A4
`<thead>` tiêu đề của cột, thường chữ sẽ to hơn in đậm hơn  
`<tbody>` chứa dữ liệu chính, 1 bảng có thể có nhiều `<tbody>`  
`<tfoot>` phần tổng kết cột  

Tại sao không nên dùng `<table>` để tạo layout trang web?
- Vi phạm nguyên tắc Semantic, vì thẻ này sinh ra để hiển thị dữ liệu dạng bảng chứ không phải chia layout
- Tốc độ tải trang chậm vì phải tải hết cả cái bảng mới hiển thị nên nếu có nhiều dữ liệu thì nó rất lâu
- Vì nó không phù hợp để chia layout...

# PHẦN B

## Bài B1
![alt text](./screenshots/B1_profile.png)

## Bài B2
![alt text](./screenshots/B2_products.png)

## Bài B3
Lỗi 1: Dòng 1 — <!DOCTYPE> sai — sửa thành `<!DOCTYPE html>`
Lỗi 2: Thiếu lang trong `<html>` — thêm lang="vi"
Lỗi 3: Dòng 4 - `<title>` không đóng — thêm `</title>`
Lỗi 4: Dòng 5 - charset sai "utf8" — sửa thành "UTF-8"
Lỗi 5: Dòng 8 - `<h1>` không đóng đúng — sửa `</h1>`
Lỗi 6: Dòng 12 - `<a>` không đóng — sửa `</a>`
Lỗi 7: Dòng 12 - href="home" sai — phải là / hoặc #home
Lỗi 8: Dòng 18 - img thiếu dấu "" và alt — sửa src="iphone.jpg" alt="iPhone"
Lỗi 9: Dòng 20 - thẻ `<b>` đóng sai vị trí — phải nằm trong `<p>`
Lỗi 10: Dòng 25 - table thiếu thead/tbody, dùng `<td>` cho tiêu đề
Lỗi 11: Dòng 36 - có 2 thẻ `<main>` — chỉ được 1
Lỗi 12: Dòng 41 - footer không đóng `</p>` và `</footer>`

![alt text](./screenshots/B3_debug.png)

## Bài B4
> Sử dụng trang thegioididong.com để phân tích
1.
![alt text](./screenshots/B4_1.png)
![alt text](./screenshots/B4_2.png)
![alt text](./screenshots/B4_3.png)

3 thẻ semantic HTML5 với 1 thẻ header, 1 thẻ section chỉ slide banner, 1 thẻ img ảnh sản phẩm

![alt text](./screenshots/B4_4.png)

thẻ này không dùng đúng semantic, nên sử dụng thẻ `<article>` để hiển thị 1 sản phẩm độc lập, thẻ cha là section

2. Họ không sử dụng table

3.
![alt text](./screenshots/B4_5.png)

thẻ `<form>` này không ghi method, nên mặc định là method = "GET"  
input type có text và submit

# PHẦN C

## Bài C1
![alt text](./screenshots/C1.png)

## Bài C2
Phản biện:
Việc lạm dụng `<div>` cho mọi thứ thay vì học và sử dụng thêm semantic HTML5 là một cách cũng rất hay, dễ và nhanh nhưng không tối ưu và gây ảnh hưởng lớn tới vấn đề bảo trì lâu dài.  
Đầu tiên, về SEO, các công cụ tìm kiếm như GOOGLE tìm kiếm dựa vào các semantic, nên nếu dùng thẻ `<div>`, bot tìm kiếm đó khó đọc khó hiểu và khó phân tích, ảnh hưởng đến khả năng tìm kiếm.  
Thứ hai, về Accessibility (khả năng truy cập), semantic hỗ trợ tốt hơn cho chức năng "screen readers" (trình đọc màn hình) dành cho những người bị khó khăn về thị lực. Làm chuẩn semantic giúp họ có thể dùng được trang web một cách dễ dàng thuận tiện hơn  
Ví dụ thực tế về semantic: Khi dùng thẻ `<button>`, trình duyệt mặc định hỗ trợ nhấn phím Enter và Space, rất nhanh và tiện dụng. Nhưng nếu sử dụng div thì sẽ phải viết thêm các đoạn mã Javascript và những cái khác để tạo ra tính năng đó, rất phức tạp.  
Nhưng trong 1 vài trường hợp cụ thể, sử dụng `<div>` vẫn rất là ổn như wrapper để chia grid hoặc flexbox.  