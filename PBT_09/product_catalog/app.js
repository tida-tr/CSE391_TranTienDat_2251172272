const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/200", rating: 4.8 },
    { id: 2, name: "Samsung S24", price: 22990000, category: "phone", image: "https://placehold.co/200", rating: 4.5 },
    { id: 3, name: "Xiaomi 14", price: 18990000, category: "phone", image: "https://placehold.co/200", rating: 4.2 },
    { id: 4, name: "MacBook Pro", price: 45990000, category: "laptop", image: "https://placehold.co/200", rating: 4.9 },
    { id: 5, name: "Dell XPS 15", price: 35990000, category: "laptop", image: "https://placehold.co/200", rating: 4.6 },
    { id: 6, name: "ThinkPad X1", price: 32990000, category: "laptop", image: "https://placehold.co/200", rating: 4.7 },
    { id: 7, name: "iPad Pro", price: 28990000, category: "tablet", image: "https://placehold.co/200", rating: 4.8 },
    { id: 8, name: "Galaxy Tab S9", price: 20990000, category: "tablet", image: "https://placehold.co/200", rating: 4.4 },
    { id: 9, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", image: "https://placehold.co/200", rating: 4.3 },
    { id: 10, name: "AirPods Pro", price: 6990000, category: "accessory", image: "https://placehold.co/200", rating: 4.5 },
    { id: 11, name: "Galaxy Buds", price: 3490000, category: "accessory", image: "https://placehold.co/200", rating: 4.1 },
    { id: 12, name: "Apple Watch", price: 10990000, category: "accessory", image: "https://placehold.co/200", rating: 4.6 }
];

let currentCat = "all";
let currentQuery = "";
let currentSort = "default";
let cartCount = 0;

const catalogElement = document.getElementById("catalog");
const searchInput = document.getElementById("search-input");
const catBtns = document.querySelectorAll(".cat-btn");
const sortSelect = document.getElementById("sort-select");
const cartBadge = document.getElementById("cart-badge");
const themeToggle = document.getElementById("theme-toggle");

function renderProducts(data) {
    catalogElement.innerHTML = "";

    data.forEach(product => {
        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = product.image;

        const title = document.createElement("h3");
        title.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = `Giá: ${product.price.toLocaleString("vi-VN")}đ`;

        const rating = document.createElement("p");
        rating.textContent = `⭐ ${product.rating}`;

        const btn = document.createElement("button");
        btn.className = "add-to-cart";
        btn.textContent = "Thêm giỏ";

        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            cartCount++;
            cartBadge.textContent = cartCount;
        });

        card.addEventListener("click", () => showModal(product));

        card.append(img, title, price, rating, btn);
        catalogElement.appendChild(card);
    });
}

function filterByCategory(cat) {
    currentCat = cat;
    applyFilters();
}

function searchProducts(query) {
    currentQuery = query.toLowerCase().trim();
    applyFilters();
}

function sortProducts(sortType) {
    currentSort = sortType;
    applyFilters();
}

function applyFilters() {
    let filtered = products.filter(p => p.name.toLowerCase().includes(currentQuery));

    if (currentCat !== "all") {
        filtered = filtered.filter(p => p.category === currentCat);
    }

    if (currentSort === "price-asc") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === "price-desc") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === "name-asc") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSort === "rating-desc") {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    renderProducts(filtered);
}

function showModal(product) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    const content = document.createElement("div");
    content.className = "modal-content";

    const closeBtn = document.createElement("button");
    closeBtn.className = "close-btn";
    closeBtn.textContent = "✕";
    closeBtn.onclick = () => document.body.removeChild(overlay);

    const img = document.createElement("img");
    img.src = product.image;
    img.style.width = "100%";

    const title = document.createElement("h2");
    title.textContent = product.name;

    const cat = document.createElement("p");
    cat.textContent = `Danh mục: ${product.category.toUpperCase()}`;

    const price = document.createElement("p");
    price.textContent = `Giá: ${product.price.toLocaleString("vi-VN")}đ`;

    content.append(closeBtn, img, title, cat, price);
    overlay.appendChild(content);

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) document.body.removeChild(overlay);
    });

    document.body.appendChild(overlay);
}

searchInput.addEventListener("input", (e) => {
    searchProducts(e.target.value);
});

catBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        catBtns.forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        filterByCategory(e.target.dataset.cat);
    });
});

sortSelect.addEventListener("change", (e) => {
    sortProducts(e.target.value);
});

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

renderProducts(products);