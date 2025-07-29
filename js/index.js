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



    function openModal() {
        modal.classList.add('active');
        document.body.classList.add('no-scroll');
        if (sessionStorage.getItem('formSubmitted') === 'true') {
            form.style.display = 'none';
            police.style.display = 'none';
            formhead.style.display = 'none';// Скрываем форму
            thankYouMessage.style.display = 'block'; // Показываем сообщение "Спасибо!"
        } else {
            form.style.display = 'flex'; // Показываем форму при открытии модального окна
            thankYouMessage.style.display = 'none'; // Скрываем сообщение "Спасибо!" при открытии модального окна
            error.style.display = 'none'; // Скрываем сообщение об ошибке при открытии модального окна
        }
    };


    const modalTimer = setInterval(openModal, 30000);





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

    function validatePhone(phone) {

        const phonePattern = /^(\+7|8)\s?\(?\d{3}\)?\s?\d{3}[- ]?\d{2}[- ]?\d{2}$/;
        return phonePattern.test(phone);
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





