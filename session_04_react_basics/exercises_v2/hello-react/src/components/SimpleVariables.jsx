function SimpleVariables() {
    const name = "Trần Tiến Đạt";
    const age = 22;
    const hometown = "Nam Định";

    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Chào buổi sáng" : hour < 18 ? "Chào buổi chiều" : "Chào buổi tối";

    const weight = 65;
    const height = 1.72;
    const bmi = (weight / (height * height)).toFixed(2);

    return (
        <div style={{ padding: "20px" }}>
            <h2>{greeting}!</h2>
            <p>Họ tên: {name}</p>
            <p>Tuổi: {age}</p>
            <p>Quê quán: {hometown}</p>
            <p>Chỉ số BMI: {bmi}</p>
        </div>
    );
}

export default SimpleVariables;