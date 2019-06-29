<?php

header('Content-Type: application/json');

// Check for empty fields
if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   empty($_POST['phone']) 		||
   empty($_POST['message']) 	||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL)) {
	    echo json_encode(array(
      	'errors' => true,
      	'message' => 'All fields are required'
      	));
      return false;
   }
	
$name = $_POST['name'];
$email_address = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];
	
require_once "../libs/Mail.php";

$from = 'dejan.dinulovic@dd-webdesign.com'; //Njegov host web mail
$to = 'deki@milic.in'; //Njegov licni mejl na koji zeli da mu stigne email
$subject = "Contact Form: $name";
$body = "Hello, \n\n$name wants to get in touch.\n\nHere is the details:\n\nE-mail Address: $email_address\nPhone Number: $phone\nMessage: \n$message";

$headers = array(
    'From' => $from,
    'To' => $to,
    'Subject' => $subject
);

$smtp = Mail::factory('smtp', array(
        'host' => 'ssl://smtp.strato.de', //smpt sa hosta
        'port' => '465', // port koji koristi mail sa hosta
        'auth' => true,
        'username' => 'dejan.dinulovic@dd-webdesign.com', //Njegov host web mail
        'password' => 'MnogoDobraSifra!1312' // sifra za taj mejl
    ));

$res = $smtp->send($to, $headers, $body);

echo json_encode(array(
      	'errors' => false,
      	'message' => 'Success',
      	'mail_status' => $res
      	));

return true;   		
?>