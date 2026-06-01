import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import UserCard from "./components/UserCard";
import PriceTag from "./components/PriceTag";

function App() {
  const products = [
    { id: 1, name: "iPhone 15", price: "25.000.000", image: "https://via.placeholder.com/200" },
    { id: 2, name: "Samsung S24", price: "22.000.000", image: "https://via.placeholder.com/200" },
    { id: 3, name: "Xiaomi 14", price: "15.000.000", image: "https://via.placeholder.com/200" }
  ];

  const users = [
    { id: 1, name: "Nguyễn Văn An", email: "an.nguyen@example.com", avatar: "https://via.placeholder.com/150" },
    { id: 2, name: "Lê Thị Linh", email: "linh.le@example.com", avatar: "https://via.placeholder.com/150" },
    { id: 3, name: "Trần Tiến Đạt", email: "dat.tran@example.com", avatar: "https://via.placeholder.com/150" }
  ];

  return (
    <div>
      <Header />

      <main style={{ padding: "20px" }}>
        <h2 style={{ textAlign: "center" }}>Danh sách điện thoại</h2>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
          {products.map(product => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>

        <hr style={{ margin: "40px 0" }} />

        <h2 style={{ textAlign: "center" }}>Thử thách: PriceTag</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", padding: "10px" }}>
          <PriceTag originalPrice={30000000} salePrice={25000000} />
          <PriceTag originalPrice={500000} salePrice={450000} />
        </div>

        <hr style={{ margin: "40px 0" }} />

        <h2 style={{ textAlign: "center" }}>Thử thách: Danh sách thành viên</h2>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
          {users.map(user => (
            <UserCard
              key={user.id}
              name={user.name}
              email={user.email}
              avatar={user.avatar}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;