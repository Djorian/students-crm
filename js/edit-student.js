// Класс для проверки правильности заполнения форм
const validate = new Validate();

// Класс для вывода сообщений в информационном блоке
const message = new Message();

// Форма для редактирования данных о студентах
const studentEditForm = document.querySelector('#student-edit-form');

studentEditForm.addEventListener('keyup', () => {
    validate.verificationFirstNameLastNamePatronymicBirthday();
});

// Функция для редактирования фамилии, имени, отчества и даты рождения студента
studentEditForm.addEventListener('submit', (event) => {

    event.preventDefault();

    let editStudentMessageBlock = document.querySelector('.edit-student-message-block');

    if (!validate.verificationFirstNameLastNamePatronymicBirthday()) {
        message.message(editStudentMessageBlock, 'Заполните поля правильно!', 'failed-message-sending');
        return false;
    } else {

        const ajax = async () => {
            const response = await fetch('edit-student-info.php', {
                method: 'POST',
                body: new FormData(studentEditForm),
            });

            if (!response.ok) {
                throw new Error(response.status);
            } else {
                const data = await response.text();
                if (data == 0) {
                    message.message(editStudentMessageBlock, 'Извините, произошла ошибка. Пожалуйста, повторите отправку позже!', 'failed-message-sending');
                } else {
                    message.message(editStudentMessageBlock, 'Данные успешно отредактированы!', 'successful-message-sending');
                    setTimeout(() => {
                        document.location.href = "../index.html";
                    }, 2000);
                }
            }
        };
        ajax()
            .catch(error => message.message(editStudentMessageBlock, error, 'failed-message-sending'));
    }
});