<?php


if (isset($_POST['search-by-value'])) {

    function __autoload($class) {
        include "../Classes/$class.php";
    }

    $search = (string) trim(strip_tags(htmlspecialchars($_POST['search-by-value'])));

    $mysql = new Database();

    $result = $mysql->select("*", 'students LEFT', "subject_grades ON students.id = subject_grades.student_id ", "firstname LIKE '%$search%' OR lastname LIKE '%$search%' OR patronymic LIKE '%$search%'", 'lastname ASC', '');

    echo json_encode($result, JSON_UNESCAPED_UNICODE);

}
?>