# Funny Race 🚀

Бесконечный раннер-залипалка. Концептуально — гоночки на тетрисе с жизнями и стрельбой.

**Ссылка**: https://funny-race.xyz

**Презентация**: https://gitpitch.com/iminchenko/defence/master

**Репо с бекендом**: https://github.com/java-park-mail-ru/shark_team-02-2018

## Команда
* Колотовкин Максим
* Минченко Илья
* Алёхин Влад
* Морозенков Олег — ментор

## API
| Действие | Тип запроса, URL | Тело запроса | Тело ответа | Пояснения |
| --- | --- | ------ | --- | --- |
| Регистрация | POST,<br> `/signup` | {loginField: «Alex»,<br> passwordField: «qq22p»} | {message: «YES»} | YES — регистрация прошла успешно,<br> NO — пользователь с таким логином есть в БД |
| Авторизация | POST,<br> `/login` | {loginField: «Maxim»,<br> passwordField: «mm123»} | {message: «YES»} | YES — успешная авторизация,<br> NO — неверный логин или пароль |
| Авторизация cookies | POST,<br> `/loginbycookies` | { } | {message: «YES»} | YES — успешная авторизация,<br> NO — печеньки отсутствуют, или в них некорректные логин или пароль |
| Сохранить аватарку | POST,<br> `/saveavatar` | {login: «Piter»,<br> image: image-data} | {message: «SAVE_AVATAR_OK»}  | SAVE_AVATAR_OK — успешное обновление аватарки,<br> SAVE_AVATAR_ERROR — некорректные печеньки, нет прав на обновление |
| Запросить аватарку | POST,<br> `/getavatar` | {login: «George»} | Возвращается строка  |  IMAGE_NOT_SET — пользователь не загружал свой аватар,<br> image-data — содержимое аватарки |
| Получить лидеров | POST,<br> `/getliders` | { startPos: 6,<br> numberElements: 3 } | [ { login: «Maxim», score: 45 } ] | Возвращается массив объектов с полями:<br> логин и максимальный балл |
| Разлогиниться | POST,<br> `/logout` | { } | DELETE_COOKIES_OK | Удаление всех печенек пользователя |

## JSDoc
http://frontend.tech-mail.ru/2018_1_shark_team/
