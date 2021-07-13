<?php

$sum = $_POST['sum'];
$valute = $_POST['valute'];
$result = $_POST['result'];
$mail = $_POST['mail'];

$to = $mail;
$subject = "Заявка на обмен валюты";
$message = "Вы записаны на перевод $sum рублей в валюту $valute и получите $result едениц валюты";

$success = mail($to, $subject, $message);

if (!$success) {
    echo "error";
} else {
    echo "nice";
}
