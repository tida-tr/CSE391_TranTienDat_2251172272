function UserCard({ name, email, avatar }) {
    return (
        <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "15px", margin: "10px", width: "220px", textAlign: "center", background: "#f9f9f9" }}>
            <img src={avatar} alt={name} style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover" }} />
            <h3 style={{ margin: "10px 0 5px 0" }}>{name}</h3>
            <p style={{ color: "#666", fontSize: "14px", margin: "0" }}>{email}</p>
        </div>
    );
}

export default UserCard;