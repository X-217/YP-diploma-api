# YP-diploma-api

Разработка backend для дипломного проекта Яндекс.Практикума

**API для аутентификации пользователей и сохранения статей**

Приложение развернуто на [http://api.x-217.ru](http://api.x-217.ru/) ( [https://api.x-217.ru](https://api.x-217.ru/), [http://84.201.132.115](http://84.201.132.115/))

------

### Основные используемые технологии:

- node.js
- express
- mongoDB

------

### Описание проекта

В проекте реализованы две сущности: пользователя и статьи (**user** и **article**).

**Поля схемы `user`:**

- **email** — почта пользователя, по которой он регистрируется
- **password** — хеш пароля
- **name** — имя пользователя

**Поля схемы `article`:**

- **keyword —** ключевое слово
- **title —** заголовок статьи
- **text —** текст статьи
- **date —** дата статьи
- **source —** источник статьи
- **link —** ссылка на статью (URL-адрес)
- **image —** ссылка на иллюстрацию к статье (URL-адрес)
- **owner —** _id пользователя, сохранившего статью



#### Обрабатываемые запросы

**Доступные без авторизации:**

```
# создаёт пользователя с переданными в теле
# email, password и name
POST /signup

# проверяет переданные в теле почту и пароль
# и возвращает JWT
POST /signin
```

**Доступные после авторизации:**

```
# возвращает информацию о пользователе (email и имя)
GET /users/me

# возвращает все сохранённые пользователем статьи
GET /articles

# создаёт статью с переданными в теле
# keyword, title, text, date, source, link и image
POST /articles

# удаляет сохранённую статью  по _id
DELETE /articles/articleId
```



--------------------

### Запуск проекта

Клонируйте репозиторий

https://github.com/X-217/YP-diploma-api.git

Установите зависимости

```
npm install
```

Запустите сервер

```
npm run start
```

Для запуска с **hot reload**

```
npm run dev
```

------

Для тестирования работы приложения используйте Postman: https://www.postman.com/downloads/

Список выполненных при разработке тестов, необходимые наборы данных и полученные при тестировании результаты находятся в папке **tests**

--------------

