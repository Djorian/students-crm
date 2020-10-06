// После события загрузки всего DOMa, выполнить функцию
document.addEventListener("DOMContentLoaded", () => {
    showStudents();
    studentsListOptions();
});

// Класс для проверки правильности заполнения форм
const validate = new Validate();

// Класс для вывода сообщений в информационном блоке
const message = new Message();

// Форма для добавления студента
const addStudenForm = document.querySelector('#add-student-form');
// Форма для поиска студентов
const searchByValue = document.querySelector('#search-by-value');
// Форма для добавления предмета и оценки
const addStudentGradeForSubjectForm = document.querySelector('#add-student-grade-for-subject-form');

addStudenForm.addEventListener('keyup', () => {
    validate.verificationFirstNameLastNamePatronymicBirthday();
});

addStudentGradeForSubjectForm.addEventListener('keyup', () => {
    validate.verificationSubjectTopicsAndGrades();
});

// Функция поиска студента по имени, фамилии, отчеству
searchByValue.addEventListener('keyup', () => {

    let searchByValue = document.querySelector('#search-by-value');
    let searchByValueMessageBlock = document.querySelector('.search-by-value-message-block');
    let searchByValueBlock = document.querySelector('#search-by-value-block');

    searchByValue.value = searchByValue.value.trim();

    if (searchByValue.value == '') {
        message.message(searchByValueMessageBlock, 'Данные должны быть от 2 до 40 символов!', 'failed-message-sending');
        searchByValueBlock.innerHTML = '';
        return false;
    } else {

        let out = ``;

        const ajax = async () => {
            const response = await fetch('php/search-by-value.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `search-by-value=${searchByValue.value}`,
            });

            if (!response.ok) {
                throw new Error(response.status);
            } else {
                const data = await response.json();
                if (data == 0) {
                    message.message(searchByValueMessageBlock, 'Извините, произошла ошибка. Пожалуйста, повторите отправку позже!', 'failed-message-sending');
                    searchByValueBlock.innerHTML = '';
                }
                if (data.length == 0) {
                    message.message(searchByValueMessageBlock, 'По вашему запросу ничего не найдено!', 'failed-message-sending');
                    searchByValueBlock.innerHTML = '';
                } else {
                    out = `<div class="list-group-item mt-2 card border border-dark p-3 mt-3" id="3"><div class="table-responsive"><table class="table table-bordered mt-3"><thead class="thead-light"><tr><th>Ф. И. О.</th><th scope="col">Предмет</th><th scope="col">Тема</th><th scope="col">Оценка</th><th class="text-right" scope="col">Редактировать оценку</th></tr></thead>`;

                    for (const value of data) {
                        if (value.firstname.toLowerCase() == searchByValue.value.toLowerCase()) {
                            value.firstname = `<mark>${value.firstname}</mark>`;
                        }

                        if (value.lastname.toLowerCase() == searchByValue.value.toLowerCase()) {
                            value.lastname = `<mark>${value.lastname}</mark>`;
                        }

                        if (value.patronymic.toLowerCase() == searchByValue.value.toLowerCase()) {
                            value.patronymic = `<mark>${value.patronymic}</mark>`;
                        }

                        if (value.subject == null && value.subject_matter == null && value.assessment == null) {
                            out += `<tbody id="${value.id}"><tr><th scope="row"><p>${value.lastname} ${value.firstname} ${value.patronymic}</p></th><th scope="row">Нет оценок</th><th scope="row">Нет оценок</th><td>Нет оценок</td><td class="text-right"><div class="text-center mt-3 delete-subject-rating-block-${value.id}"></div></td></tr></tbody>`;
                        } else {
                            out += `<tbody id="${value.id}"><tr><th scope="row"><p>${value.lastname} ${value.firstname} ${value.patronymic}</p></th><th scope="row">${value.subject}</th><th scope="row">${value.subject_matter}</th><td>${value.assessment}</td><td class="text-right"><a href="php/edit-subject-grades.php?id=${value.id}" class="btn btn-success mt-2">Исправить</a><button class="btn btn-danger mt-2 ml-2" onclick="deleteSubjectRating(${value.id})">Удалить</button><div class="text-center mt-3 delete-subject-rating-block-${value.id}"></div></td></tr></tbody>`;
                        }
                    }

                    out += `</table></div><div class="dropdown-divider" style="border-bottom: 2px dashed rgba(0,0,0,.5) !important;"></div></div></div>`;

                    setTimeout(() => {
                        searchByValueBlock.innerHTML = out;
                    }, 500);
                }
            }
        };
        ajax()
            .catch(error => message.message(searchByValueMessageBlock, error, 'failed-message-sending'));
    }
});

