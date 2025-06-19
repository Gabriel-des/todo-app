FROM php:8.2-fpm

# Instalar extensões necessárias
RUN apt-get update && apt-get install -y \
    libzip-dev libpng-dev libjpeg-dev libonig-dev git zip unzip \
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl gd

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

WORKDIR /var/www
COPY . /var/www

# Instalar dependências do Laravel
RUN composer install --no-interaction --prefer-dist

# Expor porta e executar PHP-FPM
EXPOSE 9000
CMD ["php-fpm"]
