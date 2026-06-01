import { useState } from "react";

function KeyboardEvents() {
    const [targetKey, setTargetKey] = useState("a");
    const [score, setScore] = useState(0);
    const [boxPos, setBoxPos] = useState({ x: 0, y: 0 });
    const [bgColor, setBgColor] = useState("#ffffff");

    function handleKeyDown(e) {
        if (e.key.toLowerCase() === targetKey) {
            setScore(score + 1);
            const chars = "abcdefghijklmnopqrstuvwxyz1234567890";
            setTargetKey(chars[Math.floor(Math.random() * chars.length)]);
        }

        if (e.key === "ArrowUp") setBoxPos(prev => ({ ...prev, y: prev.y - 10 }));
        if (e.key === "ArrowDown") setBoxPos(prev => ({ ...prev, y: prev.y + 10 }));
        if (e.key === "ArrowLeft") setBoxPos(prev => ({ ...prev, x: prev.x - 10 }));
        if (e.key === "ArrowRight") setBoxPos(prev => ({ ...prev, x: prev.x + 10 }));

        if (e.ctrlKey && e.key.toLowerCase() === "d") {
            e.preventDefault();
            setBgColor(prev => prev === "#ffffff" ? "#ffeaa7" : "#ffffff");
        }
    }

    return (
        <div
            tabIndex={0}
            onKeyDown={handleKeyDown}
            style={{ padding: "20px", outline: "none", backgroundColor: bgColor, minHeight: "250px", position: "relative" }}
        >
            <h2>Keyboard Events</h2>
            <p>Game đoán phím: Hãy nhấn phím <strong>{targetKey.toUpperCase()}</strong> | Điểm: {score}</p>
            <p style={{ color: "#666", fontSize: "14px" }}>Thử thách: Dùng phím mũi tên để di chuyển khối vuông. Nhấn Ctrl+D để đổi màu nền.</p>

            <div style={{
                position: "absolute",
                top: 150 + boxPos.y,
                left: 20 + boxPos.x,
                width: "40px",
                height: "40px",
                backgroundColor: "#0984e3",
                transition: "top 0.1s, left 0.1s"
            }} />
        </div>
    );
}

export default KeyboardEvents;