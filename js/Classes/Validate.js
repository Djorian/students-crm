class Validate {
    verificationFirstNameLastNamePatronymicBirthday() {
        // Регулярные выражения
        const regexInputTypeText = /^[A-zА-я1-9 .,:-_?!]{2,40}$/i;
        const regexBirthday = /^\d{4}[./-]\d{2}[./-]\d{2}$/i;

        const firstname = document.querySelector('#firstname').value.trim();
        const lastname = document.querySelector('#lastname').value.trim();
        const patronymic = document.querySelector('#patronymic').value.trim();
        const birthday = document.querySelector('#birthday').value.trim();

        // Получить блоки для вывода ошибок
        let errorFirstname = document.querySelector('#error-firstname');
        let errorLastname = document.querySelector('#error-lastname');
        let errorPatronymic = document.querySelector('#error-patronymic');
        let errorBirthday = document.querySelector('#error-birthday');

        // Проверка имени
        if (regexInputTypeText.test(firstname)) {
            errorFirstname.textContent = '';
        } else {
            errorFirstname.textContent = 'Имя должно быть от 2 до 40 символов';
        }
        // Проверка фамилии
        if (regexInputTypeText.test(lastname)) {
            errorLastname.textContent = '';
        } else {
            errorLastname.textContent = 'Фамилия должна быть от 2 до 40 символов';
        }
        // Проверка отчества
        if (regexInputTypeText.test(patronymic)) {
            errorPatronymic.textContent = '';
        } else {
            errorPatronymic.textContent = 'Отчество должно быть от 2 до 40 символов';
        }
        // Проверка даты рождения
        if (regexBirthday.test(birthday)) {
            errorBirthday.textContent = '';
        } else {
            errorBirthday.textContent = 'Заполните дату рождения';
        }
        if (regexInputTypeText.test(firstname) && regexInputTypeText.test(lastname) && regexInputTypeText.test(patronymic) && regexBirthday.test(birthday)) {
            return true;
        } else {
            return false;
        }
    }

    verificationSubjectTopicsAndGrades() {
        // Регулярные выражения
        const regexInputTypeText = /^[A-zА-я1-9 .,:-_?!]{2,40}$/i;
        const regexInputTypeNumber = /^[1-5]{1}$/i;

        const subjectMatter = document.querySelector('#subject-matter').value.trim();
        const assessment = document.querySelector('#assessment').value.trim();

        // Получить блоки для вывода ошибок
        let errorSubjectMatter = document.querySelector('#error-subject-matter');
        let errorAssessment = document.querySelector('#error-assessment');

        // Проверка темы
        if (regexInputTypeText.test(subjectMatter)) {
            errorSubjectMatter.textContent = '';
        } else {
            errorSubjectMatter.textContent = 'Название темы должно быть от 2 до 40 символов';
        }
        // Проверка оценки
        if (regexInputTypeNumber.test(assessment)) {
            errorAssessment.textContent = '';
        } else {
            errorAssessment.textContent = 'Оценка должна быть от 1 до 5';
        }
        if (regexInputTypeText.test(subjectMatter) && regexInputTypeNumber.test(assessment)) {
            return true;
        } else {
            return false;
        }
    }
}