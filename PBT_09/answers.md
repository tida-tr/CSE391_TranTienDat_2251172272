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

# PHẦN C

## Câu C1

**7 Lỗi và cách sửa:**
1. Lỗi Event Name: `addEventListener("onclick", ...)` -> Sai cú pháp, sửa thành `"click"`.
2. Gán DOM Element: `countDisplay = count` -> Cố tình gán giá trị cho một hằng số (`const`) chứa DOM Object. Sửa thành `countDisplay.textContent = count`.
3. Lỗi xoá HTML: `historyList.innerHTML = null` -> Sẽ bị ép kiểu thành chuỗi `"null"`. Sửa thành `historyList.innerHTML = ""`.
4. Gọi hàm sai: `item.remove;` -> Thiếu dấu ngoặc tròn. Sửa thành `item.remove()`.
5. Kiểu dữ liệu: `localStorage.getItem` trả về String -> Khi cộng chuỗi sẽ bị lỗi, phải ép kiểu thành số `parseInt(...)`.
6. Lỗi Data Restore: Sự kiện `load` quên render lại `historyList` từ localStorage.
7. Lỗi Event: Các `<li>` phục hồi từ localStorage mất event xoá ban đầu -> Dùng **Event Delegation** trên thẻ cha `#history`.

**Code Refactor:**
```javascript
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");
let count = 0;

// Fix Lỗi 7: Event Delegation
historyList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") e.target.remove();
});

// Fix Lỗi 1: "onclick" -> "click"
document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++; 
    countDisplay.textContent = count; // Fix Lỗi 2
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    historyList.append(li);
});

document.querySelector("#decrementBtn").addEventListener("click", function() { 
    count--; 
    countDisplay.textContent = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0; 
    countDisplay.textContent = count; 
    historyList.innerHTML = ""; // Fix Lỗi 3
});

document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        item.remove(); // Fix Lỗi 4
    });
});

window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

window.addEventListener("load", () => {
    count = parseInt(localStorage.getItem("count")) || 0; // Fix Lỗi 5
    countDisplay.textContent = count;
    
    // Fix Lỗi 6
    historyList.innerHTML = localStorage.getItem("history") || ""; 
});
```

## Câu C2
**1. Giải thích:**
* Bad Practice: Bind 1000 events sẽ cực kỳ tốn bộ nhớ do trình duyệt phải tạo và lưu trữ 1000 function objects. Hơn nữa, nếu DOM cập nhật động thêm element mới, element đó sẽ không có event.
* Event Delegation: Giải quyết bằng cách bind 1 event duy nhất lên phần tử cha bọc ngoài. Tận dụng cơ chế Event Bubbling để bắt sự kiện từ các thẻ con thông qua e.target.

**2. Refactor với DocumentFragment**
```js
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div); // KHÔNG gây reflow
}

document.body.appendChild(fragment); // Chỉ 1 lần reflow duy nhất!
```

**Tại sao nhanh hơn:** DocumentFragment hoạt động như một DOM ảo nằm ngoài cây DOM thật. Việc thêm 1000 thẻ vào fragment không bắt trình duyệt tính toán lại bố cục (layout/reflow) hay vẽ lại (repaint) liên tục. Ta chỉ tốn chi phí tài nguyên để reflow đúng 1 lần khi đưa toàn bộ fragment đó vào giao diện chính (document.body).