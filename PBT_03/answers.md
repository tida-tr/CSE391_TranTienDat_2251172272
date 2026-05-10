# PHẦN A
## CÂU A1
3 cách nhúng CSS vào HTML
1. Inline CSS (trong thẻ)
```
<h1 style="color: green; font-size: 28px;"> HIHI </h1>
```
Ưu điểm: Áp dụng nhanh chóng cho một element cụ thể, có độ ưu tiên cực cao  
Nhược: Làm code HTML rối, khó bảo trì  
Khi nào nên dùng: Cần thay đổi nhanh, ghi đè CSS style khác trong trường hợp khẩn cấp  

2. Internal CSS (trong `<style>`)
```
<head>
    <style>
        h1 { color: green; font-size: 28px; }
    </style>
</head>
```
Ưu: Không cần thêm file ngoài, tiện lợi.  
Nhược: Không tái sử dụng được, file HTML nặng hơn.  
Khi nào nên dùng: khi muốn viết CSS cho trang mà không muốn ảnh hưởng file tổng.  

3. External CSS (file riêng)
```
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```
Ưu điểm: Tách biệt HTML và CSS, dễ bảo trì, có thể dùng chung 1 file CSS cho nhiều trang web, giúp trình duyệt lưu cache tốt hơn  
Nhược điểm: Tốn thêm một request HTTP để tải file CSS, có thể làm chậm tốc độ hiển thị trang lần đầu   
Khi nào dùng: Luôn luôn nên dùng cho các dự án thực tế và chuyên nghiệp    

Câu hỏi thêm:
Nếu cùng áp dụng cả 3, Inline CSS sẽ "thắng"  
Giải thích: Do cơ chế ưu tiên của CSS. Thứ tự ưu tiên là: Inline > Internal/External (tùy cái nào viết sau). Ưu tiên cái gần nhất

## CÂU A2
1. `h1`                          → Chọn: `<h1>ShopTLU</h1>`
2. `.price `                      → Chọn: `<p class="price">25.990.000đ</p>` và `<p class="price">45.990.000đ</p>`
3. `#app header`                  → Chọn: cả khối header luôn
4. `nav a:first-child`             → Chọn: `<a href="/" class="active">Home</a>`
5. `.product.featured h2`         → Chọn: `<h2>MacBook Pro</h2>`
6. `article > p`                  → Chọn: ``<p class="price">25.990.000đ</p>`, `<p class="price">45.990.000đ</p>`, `<p>Mô tả sản phẩm...</p>` và `<p>Mô tả sản phẩm...</p>`
7. `a[href="/"] `                 → Chọn: `<a href="/" class="active">Home</a>`
8. `.top-bar.dark h1`              → Chọn: `<h1>ShopTLU</h1>`

![alt text](<./screenshots/A2.png>)

## CÂU A3
```
* Trường hợp 1: content-box (mặc định) */
.box-1 {
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
```
→ Chiều rộng hiển thị = 400 + 20 * 2 + 5 * 2 = 450(px)
→ Không gian chiếm trên trang = 450 + 10 * 2 = 470(px)

```
/* Trường hợp 2: border-box */
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
```
→ Chiều rộng hiển thị = 400px
→ Kích thước content thực tế = 400 - 20 * 2 - 10 = 350px
→ Không gian chiếm trên trang = 400 + 10 * 2 = 420px

```
/* Trường hợp 3: Margin collapse */
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
```

→ Khoảng cách giữa box-a và box-b = 40px
→ Giải thích tại sao KHÔNG PHẢI 65px: Trong CSS, có 2 margin tiếp xúc chồng lên nhau, trình duyệt sẽ lấy giá trị lớn hơn chứ không được cộng  
Nâng cao: Nếu có margin âm thì khoảng cách = 30px. Lấy giá trị dương lớn nhất cộng với giá trị âm nhỏ nhất

## CÂU A4
1. Tính specificity score (a, b, c)  
Rule A: p -> (0, 0, 1) (type)   
Rule B: .price -> (0, 1, 0) (class)  
Rule C: #main-price -> (1, 0, 0) (id)     
Rule D: p.price -> (0, 1, 1) (class + type) 

2. Kết quả màu sắc
Element sẽ có màu đỏ    
Giải thích: Rule C có ID selector, đây là loại có độ ưu tiên cao nhất trong 4 rule trên (1, 0, 0).

3. Các trường hợp thêm vào
Nếu thêm style="color: orange;": Element có màu cam. Vì Inline style ưu tiên cao hơn các selector khác.

4. Nếu Rule A thêm !important: Element có màu đen.
Vì !important nó được ưu tiên hơn cả những ưu tiên thông thường, ép trình duyệt áp dụng thuộc tính đó