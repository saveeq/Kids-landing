let activeBox = null;

function toggleBox(box) {
    // Если кликнули на уже активный — свернуть
    if (activeBox === box) {
        collapseBox(box);
        activeBox = null;
        return;
    }

    // Свернуть предыдущий, если есть
    if (activeBox) {
        collapseBox(activeBox);
    }

    // Активируем текущий
    box.classList.add('active');
    const content = box.querySelector('.item-content');
    content.setAttribute('data-hidden', 'true'); // скрыть текст

    // Показать текст с задержкой
    setTimeout(() => {
        content.textContent = 'КТ-снимок (компьютерная томография) — это послойное изображение внутренних органов, полученное с помощью рентгеновских лучей компьютерной обработки.Позволяет детально изучить структуры тела(кости, органы, сосуды) в разных проекциях.Быстро, точно и безболезненно.';
        content.setAttribute('data-hidden', 'false');
    }, 500); // после расширения

    activeBox = box;
}

function collapseBox(box) {
    box.classList.remove('active');
    const content = box.querySelector('.item-content');
    content.setAttribute('data-hidden', 'true');

    // Очистить текст после анимации
    setTimeout(() => {
        content.textContent = 'Нажмите';
    }, 300);
}

// Клик вне элемента
document.addEventListener('click', function (e) {
    const clickedInside = e.target.closest('.items-wrapper_item');
    if (!clickedInside && activeBox) {
        collapseBox(activeBox);
        activeBox = null;
    }
});
