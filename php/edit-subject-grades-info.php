<?php

if (isset($_POST['subject-grades-id']) && isset($_POST['subject']) && isset($_POST['subject-matter']) && isset($_POST['assessment'])) {
    if(empty($_POST['subject-grades-id']) || empty($_POST['subject']) || empty($_POST['subject-matter']) || empty($_POST['assessment']))
    {
        echo 0;
        exit(); 
    } else {
            function __autoload($class) {
                include "../Classes/$class.php";
            }

            $id = (int) trim(strip_tags(htmlspecialchars($_POST['subject-grades-id'])));
            $subject = (string) trim(strip_tags(htmlspecialchars($_POST['subject'])));
            $subjectMatter = (string) trim(strip_tags(htmlspecialchars($_POST['subject-matter'])));
            $assessment = (int) trim(strip_tags(htmlspecialchars($_POST['assessment'])));

            $mysql = new Database();

            $result = $mysql->update('subject_grades', array('subject'=>$subject, 'subject_matter'=>$subjectMatter, 'assessment'=>$assessment), "id=$id");

            echo $result;
        }
}
?>