import { useState } from "react";

function ClickEvents() {
    const [bgColor, setBgColor] = useState("#ffffff");
    const [btn1Count, setBtn1Count] = useState(0);
    const [btn2Count, setBtn2Count] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    function changeRandomColor() {
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        setBgColor(randomColor);
    }

    return (
        <div style={{ padding: "20px", backgroundColor: bgColor, transition: "background-color 0.3s" }}>
            <h2>Click Events</h2>
            <button onClick={changeRandomColor}>Đổi màu nền ngẫu nhiên</button>
            <div style={{ marginTop: "15px" }}>
                <button onClick={() => setBtn1Count(btn1Count + 1)} style={{ marginRight: "10px" }}>
                    Nút 1: {btn1Count}
                </button>
                <button onClick={() => setBtn2Count(btn2Count + 1)}>
                    Nút 2: {btn2Count}
                </button>
            </div>
            <div style={{ marginTop: "15px" }}>
                <button onClick={() => setIsLiked(!isLiked)} style={{ fontSize: "20px", padding: "5px 15px" }}>
                    {isLiked ? "❤️" : "🤍"}
                </button>
            </div>
        </div>
    );
}

export default ClickEvents;