// Функция добавления студента
addStudenForm.addEventListener('submit', (event) => {

    event.preventDefault();

    let addStudentMessageBlock = document.querySelector('.add-student-message-block');

    let firstname = document.querySelector('#firstname');
    let lastname = document.querySelector('#lastname');
    let patronymic = document.querySelector('#patronymic');
    let birthday = document.querySelector('#birthday');

    if (!validate.verificationFirstNameLastNamePatronymicBirthday()) {
        message.message(addStudentMessageBlock, 'Заполните поля правильно!', 'failed-message-sending');
        return false;
    } else {
        const ajax = async () => {
            const response = await fetch('php/add-student.php', {
                method: 'POST',
                body: new FormData(addStudenForm),
            });

            if (!response.ok) {
                throw new Error(response.status);
            } else {
                const data = await response.text();
                if (data == 0) {
                    message.message(addStudentMessageBlock, 'Извините, произошла ошибка. Пожалуйста, повторите отправку позже!', 'failed-message-sending');
                } else {
                    message.message(addStudentMessageBlock, 'Данные успешно добавлены!', 'successful-message-sending');
                    showStudents();
                    studentsListOptions();
                }
            }
        };
        ajax()
            .catch(error => message.message(addStudentMessageBlock, error, 'failed-message-sending'));
        firstname.value = '';
        lastname.value = '';
        patronymic.value = '';
        birthday.value = '';
    }
});

// Функция добавления оценки по предмету
addStudentGradeForSubjectForm.addEventListener('submit', (event) => {

    event.preventDefault();

    let addStudentGradeForSubjectMessageBlock = document.querySelector('.add-student-grade-for-subject-message-block');

    let subjectMatter = document.querySelector('#subject-matter');
    let assessment = document.querySelector('#assessment');

    if (!validate.verificationSubjectTopicsAndGrades()) {
        message.message(addStudentGradeForSubjectMessageBlock, 'Заполните поля правильно!', 'failed-message-sending');
        return false;
    } else {
        const ajax = async () => {
            const response = await fetch('php/add-student-grade-for-subject.php', {
                method: 'POST',
                body: new FormData(addStudentGradeForSubjectForm),
            });

            if (!response.ok) {
                throw new Error(response.status);
            } else {
                const data = await response.text();
                if (data == 0) {
                    message.message(addStudentGradeForSubjectMessageBlock, 'Извините, произошла ошибка. Пожалуйста, повторите отправку позже!', 'failed-message-sending');
                } else {
                    message.message(addStudentGradeForSubjectMessageBlock, 'Данные успешно добавлены!', 'successful-message-sending');
                    showStudents();
                    studentsListOptions();
                }
            }
        };
        ajax()
            .catch(error => message.message(addStudentGradeForSubjectMessageBlock, error, 'failed-message-sending'));
        subjectMatter.value = '';
        assessment.value = '';
    }
});

// Функция получения студентов
const showStudents = () => {

    studetsContainer = document.querySelector('#studets-container');

    let out = ``;

    const ajax = async () => {
        const response = await fetch('php/show-students.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'show-students',
        });

        if (!response.ok) {
            throw new Error(response.status);
        } else {
            const data = await response.json();

            if (data.length == 0) {
                studetsContainer.innerHTML = '<h3 class="text-center mt-2 text-danger">Студентов пока нет.</h3>';
                return false;
            }
            if (data == 0) {
                studetsContainer.innerHTML = '<h3 class="text-center mt-2 text-danger">Извините, что-то пошло не так.</h3>';
                return false;
            } else {
                for (const value of data) {
                    out += `<li class="list-group-item mt-2 card border border-dark p-3 mt-3" id="${value.id}"><p class="card-title">Студент: ${value.lastname} ${value.firstname} ${value.patronymic} <span class="font-italic float-right">Дата рождения: ${value.birthday}</span></p><a href="php/edit-student.php?id=${value.id}" class="btn btn-outline-dark ml-2 mt-2">Редактировать ФИО</a><button class="btn btn-outline-dark ml-2 mt-2" onclick="subjectGrades(${value.id})">Посмотреть оценки</button><button class="btn btn-danger ml-2 mt-2" onclick="deleteStudent(${value.id})">Удалить Студента</button></div><div id="subject-grades-block-${value.id}"></div><div class="dropdown-divider" style="border-bottom: 2px dashed rgba(0,0,0,.5) !important;"></li>`;
                }
                studetsContainer.innerHTML = out;
            }
        }
    };
    ajax()
        .catch(error => studetsContainer.innerHTML = `<h3 class="text-center mt-2 text-danger">${error}</h3>`);
};

