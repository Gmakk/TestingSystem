# Система управления тестированием
Учебный проект, созданный для ознакомления с различными аспектами работы со spring и смежными технологиями. Реализует механизм автоматизации ручного тестирования. Создавался на основе информации из книги [Spring in Action](https://www.manning.com/books/spring-in-action-sixth-edition)
## Пользователи системы
### Аналитик
Извне в систему поступают проекты, которые необходимо протестировать. Аналитик создает тест-планы, сценарии тестирования и отдельные тест-кейсы. Связывает эти сущности (в некоторых случаях многие ко многим). В случае необходимости изменяет или удаляет их.

/analyst
### Руководитель тестирования
Утверждает созданные аналитиком тест-планы и назначает конкретному тестировщику сценарии тестирования, которые он должен выполнить. 

/director
### Тестировщик
Выбирает, с каким проектом он сейчас будет работать. Далее ему показываются назначенные ему сценарии тестирования из этого проекта, если таковые имеются. Далее ему последовательно показываются ранее не выполненные тест-кейсы из выбранного сценария. 
Пользователь видит входные данные и выходные данные при положительном исходе. Он выполняет ручное тестирование, а затем вносит, прошел/не прошел тест и что произошло, если нет.

/tester
### Администратор
Так как при регистрации пользователю автоматически не выдается роль, то это должен сделать администратор. Также он может сделать аккаунт пользователя неактивным/активным, удалить неактивных пользователей или тех, у кого нет роли.

/admin

Для просмотра статистики по тестирвоанию пользователи могут перейти по ссылке /statistics или просто нажать кнопку в своей рабочей среде.

Указанные ранее конечные точки, кроме статистики,  доступны только пользователям с соответствующими ролями. Статистику могут просматривать все, кто авторизовался.

Когда пользователь переходит на любую из конечных точек и успешно авторизуется, его перенаправляет на его рабочую страницу.

Создать аккаунт - /register, авторизоваться - /login

## Перед началом работы
Первый администратор (admin-admin) создается при старте приложения, а так же ряд других пользователей для тестов. Так же для разных проверок на старте в бд записывается несколько пробных тест-планов, тест-кейсов и тд.
Из-за этого первые несколько попыток создать что-либо будут неудачными, тк id элементов задается автоматически и несколько первых уже заняты. При "развертывании" естественно нужно убрать все тестовые записи, кроме единственного админа, доступных ролей, прав для этих ролей и связей между ними

По умолчанию все ранее описанные конечные точки доступны через http://localhost:9091/*
## Было реализовано
В процессе работы над проектом были реализованы: 

1. Небольшая настройка actuator для работы со spring boot admin в отдельном [приложении](https://github.com/Gmakk/TestingAdmin)
2. Пользовательский интерфейс с использованием шаблонов Thymeleaf
3. API для работы с тест кейсами, а также возможность пользоваться сгенерированными Spring Data REST конечными точками
4. Настроена защита конечных точек на основании ролей пользователей
5. Занесение статистики за определенное чисто в отдельный файл, реализованное через Spring Integration. Запись/презапись происходит при запросе конечной точки /statistics
6. Работа с несколькими брокерами сообщений(Artemis, RabbitMQ, Kafka) на примере передачи инфомации о тест-кейсах. Принимало информацию отдельное [приложение-клиент](https://github.com/Gmakk/TestingClient)
7. Реализована Oauth2 авторизация через отдельный [сервер авторизации](https://github.com/Gmakk/TestingAuthorization). В качестве клиента, котрый авторизовывался и затем подставлял токен в запросы выступало все то же [приложение-клиент](https://github.com/Gmakk/TestingClient).
8. Работа с БД через JPA
## БД
Использовалась бд PostgreSQL со следующей физической схемой:
![TestingSystemDbScheme](https://github.com/user-attachments/assets/fc852b87-728c-423c-adf0-9b6476290ad4)
Так как один тест кейс может находиться в разных сценариях, причем в одном пройти, а в другом — нет, то информация о том, был ли он выполнен, успешно ли, и комментарий тестировщика находятся в таблице, реализующей связь «многие ко многим». Один сценарий так же может находитсья в разных тест планах
## Сборка и запуск
```
.\mvnw package
docker build -t testingsystem:0.0.1-SNAPSHOT .
docker-compose up
```

