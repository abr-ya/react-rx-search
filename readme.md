# О проекте
Это место для описания проекта.)

## О сборке
"Чистая" и "минимальная" сборка Webpack + TypeScript + React, основные инструменты:
- Webpack,
- TypeScript,
- React,
- Axios,
- Jest,
- React Testing Library.

Для соблюдения чистоты кода используются ESLint и Prettier.

Переменные окружения берутся из файла .ENV (использован dotenv-webpack).

## Основные скрипты (yarn или npm ...)
- build - production сборка в dist
- build-n - production сборка с предварительным созданием файла .env на Netlify
- lint - eslint, только ошибки
- fix - eslint, исправление ошибок
- start - запуск дев-сервера, порт 3000
- test - запуск тестов (Jest + RTL)
- test-c - запуск тестов + coverage + summary

## Деплой
### Netlify
Для деплоя на сервисе создан файл редиректов (для роутера, если он будет) и скрипт, собирающий переменные окружения в файл.

### gh-pages
Для деплоя на gh-pages удобно использовать одноименный npm-пакет. Можно создать скрипт деплоя, примерно следующего вида:
```
    "predeploy": "yarn run clean-dist && webpack --config=configs/webpack/prod.js",
    "deploy": "gh-pages -d dist"
```
