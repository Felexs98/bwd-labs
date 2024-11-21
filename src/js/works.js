document.addEventListener('DOMContentLoaded', () => {
    const taskContainer = document.querySelector('.task-container');
    const addDialogButton = document.getElementById('addDialogButton');
    const taskNameInput = document.getElementById('taskName');
    const openDialogButton = document.getElementById('openDialogButton');
    const closeDialogButton = document.getElementById('closeDialogButton');
    const taskDialog = document.getElementById('taskDialog');
    const markInProgressButton = document.querySelector('.progress-button');
    const markCompletedButton = document.querySelector('.complete-button');
    const sortAscButton = document.getElementById('sortAscButton');
    const sortDescButton = document.getElementById('sortDescButton');

    // Загрузка сохранённых задач
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskContainer.innerHTML = '';
        tasks.forEach(({ text, status }) => addTask(text, status));
    }

    // Сохранение задач в localStorage
    function saveTasks() {
        const tasks = Array.from(taskContainer.querySelectorAll('.task-card')).map(task => ({
            text: task.querySelector('label').textContent.trim(),
            status: task.dataset.status || 'to-do'
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Добавление задачи в DOM
    function addTask(taskText, status = 'to-do') {
        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card');
        taskCard.dataset.status = status;

        taskCard.innerHTML = `
            <div class="task-info">
                <input type="checkbox">
                <label>${taskText}</label>
            </div>
            <div class="task-status">
                <span class="status">${getStatusText(status)}</span>
                <button class="delete-button">Удалить</button>
            </div>
        `;

        // Удаление задачи
        taskCard.querySelector('.delete-button').addEventListener('click', () => {
            taskCard.remove();
            saveTasks();
        });

        taskContainer.appendChild(taskCard);
    }

    // Получение текста статуса задачи
    function getStatusText(status) {
        if (status === 'to-do') return 'В работе';
        if (status === 'in-progress') return 'Выполненные';
        return 'Готов';
    }

    // Обработчики изменения статуса
    function updateStatus(newStatus) {
        const selectedTasks = Array.from(taskContainer.querySelectorAll('.task-card input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.closest('.task-card'));

        selectedTasks.forEach(taskCard => {
            taskCard.dataset.status = newStatus;
            taskCard.querySelector('.status').textContent = getStatusText(newStatus);
            taskCard.querySelector('input[type="checkbox"]').checked = false; // Снимаем отметку
        });

        saveTasks();
    }

    // Обработчик кнопки "Отметить в работе"
    markInProgressButton.addEventListener('click', () => {
        updateStatus('in-progress');
    });

    // Обработчик кнопки "Отметить как выполненным"
    markCompletedButton.addEventListener('click', () => {
        updateStatus('completed');
    });

    // Сортировка задач
    function sortTasks(order) {
        const tasks = Array.from(taskContainer.querySelectorAll('.task-card'));
        tasks.sort((a, b) => {
            const textA = a.querySelector('label').textContent.trim();
            const textB = b.querySelector('label').textContent.trim();
            return order === 'asc' ? textA.localeCompare(textB) : textB.localeCompare(textA);
        });

        // Очистить контейнер и добавить отсортированные задачи
        taskContainer.innerHTML = '';
        tasks.forEach(task => taskContainer.appendChild(task));
    }

    // Обработчики сортировки
    sortAscButton.addEventListener('click', () => sortTasks('asc'));
    sortDescButton.addEventListener('click', () => sortTasks('desc'));

    // Открытие и закрытие модального окна
    openDialogButton.addEventListener('click', () => {
        taskDialog.showModal();
    });

    closeDialogButton.addEventListener('click', () => {
        taskDialog.close();
    });

    addDialogButton.addEventListener('click', () => {
        const taskText = taskNameInput.value.trim();
        if (taskText) {
            addTask(taskText);
            saveTasks();
            taskNameInput.value = '';
            taskDialog.close(); // Закрываем модальное окно
        }
    });

    // Загрузка задач при открытии страницы
    loadTasks();
});