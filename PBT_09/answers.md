# PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

## Câu A1 (5đ) — DOM Tree & querySelector

**1. Sơ đồ DOM Tree:**
```text
div#app
|-- header
|   |-- h1 ("Todo App")
|   |-- nav
|       |-- a.active ("All")
|       |-- a ("Active")
|       |-- a ("Completed")
|-- main
    |-- form#todoForm
    |   |-- input#todoInput (type="text")
    |   |-- button (type="submit", "Add")
    |-- ul#todoList
        |-- li.todo-item ("Learn HTML")
        |-- li.todo-item.completed ("Learn CSS")     
```

**2.querySelector**

```js
// Chọn thẻ <h1>
document.querySelector('h1');

// Chọn input trong form
document.querySelector('#todoInput'); 
// hoặc: document.querySelector('#todoForm input');

// Chọn tất cả .todo-item
document.querySelectorAll('.todo-item');

// Chọn link đang active
document.querySelector('nav a.active');

// Chọn <li> đầu tiên trong #todoList
document.querySelector('#todoList li'); 
// hoặc: document.querySelector('#todoList li:first-child');

// Chọn tất cả <a> bên trong <nav>
document.querySelectorAll('nav a');
```

## CÂU A2

**Sự khác nhau**
* innerHTML: Lấy hoặc thiết lập nội dung của phần tử bao gồm cả các thẻ HTML. Nó sẽ phân tích cú pháp chuỗi truyền vào thành DOM nodes  
Khi nào dùng: Khi bạn thực sự muốn tạo mới và chèn các thẻ HTML động vào trang (VD: render một list các thẻ `<li>` từ mảng dữ liệu).
* textContent: Chỉ lấy hoặc thiết lập nội dung văn bản (text thuần) của phần tử và các con của nó. Nó phớt lờ mọi thẻ HTML và tự động escape (thoát) các ký tự đặc biệt  
Khi nào dùng: Khi bạn chỉ muốn thay đổi chữ hiển thị mà không làm thay đổi cấu trúc HTML, hoặc khi hiển thị dữ liệu người dùng nhập vào để tránh lỗi bảo mật.

**Câu hỏi bảo mật (Lỗ hổng XSS):**
* Nguyên nhân: Dùng innerHTML để render trực tiếp dữ liệu người dùng nhập vào mà không qua kiểm duyệt sẽ gây ra XSS (Cross-Site Scripting). Trình duyệt sẽ đọc chuỗi input chứa script (như ví dụ thẻ img có thuộc tính onerror chứa mã JS) và tự động thực thi đoạn script độc hại đó.
* Cách sửa: Thay innerHTML bằng textContent để trình duyệt coi đoạn input đó chỉ là một chuỗi văn bản bình thường, không phải là mã HTML để thực thi.
```js
// Mã đã sửa an toàn:
const userInput = document.querySelector("#search").value;
document.querySelector("#result").textContent = userInput; // Dùng textContent thay vì innerHTML
```

## CÂU A3

1. Output khi click vào button (Mặc định):
Do cơ chế Event Bubbling (nổi bọt), sự kiện click sẽ chạy từ thẻ con (nơi được click) lan dần lên các thẻ cha bao bọc nó  
Output thứ tự sẽ là: BUTTON -> INNER -> OUTER

2. Output khi uncomment e.stopPropagation():
Hàm stopPropagation() sẽ ngăn chặn sự kiện nổi bọt lên các phần tử cha. Do đó, sự kiện chỉ được xử lý tại chính phần tử được click (là button)  
Output sẽ là: BUTTON