function ListRendering() {
    const products = [
        { id: 1, name: "Bàn phím cơ Aula F75", price: 1250000 },
        { id: 2, name: "Tai nghe Tangzu Wan'er S.G", price: 450000 },
        { id: 3, name: "Chuột máy tính không dây", price: 850000 },
        { id: 4, name: "Lót chuột cỡ lớn Xanh Mint", price: 180000 },
        { id: 5, name: "Cáp sạc Type-C bọc dù", price: 95000 }
    ];

    const totalPrice = products.reduce((sum, item) => sum + item.price, 0);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Danh sách sản phẩm</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id} style={{ margin: "8px 0" }}>
                        {product.name} -
                        <span style={{ color: product.price > 1000000 ? "red" : "initial", fontWeight: "bold", marginLeft: "5px" }}>
                            {product.price.toLocaleString("vi-VN")}đ
                        </span>
                    </li>
                ))}
            </ul>
            <h3>Tổng giá trị: {totalPrice.toLocaleString("vi-VN")}đ</h3>
        </div>
    );
}

export default ListRendering;