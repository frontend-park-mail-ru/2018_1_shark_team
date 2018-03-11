# 2018_1_shark_team

http://funny-race-client.herokuapp.com/

Backend API: https://github.com/3kybika/shark_team-02-2018/blob/master/README.md#api
 
## Команда
* Колотовкин Максим
* Минченко Илья
* Алёхин Влад

### API
| Действие | Тип запроса, URL | Тело запроса | Тело ответа | Пояснения |
| --- | --- | ------ | --- | --- |
| Регистрация | POST,<br> `/api/users/signup` | {loginField: «Alex»,<br> passwordField: «qq22p»} | {message: «YES»} | YES — регистрация прошла успешно,<br> NO — пользователь с таким логином есть в БД |
| Авторизация | POST,<br> `/api/users/login` | {loginField: «Maxim»,<br> passwordField: «mm123»} | {message: «YES»} | YES — успешная авторизация,<br> NO — неверный логин или пароль |
| Авторизация cookies | POST,<br> `/api/users/loginbycookies` | { } | {message: «YES»} | YES — успешная авторизация,<br> NO — печеньки отсутствуют, или в них некорректные логин или пароль |
| Сохранить аватарку | POST,<br> `/api/users/saveavatar` | {login: «Piter»,<br> image: image-data} | {message: «SAVE_AVATAR_OK»}  | SAVE_AVATAR_OK — успешное обновление аватарки,<br> SAVE_AVATAR_ERROR — некорректные печеньки, нет прав на обновление |
| Запросить аватарку | POST,<br> `/api/users/getavatar` | {login: «George»} | Возвращается строка  |  IMAGE_NOT_SET — пользователь не загружал свой аватар,<br> image-data — содержимое аватарки |
| Получить лидеров | POST,<br> `/api/users/getliders` | { startPos: 6,<br> numberElements: 3 } | [ { login: «Maxim», score: 45 } ] | Возвращается массив объектов с полями:<br> логин и максимальный балл |
| Разлогиниться | POST,<br> `/api/users/logout` | { } | DELETE_COOKIES_OK | Удаление всех печенек пользователя |
