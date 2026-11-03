FROM nginxinc/nginx-unprivileged:1.27-alpine
LABEL org.opencontainers.image.title="Etikus MI használat" \
      org.opencontainers.image.authors="Berkesi Márton, Czihlár Emil Márton, Czutor Balázs"
COPY <<'EOF_NGINX' /etc/nginx/conf.d/default.conf
server {
    listen 8080;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    gzip on;
    gzip_vary on;
    gzip_min_length 256;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;

    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /healthz {
        access_log off;
        default_type text/plain;
        return 200 "ok\n";
    }

    location ~* \.html$ {
        add_header Cache-Control "no-cache";
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    }

    location ~* \.(css|js)$ {
        add_header Cache-Control "public, max-age=3600";
        add_header X-Content-Type-Options "nosniff" always;
    }

    location ~* \.(png|jpg|jpeg|gif|webp|svg|ico|mp4|webm)$ {
        add_header Cache-Control "public, max-age=2592000";
        add_header X-Content-Type-Options "nosniff" always;
        access_log off;
    }

    location / {
        try_files $uri $uri/ =404;
    }
}
EOF_NGINX

COPY --chown=nginx:nginx index.html peldaoldal.html main.js style.css /usr/share/nginx/html/
COPY --chown=nginx:nginx images/ /usr/share/nginx/html/images/
COPY --chown=nginx:nginx videos/ /usr/share/nginx/html/videos/

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/healthz || exit 1
