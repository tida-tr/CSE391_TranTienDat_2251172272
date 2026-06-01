import { useState } from "react";

function UpdateItem() {
    const [items, setItems] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 }
    ]);
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editAge, setEditAge] = useState("");
    const [message, setMessage] = useState("");

    function startEdit(item) {
        setEditingId(item.id);
        setEditName(item.name);
        setEditAge(item.age.toString());
    }

    function saveEdit() {
        if (editName.trim() === "" || editAge === "") return;
        setItems(items.map(item => item.id === editingId ? { ...item, name: editName, age: parseInt(editAge) } : item));
        setEditingId(null);
        setMessage("Đã lưu thành công!");
        setTimeout(() => setMessage(""), 3000);
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Sửa thông tin</h2>
            {message && <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>}
            {items.map(item => (
                <div key={item.id} style={{ padding: "10px", margin: "5px 0", background: editingId === item.id ? "#e8f4f8" : "#f9f9f9" }}>
                    {editingId === item.id ? (
                        <div style={{ display: "flex", gap: "10px" }}>
                            <input value={editName} onChange={(e) => setEditName(e.target.value)} autoFocus style={{ padding: "4px", border: "2px solid #3498db", outline: "none" }} />
                            <input type="number" value={editAge} onChange={(e) => setEditAge(e.target.value)} style={{ padding: "4px", width: "60px", border: "2px solid #3498db", outline: "none" }} />
                            <button onClick={saveEdit} style={{ background: "#27ae60", color: "white", border: "none", padding: "4px 8px" }}>✓ Lưu</button>
                            <button onClick={() => setEditingId(null)} style={{ background: "#95a5a6", color: "white", border: "none", padding: "4px 8px" }}>✕ Hủy</button>
                        </div>
                    ) : (
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>{item.name} - {item.age} tuổi</span>
                            <button onClick={() => startEdit(item)} style={{ background: "#3498db", color: "white", border: "none", padding: "4px 8px" }}>✏️ Sửa</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default UpdateItem;