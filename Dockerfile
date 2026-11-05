# 1) PHP-Abhaengigkeiten, 2) Frontend-Build (Parcel 1 -> aeltere Node-Version), 3) PHP-Apache ohne Root auf Port 8080.
FROM composer:2 AS vendor
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --prefer-dist --ignore-platform-reqs --optimize-autoloader

# deasync braucht Compiler/Python, daher die Debian-Variante (nur Build-Stage)
FROM node:16 AS frontend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY src/frontend ./src/frontend
COPY tsconfig.json ./
ENV APP_URL=https://lastbackup.devert.net/ API_URL=https://lastbackup.devert.net/
RUN NODE_ENV=production npx parcel build src/frontend/index.html -d .dist/public --no-cache

FROM php:8.5-apache
# msmtp: mail() in PHP -> Postfix auf dem Host (172.30.0.1, Bridge br-hosting), STARTTLS mit gepinntem Fingerprint
# des Host-Zertifikats (ssl-cert-snakeoil, gueltig bis 2030; bei Erneuerung hier den Fingerprint anpassen)
RUN apt-get update && apt-get install -y --no-install-recommends msmtp && rm -rf /var/lib/apt/lists/* \
 && printf 'defaults\nhost 172.30.0.1\nport 25\ntls on\ntls_starttls on\ntls_fingerprint D7:E1:35:25:C7:69:EF:76:61:A8:F5:DB:5D:7C:15:63:17:C2:B8:49:7C:B6:5B:CF:9B:30:ED:44:AC:F2:CE:0A\nauth off\nfrom lastbackup@vmd48888.contaboserver.net\nlogfile -\naccount default\n' > /etc/msmtprc \
 && a2enmod rewrite headers remoteip \
 && sed -ri 's/^Listen 80$/Listen 8080/' /etc/apache2/ports.conf \
 && sed -ri 's/<VirtualHost \*:80>/<VirtualHost *:8080>/' /etc/apache2/sites-available/000-default.conf \
 && sed -ri 's!/var/www/html!/var/www/htdocs/public!g' /etc/apache2/sites-available/000-default.conf /etc/apache2/apache2.conf
COPY docker/site.conf /etc/apache2/conf-available/site.conf
COPY docker/php.ini /usr/local/etc/php/conf.d/zz-site.ini
RUN a2enconf site
WORKDIR /var/www/htdocs
COPY --from=frontend /app/.dist/public ./public
COPY api ./public/api
COPY src/api ./src/api
COPY --from=vendor /app/vendor ./vendor
# storagePath in api/index.php ist ../../../storage/ -> /var/www/storage (Volume)
USER www-data
EXPOSE 8080
