import { useState, useEffect } from "react";

function DeleteItem() {
    const [items, setItems] = useState([{ id: 1, name: "Minh" }, { id: 2, name: "An" }, { id: 3, name: "Linh" }]);
    const [deletedItem, setDeletedItem] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        let timer;
        if (deletedItem) {
            timer = setTimeout(() => {
                setDeletedItem(null);
                setMessage("");
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [deletedItem]);

    function handleDelete(id) {
        const itemToDelete = items.find(item => item.id === id);
        if (window.confirm(`Bạn có chắc muốn xóa ${itemToDelete.name}?`)) {
            setItems(items.filter(item => item.id !== id));
            setDeletedItem(itemToDelete);
            setMessage(`Đã xóa ${itemToDelete.name}`);
        }
    }

    function undoDelete() {
        if (deletedItem) {
            setItems([...items, deletedItem].sort((a, b) => a.id - b.id));
            setDeletedItem(null);
            setMessage("");
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Xóa sinh viên</h2>
            {message && (
                <div style={{ padding: "10px", background: "#ffeaa7", marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
                    <span>{message}</span>
                    {deletedItem && <button onClick={undoDelete}>Hoàn tác</button>}
                </div>
            )}
            {items.map(item => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px", margin: "5px 0", background: "#f9f9f9" }}>
                    <span>{item.name}</span>
                    <button onClick={() => handleDelete(item.id)} style={{ background: "#e74c3c", color: "white", border: "none" }}>Xóa</button>
                </div>
            ))}
        </div>
    );
}

export default DeleteItem;