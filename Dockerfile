# Base PHP avec Apache
FROM php:8.3-apache

# Installer les dépendances de Laravel + PostgreSQL
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo_pgsql mbstring bcmath gd

# Installer Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copier le code du projet
COPY . /var/www/html

# Définir le dossier de travail
WORKDIR /var/www/html

# Définir le DocumentRoot d'Apache sur le dossier public de Laravel
ENV APACHE_DOCUMENT_ROOT /var/www/html/public

# Mettre à jour la config d'Apache
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf \
    && sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Installer les dépendances Laravel et optimiser
RUN composer install --optimize-autoloader --no-dev \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache \
    && chmod -R 775 storage bootstrap/cache

# Définir les permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Exposer le port 10000 pour Render
EXPOSE 10000

# Démarrer Apache
CMD ["apache2-foreground"]
