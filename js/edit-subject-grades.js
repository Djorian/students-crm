// Класс для проверки правильности заполнения форм
const validate = new Validate();

// Класс для вывода сообщений в информационном блоке
const message = new Message();

// Форма для редактирования данных об предметах и оценках
const editSubjectGradesForm = document.querySelector('#edit-subject-grades-form');

editSubjectGradesForm.addEventListener('keyup', () => {
    validate.verificationSubjectTopicsAndGrades();
});

// Функция для редактирования темы предмета и оценки
editSubjectGradesForm.addEventListener('submit', (event) => {

    event.preventDefault();

    let editSubjectGradesMessageBlock = document.querySelector('.edit-subject-grades-message-block');

    if (!validate.verificationSubjectTopicsAndGrades()) {
        message.message(editSubjectGradesMessageBlock, 'Заполните поля правильно!', 'failed-message-sending');
        return false;
    } else {
        const ajax = async () => {
            const response = await fetch('edit-subject-grades-info.php', {
                method: 'POST',
                body: new FormData(editSubjectGradesForm),
            });

            if (!response.ok) {
                throw new Error(response.status);
            } else {
                const data = await response.text();
                if (data == 0) {
                    message.message(editSubjectGradesMessageBlock, 'Извините, произошла ошибка. Пожалуйста, повторите отправку позже!', 'failed-message-sending');
                } else {
                    message.message(editSubjectGradesMessageBlock, 'Данные успешно отредактированы!', 'successful-message-sending');
                    setTimeout(() => {
                        document.location.href = "../index.html";
                    }, 2000);
                }
            }
        };
        ajax()
            .catch(error => message.message(editSubjectGradesMessageBlock, error, 'failed-message-sending'));
    }
});