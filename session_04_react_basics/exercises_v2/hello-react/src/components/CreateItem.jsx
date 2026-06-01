import { useState, useRef } from "react";

function CreateItem() {
    const [items, setItems] = useState([{ id: 1, name: "HTML" }, { id: 2, name: "CSS" }]);
    const [newName, setNewName] = useState("");
    const [message, setMessage] = useState("");
    const inputRef = useRef(null);

    function handleAdd() {
        if (newName.trim() === "") return;
        setItems([...items, { id: Date.now(), name: newName }]);
        setNewName("");
        setMessage("Đã thêm thành công!");
        setTimeout(() => setMessage(""), 3000);
        inputRef.current?.focus();
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Thêm môn học</h2>
            {message && <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>}
            <div style={{ marginBottom: "15px" }}>
                <input
                    ref={inputRef}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                    style={{ padding: "8px", marginRight: "10px" }}
                />
                <button onClick={handleAdd} style={{ padding: "8px 16px" }}>➕ Thêm</button>
            </div>
            {items.map(item => (
                <div key={item.id} style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                    {item.name}
                </div>
            ))}
        </div>
    );
}

export default CreateItem;