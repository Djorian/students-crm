<?php

if (isset($_POST['studentid']) && isset($_POST['firstname']) && isset($_POST['lastname']) && isset($_POST['patronymic']) && isset($_POST['birthday'])) {
    if(empty($_POST['studentid']) || empty($_POST['firstname']) || empty($_POST['lastname']) || empty($_POST['patronymic']) || empty($_POST['birthday']))
    {
        echo 0;
        exit(); 
    } else {

            function __autoload($class) {
                include "../Classes/$class.php";
            }

            $studentID = (int) trim(strip_tags(htmlspecialchars($_POST['studentid'])));
            $firstname = (string) trim(strip_tags(htmlspecialchars($_POST['firstname'])));
            $lastname = (string) trim(strip_tags(htmlspecialchars($_POST['lastname'])));
            $patronymic = (string) trim(strip_tags(htmlspecialchars($_POST['patronymic'])));
            $birthday = (string) trim(strip_tags(htmlspecialchars($_POST['birthday'])));

            $mysql = new Database();

            $result = $mysql->update('students', array('firstname'=>$firstname, 'lastname'=>$lastname, 'patronymic'=>$patronymic, 'birthday'=>$birthday), "id=$studentID");

            echo $result;
        }
}

?>