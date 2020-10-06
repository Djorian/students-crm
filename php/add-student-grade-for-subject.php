<?php 

if (isset($_POST['select-subject']) && isset($_POST['subject-matter']) && isset($_POST['assessment']) && isset($_POST['students-list'])) {
  if(empty($_POST['select-subject']) || empty($_POST['subject-matter']) || empty($_POST['assessment']) || empty($_POST['students-list']) ) {
      echo 0;
      exit; 
    } else {

      function __autoload($class) {
          include "../Classes/$class.php";
      }

      $selectSubject = (string) trim(strip_tags(htmlspecialchars($_POST['select-subject'])));
      $subjectMatter = (string) trim(strip_tags(htmlspecialchars($_POST['subject-matter'])));
      $assessment = (int) trim(strip_tags(htmlspecialchars($_POST['assessment'])));
      $studentsList = (string) trim(strip_tags(htmlspecialchars($_POST['students-list'])));

      $mysql = new Database();

      $result = $mysql->insert('subject_grades', array('subject'=>$selectSubject, 'subject_matter'=>$subjectMatter, 'assessment'=>$assessment, 'student_id'=>$studentsList));

      echo $result;
    }
} 

?>