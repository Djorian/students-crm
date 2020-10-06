CREATE DATABASE IF NOT EXISTS db_8 CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS db_8.students (
  id int(3) NOT NULL AUTO_INCREMENT,
  firstname varchar(50) NOT NULL,
  lastname varchar(50) NOT NULL,
  patronymic varchar(50) NOT NULL,
  birthday varchar(10) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=innoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS db_8.subject_grades (
  id int(3) NOT NULL AUTO_INCREMENT,
  subject varchar(255) NOT NULL,
  subject_matter varchar(255) NOT NULL,
  assessment int(1) NOT NULL,
  student_id int(3) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=innoDB DEFAULT CHARSET=utf8;


INSERT INTO db_8.students (id, firstname, lastname, patronymic, birthday) VALUES
(1, 'Александр', 'Александров', 'Александрович', '2020-03-02'),
(2, 'Кирилл', 'Кириллов', 'Кириллович', '2020-03-03'),
(3, 'Ольга', 'Степанова', 'Евгеньевна', '2020-03-20'),
(4, 'Оксана', 'Золотарева', 'Сергеевна', '2020-03-26'),
(5, 'Николай', 'Иванов', 'Николаевич', '2020-03-12');

INSERT INTO db_8.subject_grades (id, subject, subject_matter, assessment, student_id) VALUES
(1, 'История', 'История России', 4, 1),
(2, 'Экономика', 'Мировая экономика', 3, 1),
(3, 'Высшая математика', 'Интегрирование рациональных функций', 3, 1),
(4, 'Социология', 'Жизненные ценности молодежи', 5, 1),
(5, 'Экономика', 'Принципы политической экономии', 4, 1),
(6, 'Правоведение', 'Социальные нормы понятие и виды', 5, 2),
(7, 'Высшая математика', 'Случайные величины', 4, 2),
(8, 'Этика', 'Общение между студентами', 3, 2),
(9, 'Социология', 'Правовой статус личности', 3, 2),
(10, 'История', 'Политическая раздробленность на Руси', 5, 2),
(11, 'Английский язык', 'Рассказ о моей комнате', 4, 3),
(12, 'Высшая математика', 'Статистический ряд и его описание ', 3, 3),
(13, 'Экономика', 'История одной находки', 5, 3),
(14, 'Правоведение', 'Сущность договорного права', 4, 3),
(15, 'Физкультура', 'Виды массажа', 4, 3),
(16, 'Физкультура', 'Здоровый образ жизни', 5, 4),
(17, 'Этика', 'Сетевой этикет', 4, 4),
(18, 'Высшая математика', 'Первообразная и неопределенный интеграл', 3, 1),
(19, 'Социология', 'Отношение молодежи к СМИ', 4, 4),
(20, 'Высшая математика', 'Асимптоты графика функции', 3, 4),
(21, 'Этика', 'Этикет в одежде', 5, 4),
(22, 'Высшая математика', 'Логарифмическое дифференцирование', 5, 5),
(23, 'Социология', 'Характер распределения обязанностей', 4, 1),
(24, 'Социология', 'Классическая социология', 3, 5),
(25, 'История', 'Материальная ответственность работника', 4, 5),
(26, 'Этика', 'Национальный этикет ', 5, 5),
(27, 'Физкультура', 'Роль физической культуры', 5, 5);