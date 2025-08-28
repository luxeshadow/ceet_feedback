#!/bin/sh
set -e

# Exécuter les migrations (ignore l’erreur si déjà appliquées)
php artisan migrate --force || true

# Lancer Apache
exec apache2-foreground
