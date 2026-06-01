import { useState } from "react";

function StringState() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    return (
        <div style={{ padding: "20px" }}>
            <h2>Nhập thông tin</h2>

            <div style={{ marginBottom: "10px" }}>
                <label>Tên ({name.length}/100): </label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                />
            </div>

            <div style={{ marginBottom: "10px" }}>
                <label>Email: </label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {email.includes("@") && <span style={{ color: "green", marginLeft: "10px" }}>Email hợp lệ</span>}
            </div>
        </div>
    );
}

export default StringState;