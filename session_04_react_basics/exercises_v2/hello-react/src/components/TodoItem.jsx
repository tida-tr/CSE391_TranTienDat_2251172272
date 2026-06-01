import { useState } from "react";

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    function handleSave() {
        if (editText.trim()) {
            onEdit(todo.id, editText);
            setIsEditing(false);
        }
    }

    return (
        <div style={{ display: "flex", alignItems: "center", padding: "12px", margin: "5px 0", background: todo.done ? "#f0fff0" : "#fff", border: "1px solid #eee", borderRadius: "4px" }}>
            <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} style={{ marginRight: "10px" }} />

            {isEditing ? (
                <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                    onBlur={handleSave}
                    autoFocus
                    style={{ flex: 1, padding: "4px" }}
                />
            ) : (
                <span
                    onDoubleClick={() => setIsEditing(true)}
                    style={{ flex: 1, textDecoration: todo.done ? "line-through" : "none", color: todo.done ? "#999" : "#333", cursor: "pointer" }}
                >
                    {todo.text}
                    <br />
                    <small style={{ color: "#aaa", fontSize: "11px" }}>Tạo ngày: {todo.createdAt}</small>
                </span>
            )}

            <button onClick={() => onDelete(todo.id)} style={{ background: "#e74c3c", color: "white", border: "none", padding: "4px 8px", borderRadius: "4px", cursor: "pointer", marginLeft: "10px" }}>🗑</button>
        </div>
    );
}

export default TodoItem;