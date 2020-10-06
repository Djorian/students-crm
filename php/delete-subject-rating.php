<?php 

if (isset($_POST['delete-subject-rating'])){

    function __autoload($class) {
        include "../Classes/$class.php";
    }

    $id = (int) trim(strip_tags(htmlspecialchars($_POST['delete-subject-rating'])));

    $mysql = new Database();

    $result = $mysql->delete('subject_grades', "id=$id");

    echo $result;
}

?>