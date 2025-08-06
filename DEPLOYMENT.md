# 🚀 Инструкции по развертыванию UAE Water Delivery

## 📋 Обзор

Этот проект включает в себя:
- **E-commerce платформу** для доставки воды
- **Админ-панель** с парсером товаров
- **Систему экспорта** в 4 форматах
- **Управление дубликатами** товаров
- **API endpoints** для интеграций

---

## 🎯 Варианты развертывания

### 1. 🌟 Vercel (РЕКОМЕНДУЕТСЯ)

**Самый простой способ для Next.js приложений:**

1. **Зарегистрируйтесь на [vercel.com](https://vercel.com)**
2. **Подключите GitHub репозиторий** или загрузите ZIP проекта
3. **Добавьте переменные окружения:**
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://ucmqwxhyywgkanwstsph.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjbXF3eGh5eXdna2Fud3N0c3BoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1MDQxMjYsImV4cCI6MjA0OTA4MDEyNn0.eP8bIw87i3Ub4nOhh6oJpRglKGDtm8QMPX4QY5OuJ2A
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjbXF3eGh5eXdna2Fud3N0c3BoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzUwNDEyNiwiZXhwIjoyMDQ5MDgwMTI2fQ.pJzxUjjUm3Y8Q3E9p42hJREqzkbUXCYOOgYfwQT4SXs
   NEXTAUTH_SECRET=uae-waters-super-secret-key-2024
   ```
4. **Vercel автоматически развернет проект**
5. **Получите ссылку** типа `https://your-project.vercel.app`

**✅ Админка будет доступна:** `https://your-project.vercel.app/admin/login`

---

### 2. 🚂 Railway.app

1. **Регистрация на [railway.app](https://railway.app)**
2. **"New Project" → "Deploy from GitHub repo"**
3. **Добавьте те же переменные окружения**
4. **Railway автоматически развернет проект**

---

### 3. 🎨 Render.com

1. **Регистрация на [render.com](https://render.com)**
2. **"New Web Service" → подключите репозиторий**
3. **Настройки:**
   - **Runtime:** `Node`
   - **Build Command:** `bun install && bun run build`
   - **Start Command:** `bun start`
4. **Добавьте переменные окружения**

---

### 4. 🐳 VPS с Docker (Для продвинутых пользователей)

**Требования:**
- VPS с Ubuntu 20.04+
- Docker и Docker Compose
- Доменное имя (опционально)

#### Шаг 1: Подготовка сервера

```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Установка Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Добавление пользователя в группу docker
sudo usermod -aG docker $USER
```

#### Шаг 2: Загрузка проекта

```bash
# Клонирование репозитория
git clone https://github.com/your-username/uae-water-delivery.git
cd uae-water-delivery

# Или загрузка ZIP файла
wget https://github.com/your-username/uae-water-delivery/archive/main.zip
unzip main.zip
cd uae-water-delivery-main
```

#### Шаг 3: Настройка

```bash
# Редактирование docker-compose.yml
nano docker-compose.yml

# Замените your-domain.com на ваш домен
# Если домена нет, используйте IP сервера
```

#### Шаг 4: Развертывание

```bash
# Запуск автоматического развертывания
./deploy.sh

# Или ручное развертывание
docker-compose up --build -d
```

#### Шаг 5: Настройка домена (опционально)

Если у вас есть домен, настройте DNS:
```
A record: your-domain.com → IP_вашего_сервера
```

Для SSL сертификата добавьте Nginx:
```bash
# Установка Nginx
sudo apt install nginx

# Настройка reverse proxy для порта 3000
sudo nano /etc/nginx/sites-available/uae-waters

# Получение SSL сертификата
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 🔧 Настройка после развертывания

### 1. Проверка работоспособности

**Откройте ваш сайт:**
- Основная страница: `https://your-domain.com`
- Админ-панель: `https://your-domain.com/admin/login`

### 2. Засеивание базы данных

```bash
# Перейдите на страницу тестирования API
https://your-domain.com/test-api

# Нажмите "Seed Database" для добавления тестовых товаров
```

### 3. Тестирование функций

**🔥 Парсер товаров:**
- https://your-domain.com/admin/products/parse

**📊 Экспорт каталога:**
- https://your-domain.com/admin/products/export

**🔍 Управление дубликатами:**
- https://your-domain.com/admin/products/duplicates

**🧪 Тестирование парсера:**
- https://your-domain.com/admin/products/test-parser

---

## 🛠️ Управление и мониторинг

### Docker команды

```bash
# Просмотр логов
docker-compose logs -f

# Перезапуск
docker-compose restart

# Остановка
docker-compose down

# Обновление
git pull
docker-compose up --build -d
```

### Мониторинг

```bash
# Проверка состояния контейнеров
docker-compose ps

# Использование ресурсов
docker stats

# Проверка здоровья
curl -f http://your-domain.com/api/products
```

---

## 🔐 Безопасность

### Обязательные шаги:

1. **Смените секретные ключи:**
   ```bash
   NEXTAUTH_SECRET=your-unique-secret-key
   ```

2. **Настройте файрвол:**
   ```bash
   sudo ufw allow 22
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw enable
   ```

3. **Обновляйте систему:**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

---

## 🆘 Устранение неполадок

### Частые проблемы:

**1. Контейнер не запускается:**
```bash
docker-compose logs
# Проверьте переменные окружения
```

**2. База данных недоступна:**
```bash
# Проверьте Supabase ключи в docker-compose.yml
# Убедитесь что Supabase проект активен
```

**3. Ошибки парсера:**
```bash
# Проверьте доступ к интернету из контейнера
docker-compose exec uae-waters curl -I https://google.com
```

**4. Проблемы с изображениями:**
```bash
# Проверьте права доступа к папке uploads
sudo chown -R 1001:1001 ./public/uploads
```

---

## 📞 Поддержка

При возникновении проблем:

1. **Проверьте логи:** `docker-compose logs`
2. **Убедитесь в корректности переменных окружения**
3. **Проверьте доступность Supabase**
4. **Обратитесь к документации проекта**

---

## 🎉 Готово!

После успешного развертывания у вас будет:

- ✅ **Полнофункциональная e-commerce платформа**
- ✅ **Мощная админ-панель с парсером товаров**
- ✅ **Система экспорта в 4 форматах**
- ✅ **Управление дубликатами товаров**
- ✅ **API для интеграций**
- ✅ **Многоязычность (английский/арабский)**

**Ваша админка готова к использованию! 🚀**
