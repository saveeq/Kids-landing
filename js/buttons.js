document.addEventListener('DOMContentLoaded', () => {
    // Активируем первый элемент по умолчанию
    const firstBtn = document.querySelector('.type-button_container');
    const firstContent = document.getElementById(firstBtn.getAttribute('data-target'));
    firstBtn.classList.add('active');
    firstContent.classList.add('active');

    // Добавление обработчиков событий на кнопки
    document.querySelectorAll('.type-button_container').forEach(container => {
        container.addEventListener('click', () => {
            // Получаем ID целевого элемента из data-атрибута
            const targetId = container.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);

            // Сначала скрываем все контенты и убираем активное состояние со всех кнопок
            document.querySelectorAll('.price-table_body').forEach(content => {
                content.classList.remove('active');
            });

            document.querySelectorAll('.type-button_container').forEach(btn => {
                btn.classList.remove('active');
            });

            // Активируем выбранную кнопку и показываем соответствующий контент
            container.classList.add('active');
            targetContent.classList.add('active');
        });
    });
});