function PriceTag({ originalPrice, salePrice }) {
    return (
        <div style={{ border: "1px solid #eee", padding: "10px", borderRadius: "4px", display: "inline-block" }}>
            <span style={{ textDecoration: "line-through", color: "#999", marginRight: "10px" }}>
                {originalPrice.toLocaleString("vi-VN")}đ
            </span>
            <span style={{ color: "#e74c3c", fontWeight: "bold" }}>
                {salePrice.toLocaleString("vi-VN")}đ
            </span>
        </div>
    );
}

export default PriceTag;