// Функция получения успеваимости студентов
const subjectGrades = (id, sort) => {

    let subjectGrades = document.querySelector('#subject-grades');
    subjectGrades.value = id;

    let subjectGradesBlocID = document.querySelector(`#subject-grades-block-${id}`);
    subjectGradesBlocID.innerHTML = '';

    let out = ``;

    // Тип сортировки по умолчанию
    let sortType = 'subject';

    // Если в sort попало одно из значений, то присвоить sortType попавшее в sort значение
    if (sort == 'subject_matter' || sort == 'assessment') {
        sortType = sort;
    }

    const ajax = async () => {
        const response = await fetch('php/subject-grades.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `subject-grades=${subjectGrades.value}&sort-type=${sortType}`,
        });

        if (!response.ok) {
            throw new Error(response.status);
        } else {
            const data = await response.json();

            if (data.length == 0) {
                subjectGradesBlocID.innerHTML = '<h3 class="text-center mt-2 text-danger">Оценок пока нет.</h3>';
                return false;
            }
            if (data == 0) {
                subjectGradesBlocID.innerHTML = '<h3 class="text-center mt-2 text-danger">Извините, что-то пошло не так.</h3>';
                return false;
            } else {
                out = `<div class="table-responsive"><table class="table table-bordered mt-3"><thead class="thead-light"><tr><th scope="col">Предмет<img class="pt-2 float-right" onclick="subjectGrades(${id}, 'subject')" src="images/arrow.png" alt="arrow"></th><th scope="col">Тема<img class="pt-2 float-right" onclick="subjectGrades(${id}, 'subject_matter')" src="images/arrow.png" alt="arrow"></th><th scope="col">Оценка<img class="pt-2 float-right" onclick="subjectGrades(${id}, 'assessment')" src="images/arrow.png" alt="arrow"></th><th class="text-right" scope="col">Редактировать оценку</th></tr></thead>`;
                for (const value of data) {
                    out += `<tbody id="${value.id}"><tr><th scope="row">${value.subject}</th><th scope="row">${value.subject_matter}</th><td>${value.assessment}</td><td class="text-right"><a href="php/edit-subject-grades.php?id=${value.id}" class="btn btn-success mt-2">Исправить</a><button class="btn btn-danger mt-2 ml-2" onclick="deleteSubjectRating(${value.id})">Удалить</button><div class="text-center mt-3 delete-subject-rating-block-${value.id}"></div></td></tr></tbody>`;
                }
                out += `</table></div></div>`;
                subjectGradesBlocID.innerHTML = out;
            }
        }
    };
    ajax()
        .catch(error => subjectGradesBlocID.innerHTML = `<h3 class="text-center mt-2 text-danger">${error}</h3>`);
};

// Функция получения списка студентов
const studentsListOptions = () => {

    let studentsList = document.querySelector('#students-list');

    let out = ``;

    const ajax = async () => {
        const response = await fetch('php/add-students-list.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'students-list',
        });

        if (!response.ok) {
            throw new Error(response.status);
        } else {
            const data = await response.json();

            for (const value of data) {
                out += `<option value="${value.id}">${value.lastname} ${value.firstname} ${value.patronymic}</option>`;
            }
            studentsList.innerHTML = out;

        }
    };
    ajax()
        .catch(error => studentsList.innerHTML = `<h3 class="text-center mt-2 text-danger">${error}</h3>`);
};

// Функция удаление записи о предмете по id
const deleteSubjectRating = (id) => {

    let deleteSubjecRating = document.querySelector('#delete-subject-rating');
    deleteSubjecRating.value = id;

    let deleteSubjectRatingBlockID = document.querySelector(`.delete-subject-rating-block-${id}`);

    const ajax = async () => {
        const response = await fetch('php/delete-subject-rating.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `delete-subject-rating=${deleteSubjecRating.value}`,
        });

        if (!response.ok) {
            throw new Error(response.status);
        } else {
            message.message(deleteSubjectRatingBlockID, `Запись под номером ${id} успешно удалена!`, 'successful-message-sending');
            setTimeout(() => {
                let array = document.querySelectorAll('tbody');
                for (let index = 0; index < array.length; index++) {
                    if (array[index].attributes[0].value == id) {
                        array[index].remove();
                    }
                }
            }, 1000);
        }
    };
    ajax()
        .catch(error => deleteSubjectRatingBlockID.innerHTML = `<h3 class= "text-center mt-2 text-danger">${error}</h3>`);
};

// Функция удаление студента по id
const deleteStudent = (id) => {

    let deleteStudentMessageBlock = document.querySelector('.delete-student-message-block');

    let deleteStudent = document.querySelector('#delete-student');
    deleteStudent.value = id;

    const ajax = async () => {
        const response = await fetch('php/delete-student.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `delete-student=${deleteStudent.value}`,
        });

        if (!response.ok) {
            throw new Error(response.status);
        } else {
            message.message(deleteStudentMessageBlock, `Студент c id ${id} успешно удален!`, 'successful-message-sending');
            setTimeout(() => {
                let li = document.querySelectorAll('li');
                for (let index = 0; index < li.length; index++) {
                    if (li[index].id == id) {
                        li[index].remove();
                    }
                }
                studentsListOptions();
            }, 1000);
        }
    };
    ajax()
        .catch(error => deleteStudentMessageBlock.innerHTML = `<h3 class= "text-center mt-2 text-danger">${error}</h3>`);
};