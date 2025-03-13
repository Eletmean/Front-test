# FrontTest

## Инструкции по запуску через Docker

Чтобы запустить сайт, выполните команду:

```bash
docker compose up -d
```
Для запуска тестов выполните команду:
```bash
docker compose exec angular-app npx cypress run
```