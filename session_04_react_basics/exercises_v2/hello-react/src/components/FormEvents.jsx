import { useState } from "react";

function FormEvents() {
    const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const emailValid = formData.email.includes("@");
    const passwordsMatch = formData.password === formData.confirmPassword && formData.password !== "";

    function handleSubmit(e) {
        e.preventDefault();
        if (!emailValid) {
            alert("Email không hợp lệ!");
            return;
        }
        if (!passwordsMatch) {
            alert("Mật khẩu không khớp!");
            return;
        }
        alert("Đăng ký thành công!");
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Form Events</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "300px" }}>
                <div>
                    <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" style={{ width: "100%", padding: "8px" }} />
                    {!emailValid && formData.email.length > 0 && <span style={{ color: "red", fontSize: "12px" }}>Email phải chứa '@'</span>}
                </div>

                <div>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Mật khẩu" style={{ width: "100%", padding: "8px" }} />
                </div>

                <div>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Xác nhận mật khẩu" style={{ width: "100%", padding: "8px" }} />
                    {!passwordsMatch && formData.confirmPassword.length > 0 && <span style={{ color: "red", fontSize: "12px" }}>Mật khẩu không khớp</span>}
                </div>

                <button type="submit" style={{ padding: "10px", background: "#27ae60", color: "white", border: "none", cursor: "pointer" }}>Gửi Đăng Ký</button>
            </form>
        </div>
    );
}

export default FormEvents;