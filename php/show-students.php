<?php  

if (isset($_POST['show-students'])) {

    function __autoload($class) {
        include "../Classes/$class.php";
    }

    $mysql = new Database();

    $result = $mysql->select("id, firstname, lastname, patronymic, DATE_FORMAT(birthday, '%d/%m/%Y') AS birthday", 'students', '', '', 'id DESC', '');

    echo json_encode($result, JSON_UNESCAPED_UNICODE);

}
?>
