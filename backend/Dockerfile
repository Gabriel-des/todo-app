FROM php:8.2-cli


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

 # Expor a porta do artisan serve
 EXPOSE 8000
 CMD ["php","artisan","serve","--host=0.0.0.0","--port=8000"]