import { useState } from "react";

function InputEvents() {
    const [email, setEmail] = useState("");

    const wordCount = email.trim() === "" ? 0 : email.trim().split(/\s+/).length;
    const isValidEmail = email.includes("@");

    return (
        <div style={{ padding: "20px" }}>
            <h2>Input Events</h2>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn..."
                style={{ padding: "8px", width: "300px" }}
            />
            <div style={{ marginTop: "10px" }}>
                <p>Preview: <strong>{email}</strong></p>
                <p>Số từ: {wordCount}</p>
                {email.length > 0 && (
                    <p style={{ color: isValidEmail ? "green" : "red" }}>
                        {isValidEmail ? "✅ Email hợp lệ" : "❌ Email thiếu ký tự '@'"}
                    </p>
                )}
            </div>
        </div>
    );
}

export default InputEvents;