<?php  

if (isset($_POST['subject-grades'])) {

    function __autoload($class) {
        include "../Classes/$class.php";
    }

    $id = (int) trim(strip_tags(htmlspecialchars($_POST['subject-grades'])));

    if (isset($_POST['sort-type'])) {
        $sortType = (string) trim(strip_tags(htmlspecialchars($_POST['sort-type'])));
    }
    else {
        $sortType = 'subject';
    }

    $mysql = new Database();

    $result = $mysql->select("*", "students LEFT", "subject_grades ON students.id = subject_grades.student_id", "students.id = $id AND subject_grades.student_id = $id", "$sortType ASC", '');

    echo json_encode($result, JSON_UNESCAPED_UNICODE);

}
?>
