<?php 

if (isset($_POST['firstname']) && isset($_POST['lastname']) && isset($_POST['patronymic']) && isset($_POST['birthday'])) {
  if(empty($_POST['firstname']) || empty($_POST['lastname']) || empty($_POST['patronymic']) || empty($_POST['birthday'])) {
      echo 0;
      exit; 
    } else {

      function __autoload($class) {
          include "../Classes/$class.php";
      }

      $firstname = (string) trim(strip_tags(htmlspecialchars($_POST['firstname'])));
      $lastname = (string) trim(strip_tags(htmlspecialchars($_POST['lastname'])));
      $patronymic = (string) trim(strip_tags(htmlspecialchars($_POST['patronymic'])));
      $birthday = (string) trim(strip_tags(htmlspecialchars($_POST['birthday'])));

      $mysql = new Database();

      $result = $mysql->insert('students', array('firstname'=>$firstname, 'lastname'=>$lastname, 'patronymic'=>$patronymic, 'birthday'=>$birthday));

      echo $result;
    }
} 

?>