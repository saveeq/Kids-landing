var swiper = new Swiper(".reviews__swiper", {
    slidesPerView: 1,
    spaceBetween: 30,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('feedbackModal');
    const modalContent = modal.querySelector('.modal-content');
    const buttons = document.querySelectorAll('.feedbackButton');
    const span = document.getElementsByClassName('close')[0];
    const form = document.getElementById('feedbackForm');
    const error = document.getElementById('wrongnumber');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const police = document.getElementById('formPolice');
    const formhead = document.getElementById('formHead');
    const formText = document.querySelector('.form-text');



    function openModal() {
        modal.classList.add('active');
        document.body.classList.add('no-scroll');
        if (sessionStorage.getItem('formSubmitted') === 'true') {
            form.style.display = 'none';
            police.style.display = 'none';
            formhead.style.display = 'none';
            formText.style.display = 'none';// Скрываем форму
            thankYouMessage.style.display = 'block'; // Показываем сообщение "Спасибо!"
        } else {
            form.style.display = 'flex'; // Показываем форму при открытии модального окна
            thankYouMessage.style.display = 'none'; // Скрываем сообщение "Спасибо!" при открытии модального окна
            error.style.display = 'none'; // Скрываем сообщение об ошибке при открытии модального окна
        }
    };


    const modalTimer = setTimeout(openModal, 60000);





    buttons.forEach(button => {
        button.onclick = function () {
            openModal();
            clearInterval(modalTimer);
        }
    });

    modal.onclick = function (event) {
        if (!modalContent.contains(event.target)) { // Проверяем, что клик не по содержимому
            form.reset();
            modal.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    };

    span.onclick = function () {
        form.reset();
        modal.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    form.onsubmit = function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;

        if (validatePhone(phone)) {
            error.style.display = 'none';
            sendData(name, phone);
            window.location.href = 'thankyou.html';
            clearInterval(modalTimer);
        } else {
            error.style.display = 'block';
        }

    }

    // Модернизированная функция валидации для РФ-номера
    function validatePhone(phone) {
        // Принимает +7 (999) 999-99-99, +7 999 999-99-99, 8 (999) 999-99-99, 8 999 999-99-99
        const phonePattern = /^(\+7|8)\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
        return phonePattern.test(phone);
    }

    // Маска для инпута телефона (модальное окно)
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('focus', function () {
            if (!this.value) {
                this.value = '+7 (';
            }
        });
        phoneInput.addEventListener('input', function (e) {
            const input = this;
            const value = input.value.replace(/\D/g, '').substring(0, 11);
            let formatted = '';
            if (e.inputType && e.inputType.startsWith('delete')) {
                // Не форматируем при удалении, просто оставляем value
                input.value = input.value;
                return;
            }
            if (value.length > 0) {
                formatted = '+7 (' + value.substring(1, 4);
                if (value.length >= 4) formatted += ') ' + value.substring(4, 7);
                if (value.length >= 7) formatted += '-' + value.substring(7, 9);
                if (value.length >= 9) formatted += '-' + value.substring(9, 11);
            }
            input.value = formatted;
        });
    }

    // === ФИНАЛЬНАЯ ФОРМА ===
    const finalForm = document.querySelector('.final-form__form');
    if (finalForm) {
        const finalPhoneInput = finalForm.querySelector('input[name="finalPhone"]');
        const finalNameInput = finalForm.querySelector('input[type="text"]');
        const finalPhoneError = document.getElementById('finalPhoneError');

        // Маска для финального инпута телефона
        finalPhoneInput.addEventListener('focus', function () {
            if (!this.value) {
                this.value = '+7 (';
            }
        });
        finalPhoneInput.addEventListener('input', function (e) {
            const input = this;
            const value = input.value.replace(/\D/g, '').substring(0, 11);
            let formatted = '';
            if (e.inputType && e.inputType.startsWith('delete')) {
                input.value = input.value;
                return;
            }
            if (value.length > 0) {
                formatted = '+7 (' + value.substring(1, 4);
                if (value.length >= 4) formatted += ') ' + value.substring(4, 7);
                if (value.length >= 7) formatted += '-' + value.substring(7, 9);
                if (value.length >= 9) formatted += '-' + value.substring(9, 11);
            }
            input.value = formatted;
        });

        finalForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = finalNameInput.value.trim();
            const phone = finalPhoneInput.value.trim();
            if (!validatePhone(phone)) {
                finalPhoneError.style.display = 'block';
                return;
            } else {
                finalPhoneError.style.display = 'none';
            }
            // Отправка данных через sendmail.php
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'sendmail.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    finalForm.reset();
                    finalPhoneError.style.display = 'none';
                    alert('Спасибо! Ваша заявка отправлена.');
                } else if (xhr.readyState == 4) {
                    alert('Ошибка при отправке сообщения.');
                }
            }
            xhr.send(`name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}`);
        });
    }

    function sendData(name, phone) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'sendmail.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log('Data sent successfully');
                form.style.display = 'none';
                police.style.display = 'none';
                formhead.style.display = 'none';// Скрываем форму
                thankYouMessage.style.display = 'block'; // Показываем сообщение "Спасибо!"
                sessionStorage.setItem('formSubmitted', 'true'); // Устанавливаем флаг успешной отправки
            } else if (xhr.readyState == 4) {
                console.log('Error sending data');
                alert('Ошибка при отправке сообщения.');
            }
        }
        xhr.send(`name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}`);
    }
});

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});





