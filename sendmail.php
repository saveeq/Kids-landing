<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $phone = $_POST['phone'];

    // Проверка времени последней отправки
    if (isset($_SESSION['last_sent']) && (time() - $_SESSION['last_sent']) < 1800) { 
        echo 'Вы можете отправлять сообщения только раз в полчаса.';
        exit;
    }
    
    $to = 'Dent-service@yandex.ru'; 
    $subject = 'ЗАЯВКИ С ЛЕНДИНГА ПО ИМПЛАНТАЦИИ';
    $message = "Имя: $name\nНомер телефона: $phone";
    $headers = "From: smtp.beget.com";

    if (mail($to, $subject, $message, $headers)) {
        // Обновление времени последней отправки
        $_SESSION['last_sent'] = time();
        echo 'Сообщение отправлено успешно.';
    } else {
        echo 'Ошибка при отправке сообщения.';
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo 'Метод не разрешен.';
}
?>