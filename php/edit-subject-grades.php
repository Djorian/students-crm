<!doctype html>
<html lang="ru">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="HTML5 CSS3 Bootstrap4 JavaScript PHP MySQL" />
    <meta name="author" content="Егоров Дмитрий" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="shortcut icon" href="../favicon.png" type="image/png">
    <title>HTML5 CSS3 Bootstrap4 JavaScript PHP MySQL</title>
</head>

<body>
    <header id="header">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="text-center mt-5 mb-5">
                        <h2>HTML5 CSS3 Bootstrap4 JavaScript PHP MySQL</h2>
                        <p>Пример реализации программы для обеспечения обработки, хранения, редактирования данных о
                            студентах и их успеваемости.</p>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <main id="main">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <h2 class="mt-3 text-center">Редактировать информацию о предмете:</h2>
                    <?php 
                        if (isset($_GET['id'])) {

                            function __autoload($class) {
                                include "../Classes/$class.php";
                            }

                            $id = (int) trim(strip_tags(htmlspecialchars($_GET['id'])));

                            $mysql = new Database();

                            $result = $mysql->select('id, subject, subject_matter, assessment', 'subject_grades', '', "id=$id", '', '');

                            foreach($result as $item) {
                                    echo    "<form id='edit-subject-grades-form'>
                                                <div class='card border border-dark p-3 mt-3'>
                                                    <div class='form-group'>
                                                        <input type='text' id='subject-grades-id' class='form-group' value='".$item['id']."' name='subject-grades-id'>
                                                    </div>
                                                    <div class='form-group'>
                                                        <label for='subject'>Предмет:</label>
                                                        <select class='custom-select' name='subject'>
                                                            <option value='".$item['subject']."' selected>".$item['subject']."</option>
                                                        </select>
                                                    </div>
                                                    <div class='form-group'>
                                                        <label for='subject-matter'>Тема:</label>
                                                        <input type='text' class='form-control' placeholder='Тема' id='subject-matter' value='".$item['subject_matter']."' name='subject-matter'>
                                                        <p class='text-danger' id='error-subject-matter'></p>
                                                    </div>
                                                    <div class='form-group'>
                                                        <label for='assessment'>Оценка:</label>
                                                        <input type='number' class='form-control' placeholder='Оценка' id='assessment' value='".$item['assessment']."' name='assessment'>
                                                        <p class='text-danger' id='error-assessment'></p>
                                                    </div>
                                                        <button id='edit-subject-grades-button' class='btn btn-outline-dark mt-3 mb-3' type='submit'>Сохранить</button><div class='dropdown-divider' style='border-bottom: 2px dashed rgba(0,0,0,.5) !important;'>
                                                </div>
                                            </form>";   
                            }
                        }
                    ?>
                    <h6 class="text-center mt-3 edit-subject-grades-message-block"></h6>
                </div>
                <div class="text-left">
                        <a href="../index.html" class="btn btn-outline-dark my-4 ml-2">Назад</a>
                </div>
            </div>
        </div>
    </main>
    <footer id="footer">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="footer-copyright text-center mt-4 pb-3">&copy; 2020 Автор проекта: Егоров Дмитрий
                        <a href="https://www.djorian.com" target="_blank">djorian.com</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <script src="../js/jquery/jquery-3.4.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
        crossorigin="anonymous"></script>
    <script src="../js/Classes/Validate.js"></script>
    <script src="../js/Classes/Message.js"></script>
    <script src="../js/edit-subject-grades.js"></script>
</body>

</html>