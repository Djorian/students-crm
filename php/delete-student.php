<?php 

if (isset($_POST['delete-student'])){

    function __autoload($class) {
        include "../Classes/$class.php";
    }

    $id = (int) trim(strip_tags(htmlspecialchars($_POST['delete-student'])));

    $mysql = new Database();

    $result = $mysql->delete('students', "id=$id");
    $result = $mysql->delete('subject_grades', "student_id=$id");

    echo $result;
}

?>