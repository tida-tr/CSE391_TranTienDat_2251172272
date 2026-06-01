function Header() {
    return (
        <header style={{ background: "#2c3e50", color: "white", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1>Cửa hàng điện thoại</h1>
            <nav>
                <a href="/" style={{ color: "white", marginRight: "15px", textDecoration: "none" }}>Trang chủ</a>
                <a href="/about" style={{ color: "white", textDecoration: "none" }}>Giới thiệu</a>
            </nav>
        </header>
    );
}

export default Header;