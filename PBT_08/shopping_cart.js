function createCart() {
    let items = [];
    let discountRate = 0;
    let discountFixed = 0;

    return {
        addItem(product, quantity = 1) {
            const existing = items.find(item => item.id === product.id);
            if (existing) {
                existing.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },

        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },

        updateQuantity(productId, newQuantity) {
            const item = items.find(item => item.id === productId);
            if (item) item.quantity = newQuantity;
        },

        getTotal() {
            const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            return Math.max(0, subtotal * (1 - discountRate) - discountFixed);
        },

        applyDiscount(code) {
            discountRate = 0;
            discountFixed = 0;
            if (code === "SALE10") discountRate = 0.1;
            else if (code === "SALE20") discountRate = 0.2;
            else if (code === "FREESHIP") discountFixed = 30000;
        },

        printCart() {
            console.log("┌───┬──────────────┬────┬────────────┬────────────┐");
            console.log("│ # │ Sản phẩm     │ SL │ Đơn giá    │ Tổng       │");
            console.log("├───┼──────────────┼────┼────────────┼────────────┤");

            items.forEach((item, index) => {
                const priceStr = item.price.toLocaleString("vi-VN");
                const totalStr = (item.price * item.quantity).toLocaleString("vi-VN");
                console.log(
                    `│ ${String(index + 1).padEnd(1)} │ ${item.name.padEnd(12)} │ ${String(item.quantity).padStart(2)} │ ${priceStr.padStart(10)} │ ${totalStr.padStart(10)} │`
                );
            });

            console.log("├───┴──────────────┴────┴────────────┴────────────┤");
            const finalTotal = this.getTotal().toLocaleString("vi-VN") + "đ";
            console.log(`│ Tổng cộng: ${finalTotal.padStart(37)} │`);
            console.log("└─────────────────────────────────────────────────┘");
        },

        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },

        clearCart() {
            items = [];
            discountRate = 0;
            discountFixed = 0;
        }
    };
}

const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);

cart.printCart();

cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount());
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount());