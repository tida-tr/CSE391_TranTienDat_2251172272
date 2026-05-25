const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const incompleteTasksEl = document.getElementById('incompleteTasks');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateStatistics() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.isCompleted).length;

    totalTasksEl.innerText = total;
    completedTasksEl.innerText = completed;
    incompleteTasksEl.innerText = total - completed;
}

function renderTasks() {
    taskList.innerHTML = '';
    if (tasks.length === 0) {
        taskList.innerHTML = `<div class="col-12 text-center text-muted py-5">Chưa có công việc nào. Hãy thêm mới!</div>`;
    } else {
        tasks.forEach((task, index) => {
            let priorityColor = 'text-success';
            if (task.priority === 'Cao') priorityColor = 'text-danger';
            if (task.priority === 'Trung bình') priorityColor = 'text-warning';

            const card = document.createElement('div');
            card.className = 'col-md-6 col-lg-4';
            card.innerHTML = `
                <div class="card h-100 shadow-sm rounded-3 task-card ${task.isCompleted ? 'task-completed' : ''}">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="card-title fw-bold task-title mb-0">${task.title}</h5>
                            <div class="form-check form-switch">
                                <input class="form-check-input shadow-none btn-toggle-status" type="checkbox" role="switch" data-index="${index}" ${task.isCompleted ? 'checked' : ''} title="Đánh dấu hoàn thành">
                            </div>
                        </div>
                        <p class="card-text text-muted small mb-3">${task.desc}</p>
                        <div class="d-flex justify-content-between text-secondary small mb-3">
                            <span><i class="fw-bold">Hạn:</i> ${task.deadline}</span>
                            <span class="fw-bold ${priorityColor}">${task.priority}</span>
                        </div>
                    </div>
                    <div class="card-footer bg-transparent border-top-0 pt-0 d-flex justify-content-end gap-2">
                        <button class="btn btn-sm btn-outline-secondary shadow-none btn-edit" data-index="${index}">Sửa</button>
                        <button class="btn btn-sm btn-outline-danger shadow-none btn-delete" data-index="${index}">Xóa</button>
                    </div>
                </div>
            `;
            taskList.appendChild(card);
        });
    }
    updateStatistics();
}

renderTasks();

const btnOpenAddForm = document.getElementById('btnOpenAddForm');
const btnCancel = document.getElementById('btnCancel');
const taskModal = document.getElementById('taskModal');
const taskForm = document.getElementById('taskForm');
const alertBox = document.getElementById('alertBox');
const modalTitle = document.getElementById('modalTitle');

function showAlert(msg, type = 'success') {
    alertBox.className = `alert alert-${type} shadow-sm`;
    alertBox.innerText = msg;
    alertBox.classList.remove('d-none');
    setTimeout(() => alertBox.classList.add('d-none'), 3000);
}

function toggleModal(show) {
    taskModal.style.display = show ? 'block' : 'none';
}

function resetForm() {
    taskForm.reset();
    document.getElementById('editIndex').value = '-1';
    modalTitle.innerText = 'Thêm công việc mới';
}

btnOpenAddForm.addEventListener('click', () => { resetForm(); toggleModal(true); });
btnCancel.addEventListener('click', () => { toggleModal(false); });

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const editIndex = document.getElementById('editIndex').value;
    const newTask = {
        title: document.getElementById('taskTitle').value.trim(),
        desc: document.getElementById('taskDesc').value.trim(),
        deadline: document.getElementById('taskDeadline').value,
        priority: document.getElementById('taskPriority').value,
        isCompleted: editIndex !== '-1' ? tasks[editIndex].isCompleted : false
    };

    if (editIndex === '-1') {
        tasks.push(newTask);
        showAlert('Đã thêm công việc thành công!');
    } else {
        tasks[editIndex] = newTask;
        showAlert('Đã cập nhật công việc!');
    }

    saveTasks();
    renderTasks();
    toggleModal(false);
});