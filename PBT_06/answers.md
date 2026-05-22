# PHẦN A

# Câu A1
**Dự đoán Output:**
- Đoạn 1: undefined (Do var có hoisting nhưng chỉ đưa phần khai báo lên đầu, chưa gán giá trị).
- Đoạn 2: Lỗi ReferenceError (Do let nằm trong vùng nhớ tạm thời "Temporal Dead Zone - TDZ", không thể truy cập trước khi khởi tạo).
- Đoạn 3: Lỗi TypeError: Assignment to constant variable. (Không thể gán lại giá trị cho biến const).
- Đoạn 4: [1, 2, 3, 4] (const chỉ không cho phép gán lại toàn bộ biến bằng một giá trị mới, nhưng vẫn cho phép thay đổi nội dung bên trong object/array).
- Đoạn 5:
Trong block: 2
Ngoài block: 1
(Giải thích: let có block scope, nên biến a bên trong {} là một biến hoàn toàn độc lập với biến a bên ngoài).

## Câu A2 (5đ) — Data Types & Coercion

**1. Dự đoán kết quả:**
* `console.log(typeof null);` // "object"
* `console.log(typeof undefined);` // "undefined"
* `console.log(typeof NaN);` // "number"
* `console.log("5" + 3);` // "53"
* `console.log("5" - 3);` // 2
* `console.log("5" * "3");` // 15
* `console.log(true + true);` // 2
* `console.log([] + []);` // ""
* `console.log([] + {});` // "[object Object]"
* `console.log({} + []);` // "[object Object]"

**2. Giải thích sự khác biệt giữa `"5" + 3` và `"5" - 3`:**
* **`"5" + 3` (Kết quả là "53"):** Khi sử dụng toán tử `+` và có một toán hạng là chuỗi (String), JavaScript sẽ ưu tiên thực hiện phép **nối chuỗi**. Nó tự động ép kiểu số `3` thành chuỗi `"3"` và nối lại thành `"53"`.
* **`"5" - 3` (Kết quả là 2):** Toán tử `-` chỉ được dùng cho các phép tính toán học. Do đó, JavaScript bắt buộc phải **ép kiểu chuỗi về số** (Type Coercion). Chuỗi `"5"` biến thành số `5`, và thực hiện phép toán `5 - 3 = 2`.

## Câu A3 (5đ) — So sánh == vs ===

**1. Dự đoán true hay false:**
* `console.log(5 == "5");` // true
* `console.log(5 === "5");` // false
* `console.log(null == undefined);` // true
* `console.log(null === undefined);` // false
* `console.log(NaN == NaN);` // false (Quy tắc đặc biệt: NaN không bằng bất cứ thứ gì, kể cả chính nó)
* `console.log(0 == false);` // true
* `console.log(0 === false);` // false
* `console.log("" == false);` // true

**2. Quy tắc: Từ giờ trở đi, bạn nên dùng == hay ===? Tại sao?**
* **Nên dùng:** Luôn luôn sử dụng **`===`** (và `!==`).
* **Tại sao:** `===` là phép so sánh nghiêm ngặt (Strict Equality), nó kiểm tra sự đồng nhất của cả **giá trị** lẫn **kiểu dữ liệu**. Trong khi đó, `==` (Loose Equality) sẽ tự động ép kiểu (Type Coercion) ngầm định trước khi so sánh, dễ gây ra các lỗi logic khó lường và khó debug (ví dụ như việc `"" == false` lại trả về `true`). Dùng `===` giúp code an toàn và dễ đoán hơn.

## Câu A4 (5đ) — Truthy & Falsy

**1. TẤT CẢ các giá trị Falsy trong JavaScript (8 giá trị):**
Trong JavaScript, chỉ có đúng 8 giá trị sau đây được coi là Falsy (tự động chuyển thành `false` trong câu lệnh điều kiện):
1. `false`
2. `0`
3. `-0`
4. `0n` (BigInt zero)
5. `""` (chuỗi rỗng)
6. `null`
7. `undefined`
8. `NaN`
*(Mọi giá trị khác không nằm trong danh sách này đều là Truthy).*

**2. Dự đoán kết quả:**
* `if ("0") console.log("A");` // **In** (Chuỗi có chứa ký tự "0" là chuỗi khác rỗng -> Truthy)
* `if ("") console.log("B");` // **Không in** (Chuỗi rỗng là Falsy)
* `if ([]) console.log("C");` // **In** (Array, kể cả array trống, luôn là một Object -> Truthy)
* `if ({}) console.log("D");` // **In** (Object, kể cả object trống, luôn là Truthy)
* `if (null) console.log("E");` // **Không in** (Falsy)
* `if (0) console.log("F");` // **Không in** (Falsy)
* `if (-1) console.log("G");` // **In** (Số âm hoặc số dương khác 0 đều là Truthy)
* `if (" ") console.log("H");` // **In** (Chuỗi chứa 1 dấu cách là chuỗi khác rỗng -> Truthy)

## Câu A5 (5đ) — Template Literals

**Viết lại 3 cách nối chuỗi bằng template literal (backtick):**

```javascript
// Cách 1:
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3:
var html = `
<div class="card">
  <h2>${title}</h2>
  <p>${description}</p>
  <span>Giá: ${price}đ</span>
</div>
`;