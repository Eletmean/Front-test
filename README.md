# FrontTest

## Инструкции по запуску через Docker

Чтобы запустить сайт, выполните команду:

```bash
docker compose up -d
```

Сайт доступен локально на: 
```bash
http://localhost:4200/
```

Для запуска тестов выполните команду:
```bash
docker compose exec angular-app npx cypress run
```