document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    // Функция для проверки видимости элемента
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Функция для обработки скролла с троттлингом
    function handleScroll() {
        cards.forEach((card, index) => {
            if (isElementInViewport(card) && !card.classList.contains('show')) {
                // Добавляем задержку для каждой последующей карточки
                setTimeout(() => {
                    card.classList.add('show');
                }, index * 200); // 200ms задержка между карточками
            }
        });
    }
    
    // Добавляем троттлинг для оптимизации
    let isScrolling;
    window.addEventListener('scroll', function() {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(handleScroll, 50);
    });
    
    // Проверяем при загрузке страницы
    handleScroll();
});