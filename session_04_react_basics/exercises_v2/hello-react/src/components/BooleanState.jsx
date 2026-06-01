import { useState } from "react";

function BooleanState() {
    const [showPassword, setShowPassword] = useState(false);
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [isLightOn, setIsLightOn] = useState(false);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Boolean & Toggle</h2>

            <div style={{ marginBottom: "15px" }}>
                <label>Mật khẩu: </label>
                <input type={showPassword ? "text" : "password"} />
                <button onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "Ẩn" : "Hiện"}
                </button>
            </div>

            <div style={{ border: "1px solid #ddd", width: "300px", marginBottom: "15px" }}>
                <h3
                    onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                    style={{ margin: 0, padding: "10px", background: "#f0f0f0", cursor: "pointer" }}
                >
                    Accordion Tiêu đề {isAccordionOpen ? "▲" : "▼"}
                </h3>
                {isAccordionOpen && <div style={{ padding: "10px" }}>Đây là nội dung của accordion!</div>}
            </div>

            <div>
                <button onClick={() => setIsLightOn(!isLightOn)} style={{ fontSize: "16px", padding: "5px 15px" }}>
                    {isLightOn ? "💡 Bật" : "🌑 Tắt"}
                </button>
            </div>
        </div>
    );
}

export default BooleanState;