function ConditionalDemo() {
    const isOnline = true;
    const isLoggedIn = true;
    const stock = 0;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Trạng thái: {isOnline ? "🟢 Online" : "🔴 Offline"}</h2>

            {isLoggedIn && (
                <nav style={{ background: "#f0f0f0", padding: "10px", margin: "10px 0", borderRadius: "4px" }}>
                    <span>Trang chủ | Hồ sơ | Cài đặt</span>
                </nav>
            )}

            <p>Kho hàng: {stock === 0 ? <span style={{ color: "red", fontWeight: "bold" }}>Hết hàng</span> : `Còn lại: ${stock}`}</p>
        </div>
    );
}

export default ConditionalDemo;