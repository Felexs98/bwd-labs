document.addEventListener('DOMContentLoaded', () => {
    const openDialogButton = document.getElementById('openDialogButton');
    const taskDialog = document.getElementById('taskDialog');
    const closeDialogButton = document.getElementById('closeDialogButton');
    const overlay = document.getElementById('overlay');
    const addDialogButton = document.getElementById('addDialogButton');

    // Открыть модальное окно
    openDialogButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Остановить всплытие события
        taskDialog.showModal();
        overlay.style.display = 'block'; // Показать оверлей
    });

    // Закрыть модальное окно через кнопку "Закрыть"
    closeDialogButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Остановить всплытие события
        taskDialog.close();
        overlay.style.display = 'none'; // Скрыть оверлей
    });

    // Закрыть модальное окно при нажатии на кнопку "Добавить"
    addDialogButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Остановить всплытие события
        taskDialog.close();
        overlay.style.display = 'none'; // Скрыть оверлей
    });

    // Закрыть модальное окно при клике вне окна (включая нажатие на оверлей)
    document.addEventListener('click', (event) => {
        if (!$(event.target).closest('#taskDialog').length && !$(event.target).is('#taskDialog')) {
            taskDialog.close(); // Закрыть модальное окно
            overlay.style.display = 'none'; // Скрыть оверлей
        }
    });

    // Предотвращаем закрытие при клике внутри модального окна
    taskDialog.addEventListener('click', (event) => {
        event.stopPropagation(); // Остановить всплытие события
    });
});
