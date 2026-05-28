const nameInput = document.getElementById('name');
const nameStatus = document.getElementById('name-status');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');
const passwordInput = document.getElementById('password');
const strengthBar = document.getElementById('strength-bar');
const confirmInput = document.getElementById('confirm');
const confirmStatus = document.getElementById('confirm-status');
const phoneInput = document.getElementById('phone');
const submitBtn = document.getElementById('submit-btn');
const form = document.getElementById('register-form');
const modal = document.getElementById('modal-overlay');
const modalInfo = document.getElementById('modal-info');
const closeModal = document.getElementById('close-modal');

const validity = {
    name: false,
    email: false,
    password: false,
    confirm: false,
    phone: false
};

function checkFormReady() {
    const isAllValid = Object.values(validity).every(v => v === true);
    submitBtn.disabled = !isAllValid;
}

nameInput.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    if (val.length >= 2 && val.length <= 50) {
        nameStatus.textContent = '✅';
        validity.name = true;
    } else {
        nameStatus.textContent = '❌';
        validity.name = false;
    }
    checkFormReady();
});

emailInput.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (val === '') {
        emailError.textContent = '';
        validity.email = false;
    } else if (!regex.test(val)) {
        emailError.textContent = 'Email không hợp lệ';
        validity.email = false;
    } else {
        emailError.textContent = '';
        validity.email = true;
    }
    checkFormReady();
});

passwordInput.addEventListener('input', (e) => {
    const val = e.target.value;
    let width = '0%';
    let color = '';
    let isValid = false;

    const hasLettersAndNumbers = /(?=.*[A-Za-z])(?=.*\d)/.test(val);
    const hasAllTypes = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/.test(val);

    if (val.length > 0 && val.length < 8) {
        width = '33%';
        color = '#e74c3c';
    } else if (val.length >= 8) {
        isValid = true;
        if (hasAllTypes) {
            width = '100%';
            color = '#2ecc71';
        } else if (hasLettersAndNumbers) {
            width = '66%';
            color = '#f1c40f';
        } else {
            width = '33%';
            color = '#e74c3c';
        }
    }

    strengthBar.style.width = width;
    strengthBar.style.backgroundColor = color;
    validity.password = isValid;

    if (confirmInput.value) {
        confirmInput.dispatchEvent(new Event('input'));
    }

    checkFormReady();
});

confirmInput.addEventListener('input', (e) => {
    const val = e.target.value;
    if (val === '') {
        confirmStatus.textContent = '';
        validity.confirm = false;
    } else if (val === passwordInput.value) {
        confirmStatus.textContent = '✅';
        validity.confirm = true;
    } else {
        confirmStatus.textContent = '❌';
        validity.confirm = false;
    }
    checkFormReady();
});

phoneInput.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 10);
    let formatted = val;

    if (val.length > 4 && val.length <= 7) {
        formatted = val.slice(0, 4) + '-' + val.slice(4);
    } else if (val.length > 7) {
        formatted = val.slice(0, 4) + '-' + val.slice(4, 7) + '-' + val.slice(7);
    }

    e.target.value = formatted;
    validity.phone = val.length === 10;
    checkFormReady();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!submitBtn.disabled) {
        modalInfo.innerHTML = `
            <p><strong>Tên:</strong> ${nameInput.value}</p>
            <p><strong>Email:</strong> ${emailInput.value}</p>
            <p><strong>SĐT:</strong> ${phoneInput.value}</p>
        `;
        modal.style.display = 'flex';
    }
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});