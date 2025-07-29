document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Закрываем все остальные ответы
            // Если вы хотите, чтобы несколько ответов могли быть открыты одновременно,
            // удалите или закомментируйте следующие 6 строк:
            faqQuestions.forEach(item => {
                item.classList.remove('active');
                item.nextElementSibling.style.maxHeight = null;
            });
            
            // Переключаем текущий ответ
            if (!isActive) {
                this.classList.add('active');
                answer.style.backgroundColor = '#fff6fa';
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
    
    // Открываем первый вопрос по умолчанию
    if (faqQuestions.length > 0) {
        faqQuestions[0].click();
    }
});