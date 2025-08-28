# Base PHP avec Apache
FROM php:8.3-apache

# Installer dépendances Laravel + PostgreSQL
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo_pgsql mbstring bcmath gd \
    && a2enmod rewrite

# Installer Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copier code
COPY . /var/www/html

# Définir dossier de travail
WORKDIR /var/www/html

# DocumentRoot Apache
RUN sed -ri -e 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/*.conf \
    && sed -ri -e 's!/var/www/html!/var/www/html/public!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf \
    && echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Permissions Laravel
RUN composer install --no-dev --optimize-autoloader \
    && chmod -R 775 storage bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

# Exposer port 80
EXPOSE 80

# Clear caches et démarrer Apache
CMD php artisan config:clear && \
    php artisan route:clear && \
    php artisan view:clear && \
    apache2-foreground
