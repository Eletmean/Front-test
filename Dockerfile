# Используем официальный образ Node.js
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /angular-app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем всё содержимое проекта
COPY . .

# Команда по умолчанию (если не переопределена в docker-compose.yml)
CMD ["npm", "start"]