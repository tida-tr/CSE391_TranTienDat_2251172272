// 1. pipe() - Nối chuỗi functions
function pipe(...fns) {
    return (initialValue) => fns.reduce((acc, fn) => fn(acc), initialValue);
}

const process = pipe(
    x => x * 2,             // 5 -> 10
    x => x + 10,            // 10 -> 20
    x => x.toString(),      // 20 -> "20"
    x => "Kết quả: " + x    // -> "Kết quả: 20"
);
console.log(process(5));  // -> "Kết quả: 20"


// 2. memoize() - Cache kết quả
function memoize(fn) {
    const cache = {};
    return function (...args) {
        const key = JSON.stringify(args);
        if (cache[key] !== undefined) {
            return cache[key];
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log(expensiveCalc(1000000)); // -> "Đang tính..." -> 499999500000
console.log(expensiveCalc(1000000)); // -> (không in "Đang tính...", lấy cache!)


// 3. debounce() - Chờ user ngừng gõ mới thực hiện
function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

// Gọi liên tục -> chỉ lần cuối mới chạy
search("j");
search("ja");
search("jav");
search("java"); // Sau 500ms sẽ chỉ in: "Searching: java"


// 4. retry() - Thử lại nếu lỗi
async function retry(fn, maxAttempts = 3) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (attempt === maxAttempts) throw error;
            console.log(`Lỗi lần ${attempt}, đang thử lại...`);
        }
    }
}

// Test retry
let attemptCount = 0;
const fakeApiCall = async () => {
    attemptCount++;
    if (attemptCount < 3) throw new Error("Network Error");
    return "Fetch thành công!";
};

retry(fakeApiCall, 3)
    .then(res => console.log("Kết quả retry:", res))
    .catch(err => console.log("Thất bại toàn tập:", err.message));