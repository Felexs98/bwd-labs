// JavaScript для управления боковым меню и бургер-меню

document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const sidebar = document.querySelector('.sidebar');
    const navLinks = document.querySelectorAll('.sidebar-menu a');

    // Открытие и закрытие бокового меню при клике на бургер-меню
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('open');
        sidebar.classList.toggle('open');
    });

    // Закрытие бокового меню при клике на любую ссылку внутри бокового меню
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('open');
            sidebar.classList.remove('open');
        });
    });

    // Закрытие бокового меню при клике вне его области
    document.addEventListener('click', (event) => {
        if (!sidebar.contains(event.target) && !burgerMenu.contains(event.target)) {
            burgerMenu.classList.remove('open');
            sidebar.classList.remove('open');
        }
    });
});