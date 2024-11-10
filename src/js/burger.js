document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const sidebar = document.querySelector('.sidebar');
    const closeSidebarButton = document.querySelector('.close-sidebar');
    const navLinks = document.querySelectorAll('.sidebar-menu a');

    burgerMenu.addEventListener('click', (event) => {
        event.stopPropagation();
        burgerMenu.classList.toggle('open');
        sidebar.classList.toggle('open');
    });

    closeSidebarButton.addEventListener('click', () => {
        burgerMenu.classList.remove('open');
        sidebar.classList.remove('open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('open');
            sidebar.classList.remove('open');
        });
    });

    document.addEventListener('click', (event) => {
        if (!sidebar.contains(event.target) && !burgerMenu.contains(event.target)) {
            burgerMenu.classList.remove('open');
            sidebar.classList.remove('open');
        }
    });
});
