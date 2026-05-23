const btnOpenAddForm = document.getElementById('btnOpenAddForm');
const btnCancel = document.getElementById('btnCancel');
const studentModal = document.getElementById('studentModal');
const studentForm = document.getElementById('studentForm');
const studentTableBody = document.getElementById('studentTableBody');
const alertBox = document.getElementById('alertBox');
const totalStudentsEl = document.getElementById('totalStudents');
const averageGPAEl = document.getElementById('averageGPA');
const modalTitle = document.getElementById('modalTitle');
const checkAll = document.getElementById('checkAll');

let students = JSON.parse(localStorage.getItem('students')) || [];

function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}

function updateStatistics() {
    totalStudentsEl.innerText = students.length;
    if (students.length === 0) {
        averageGPAEl.innerText = '0.0';
        return;
    }
    let totalGPA = students.reduce((sum, st) => sum + parseFloat(st.gpa), 0);
    averageGPAEl.innerText = (totalGPA / students.length).toFixed(2);
}

function renderStudents() {
    studentTableBody.innerHTML = '';
    if (students.length === 0) {
        studentTableBody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-muted py-4">Chưa có dữ liệu sinh viên. Hãy thêm mới!</td>
            </tr>`;
    } else {
        students.forEach((st, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="ps-4"><input type="checkbox" class="form-check-input shadow-none item-check"></td>
                <td class="fw-medium text-dark">${st.name}</td>
                <td class="text-muted">${st.id}</td>
                <td>${st.className}</td>
                <td>${st.dob}</td>
                <td class="fw-semibold text-mint">${st.gpa}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-secondary shadow-none btn-edit me-1" data-index="${index}">Sửa</button>
                    <button class="btn btn-sm btn-outline-danger shadow-none btn-delete" data-index="${index}">Xóa</button>
                </td>
            `;
            studentTableBody.appendChild(tr);
        });
    }
    updateStatistics();
    if (checkAll) checkAll.checked = false;
}

function showAlert(msg, type = 'success') {
    alertBox.className = `alert alert-${type} shadow-sm`;
    alertBox.innerText = msg;
    alertBox.classList.remove('d-none');
    setTimeout(() => alertBox.classList.add('d-none'), 3000);
}

function resetForm() {
    studentForm.reset();
    document.getElementById('editIndex').value = '-1';
    modalTitle.innerText = 'Thêm sinh viên mới';
    clearErrors();
}

function toggleModal(show) {
    studentModal.style.display = show ? 'block' : 'none';
}

function showError(inputId, message) {
    const input = document.getElementById(inputId);
    input.classList.add('is-invalid');
    document.getElementById(`error-${inputId}`).innerText = message;
}

function clearErrors() {
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => input.classList.remove('is-invalid'));
    const errorDivs = document.querySelectorAll('.invalid-feedback');
    errorDivs.forEach(div => div.innerText = '');
}

function validateForm() {
    let isValid = true;
    clearErrors();

    const id = document.getElementById('studentId').value.trim();
    const name = document.getElementById('fullName').value.trim();
    const dob = document.getElementById('dob').value;
    const className = document.getElementById('className').value.trim();
    const gpa = document.getElementById('gpa').value.trim();
    const email = document.getElementById('email').value.trim();

    const idRegex = /^[a-zA-Z0-9]+$/;
    if (!id) {
        showError('studentId', 'Mã sinh viên không được để trống.');
        isValid = false;
    } else if (id.length < 5) {
        showError('studentId', 'Mã sinh viên phải từ 5 ký tự trở lên.');
        isValid = false;
    } else if (!idRegex.test(id)) {
        showError('studentId', 'Mã sinh viên không được chứa ký tự đặc biệt.');
        isValid = false;
    }

    if (!name) {
        showError('fullName', 'Họ và tên không được để trống.');
        isValid = false;
    } else if (name.length < 3) {
        showError('fullName', 'Họ và tên quá ngắn.');
        isValid = false;
    }

    if (!dob) {
        showError('dob', 'Vui lòng chọn ngày sinh.');
        isValid = false;
    } else {
        const selectedDate = new Date(dob);
        const today = new Date();
        if (selectedDate >= today) {
            showError('dob', 'Ngày sinh phải nhỏ hơn ngày hiện tại.');
            isValid = false;
        }
    }

    if (!className) {
        showError('className', 'Lớp học không được để trống.');
        isValid = false;
    }

    if (gpa === '') {
        showError('gpa', 'Điểm trung bình không được để trống.');
        isValid = false;
    } else if (isNaN(gpa) || Number(gpa) < 0 || Number(gpa) > 10) {
        showError('gpa', 'Điểm phải là một số hợp lệ từ 0 đến 10.');
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        showError('email', 'Email không được để trống.');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError('email', 'Email không đúng định dạng (VD: sv@domain.com).');
        isValid = false;
    }

    return isValid;
}

btnOpenAddForm.addEventListener('click', () => {
    resetForm();
    toggleModal(true);
});

btnCancel.addEventListener('click', () => {
    toggleModal(false);
});

studentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    const editIndex = document.getElementById('editIndex').value;

    const newStudent = {
        id: document.getElementById('studentId').value.trim(),
        name: document.getElementById('fullName').value.trim(),
        dob: document.getElementById('dob').value,
        className: document.getElementById('className').value.trim(),
        gpa: document.getElementById('gpa').value.trim(),
        email: document.getElementById('email').value.trim()
    };

    if (editIndex === '-1') {
        students.push(newStudent);
        showAlert('Đã thêm sinh viên thành công!');
    } else {
        students[editIndex] = newStudent;
        showAlert('Đã cập nhật thông tin sinh viên!');
    }

    saveStudents();
    renderStudents();
    toggleModal(false);
});

studentTableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const index = e.target.getAttribute('data-index');
        if (confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
            students.splice(index, 1);
            saveStudents();
            renderStudents();
            showAlert('Đã xóa sinh viên!', 'warning');
        }
    }

    if (e.target.classList.contains('btn-edit')) {
        const index = e.target.getAttribute('data-index');
        const st = students[index];

        clearErrors();

        document.getElementById('studentId').value = st.id;
        document.getElementById('fullName').value = st.name;
        document.getElementById('dob').value = st.dob;
        document.getElementById('className').value = st.className;
        document.getElementById('gpa').value = st.gpa;
        document.getElementById('email').value = st.email;
        document.getElementById('editIndex').value = index;

        modalTitle.innerText = 'Cập nhật sinh viên';
        toggleModal(true);
    }
});

if (checkAll) {
    checkAll.addEventListener('change', (e) => {
        const checkboxes = document.querySelectorAll('.item-check');
        checkboxes.forEach(cb => cb.checked = e.target.checked);
    });
}

renderStudents();