import { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";
import TodoFilter from "./components/TodoFilter";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    if (inputValue.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: inputValue, done: false, createdAt: new Date().toLocaleDateString("vi-VN") }]);
    setInputValue("");
  }

  function toggleTodo(id) {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  function deleteTodo(id) {
    setTodos(todos.filter(t => t.id !== id));
  }

  function editTodo(id, newText) {
    setTodos(todos.map(t => t.id === id ? { ...t, text: newText } : t));
  }

  const filteredTodos = todos.filter(t => filter === "all" ? true : filter === "active" ? !t.done : t.done);
  const placeholderText = filter === "all" ? "Nhập công việc..." : filter === "active" ? "Thêm việc cần làm..." : "Thêm việc đã xong...";

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>📋 Todo List</h1>

      <div style={{ display: "flex", marginBottom: "20px" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder={placeholderText}
          style={{ flex: 1, padding: "10px", fontSize: "16px", border: "2px solid #ddd", borderRadius: "4px 0 0 4px" }}
        />
        <button onClick={addTodo} style={{ padding: "10px 20px", fontSize: "16px", background: "#3498db", color: "white", border: "none", borderRadius: "0 4px 4px 0", cursor: "pointer" }}>
          Thêm
        </button>
      </div>

      <TodoFilter filter={filter} setFilter={setFilter} />

      {filteredTodos.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#999" }}>
          {todos.length === 0 ? "📝 Chưa có công việc nào" : "Không có công việc phù hợp"}
        </div>
      ) : (
        filteredTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />
        ))
      )}

      {todos.length > 0 && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px", padding: "10px", background: "#f9f9f9", borderRadius: "4px" }}>
          <span style={{ fontWeight: "bold", color: "#e74c3c" }}>{todos.filter(t => !t.done).length} việc chưa xong</span>
          <span style={{ color: "#666" }}>Tổng cộng: {todos.length} việc</span>
        </div>
      )}
    </div>
  );
}

export default App;