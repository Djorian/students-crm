<?php  

if (isset($_POST['students-list'])) {

    function __autoload($class) {
        include "../Classes/$class.php";
    }

    $mysql = new Database();

    $result = $mysql->select("id, firstname, lastname, patronymic", 'students', '', '', 'lastname ASC', '');

    echo json_encode($result, JSON_UNESCAPED_UNICODE);
}

?>
